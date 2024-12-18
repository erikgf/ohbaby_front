import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const   POSICION_TITULO = [1, 1],
        CELDAS_COMBINAR_TITULO = "A1:F1",
        POSICION_ROTULO_EMPRESA = [2, 1],
        POSICION_EMPRESA = [2, 2],
        POSICION_ROTULO_FECHA = [2, 5],
        POSICION_FECHA = [2,6],
        POSICION_TABLA_N = [4, 1],
        CELDAS_COMBINAR_N = 'A4:A5',
        POSICION_TABLA_CODIGO = [4,2],
        CELDAS_COMBINAR_CODIGO = 'B4:B5',
        POSICION_TABLA_TURNO_1 = [4,3],
        CELDAS_COMBINAR_TURNO_1 = 'C4:D4',
        POSICION_TABLA_T1_HORA_INICIO = [5, 3],
        POSICION_TABLA_T1_HORA_FIN = [5, 4],
        POSICION_TABLA_TURNO_2 = [4,5],
        CELDAS_COMBINAR_TURNO_2 = 'E4:F4',
        POSICION_TABLA_T2_HORA_INICIO = [5, 5],
        POSICION_TABLA_T2_HORA_FIN = [5, 6],
        POSICION_INICIO_DATOS_TABLA = [6, 1];

const borderFullStyle =  {
    top: {style:'thin'},
    left: {style:'thin'},
    bottom: {style:'thin'},
    right: {style:'thin'}
};

const createOuterBorder = (
        worksheet,
        [startCol, startRow],
        [endCol, endRow],
        style = "medium"
    ) => {

    console.log({startCol, startRow, endCol, endRow});

    for (let i = startRow; i <= endRow; i++) {
        const leftBorderCell = worksheet.getCell(i, startCol);
        const rightBorderCell = worksheet.getCell(i, endCol);

        leftBorderCell.border = {
            ...leftBorderCell.border,
            left: {
                style,
            },
        };

        rightBorderCell.border = {
            ...rightBorderCell.border,
            right: {
                style,
            },
        };
    }

    for (let i = startCol; i <= endCol; i++) {
        const topBorderCell = worksheet.getCell(startRow, i);
        const bottomBorderCell = worksheet.getCell(endRow, i);

        topBorderCell.border = {
            ...topBorderCell.border,
            top: {
                style,
            },
        };

        bottomBorderCell.border = {
            ...bottomBorderCell.border,
            bottom: {
                style,
            },
        };
    }
};

const procesarData = (data) => {
    const { horarios, registros, fecha, numero_dia } = data;
    return registros.map ( registro => ({
        empresa_id : registro.empresa_id,
        empresa_nombre : registro.empresa_nombre,
        fecha,
        registros : registro?.registros
            ?.filter( _registro => Boolean(_registro?.horario_id) )
            ?.map ( _registro => {
                const asistencia = registro?.asistencia;
                if (Boolean(asistencia)){
                    const horas = [{
                        hora_inicio: asistencia?.hora_entrada_mañana,
                        hora_fin: asistencia?.hora_salida_mañana,
                    }];

                    if (Boolean(asistencia?.hora_entrada_tarde)){
                        horas.push({
                            hora_inicio: asistencia?.hora_entrada_tarde,
                            hora_fin: asistencia?.hora_sallida_tarde
                        });
                    }

                    return {
                        empleado_codigo_unico: _registro.empleado_codigo_unico,
                        empleado_nombres : _registro.empleado_nombres,
                        horas
                    };
                }

                const horas = horarios.find( 
                        horario => horario.id === _registro.horario_id
                    )
                    ?.horario_detalles
                    ?.filter( horario_detalle => horario_detalle.dias.includes(String(numero_dia)))
                    ?.map ( horario_detalle => ({
                        hora_inicio: horario_detalle.hora_inicio,
                        hora_fin: horario_detalle.hora_fin
                    }));

                return {
                    ..._registro,
                    horas,
                };
            })
    }));
};

export const useGenerarExcel = () => {
    
    const generateWorkSheet = (workbook, {empresa_id, empresa_nombre, fecha, registros}) => {
        let worksheet = workbook.addWorksheet(empresa_nombre);
        let workingCell;
        //Título
        workingCell = worksheet.getRow(POSICION_TITULO[0]).getCell(POSICION_TITULO[1]);
        workingCell.value = "CONTROL DE ASISTENCIAS";
        workingCell.alignment = {
            vertical: "middle", horizontal: "center", wrapText: true
        };
        worksheet.getRow(POSICION_TITULO[0]).font = { bold: true };
        worksheet.mergeCells(CELDAS_COMBINAR_TITULO);

        //Celdas Empresa
        workingCell = worksheet.getRow(POSICION_ROTULO_EMPRESA[0]).getCell(POSICION_ROTULO_EMPRESA[1]);
        workingCell.value = "ID";
        workingCell.font = { bold: true };
        worksheet.getRow(POSICION_EMPRESA[0]).getCell(POSICION_EMPRESA[1]).value = String(empresa_id).padStart(6, "0");

        //Celdas Fecha
        workingCell = worksheet.getRow(POSICION_ROTULO_FECHA[0]).getCell(POSICION_ROTULO_FECHA[1]);
        workingCell.value = "FECHA";
        workingCell.font = { bold: true };
        worksheet.getRow(POSICION_FECHA[0]).getCell(POSICION_FECHA[1]).value = String(fecha);

        //Tabla con los datos del personal.
        //cabecera = [N]
        workingCell = worksheet.getRow(POSICION_TABLA_N[0]).getCell(POSICION_TABLA_N[1]);
        workingCell.border = borderFullStyle;
        worksheet.getRow(POSICION_TABLA_N[0]).font = { bold: true };
        workingCell.alignment = {
            vertical: "middle", horizontal: "center", wrapText: true
        };
        workingCell.value = "N°";
        worksheet.mergeCells(CELDAS_COMBINAR_N);
        //cabecera = [CODIGO]
        workingCell = worksheet.getRow(POSICION_TABLA_CODIGO[0]).getCell(POSICION_TABLA_CODIGO[1]);
        workingCell.border = borderFullStyle;
        worksheet.getRow(POSICION_TABLA_CODIGO[0]).font = { bold: true };
        workingCell.alignment = {
            vertical: "middle", horizontal: "center", wrapText: true
        };
        workingCell.value = "CÓDIGO";
        worksheet.mergeCells(CELDAS_COMBINAR_CODIGO);
        //cabecera = [T1]
        workingCell = worksheet.getRow(POSICION_TABLA_TURNO_1[0]).getCell(POSICION_TABLA_TURNO_1[1]);
        workingCell.border = borderFullStyle;
        workingCell.alignment = {
            vertical: "middle", horizontal: "center", wrapText: true
        };
        worksheet.getRow(POSICION_TABLA_TURNO_1[0]).font = { bold: true };
        workingCell.value = "MAÑANA";
        worksheet.mergeCells(CELDAS_COMBINAR_TURNO_1);
        //cabecera = [T1_HINICIO]
        workingCell = worksheet.getRow(POSICION_TABLA_T1_HORA_INICIO[0]).getCell(POSICION_TABLA_T1_HORA_INICIO[1]);
        workingCell.border = borderFullStyle;
        worksheet.getRow(POSICION_TABLA_T1_HORA_INICIO[0]).font = { bold: true };
        workingCell.value = "ENTRADA";
        //cabecera = [T1_HFIN]
        workingCell = worksheet.getRow(POSICION_TABLA_T1_HORA_FIN[0]).getCell(POSICION_TABLA_T1_HORA_FIN[1]);
        workingCell.border = borderFullStyle;
        worksheet.getRow(POSICION_TABLA_T1_HORA_FIN[0]).font = { bold: true };
        workingCell.value = "SALIDA";
        //cabecera = [T2]
        workingCell = worksheet.getRow(POSICION_TABLA_TURNO_2[0]).getCell(POSICION_TABLA_TURNO_2[1]);
        workingCell.border = borderFullStyle;
        workingCell.alignment = {
            vertical: "middle", horizontal: "center", wrapText: true
        };
        worksheet.getRow(POSICION_TABLA_TURNO_2[0]).font = { bold: true };
        workingCell.value = "TARDE";
        worksheet.mergeCells(CELDAS_COMBINAR_TURNO_2);
        //cabecera = [T2_HINICIO]
        workingCell = worksheet.getRow(POSICION_TABLA_T2_HORA_INICIO[0]).getCell(POSICION_TABLA_T2_HORA_INICIO[1]);
        workingCell.border = borderFullStyle;
        worksheet.getRow(POSICION_TABLA_T2_HORA_INICIO[0]).font = { bold: true };
        workingCell.value = "ENTRADA";
        //cabecera = [T2_HFIN]
        workingCell = worksheet.getRow(POSICION_TABLA_T2_HORA_FIN[0]).getCell(POSICION_TABLA_T2_HORA_FIN[1]);
        workingCell.border = borderFullStyle;
        worksheet.getRow(POSICION_TABLA_T2_HORA_FIN[0]).font = { bold: true };
        workingCell.value = "SALIDA";

        let tablaFilaInicio = POSICION_INICIO_DATOS_TABLA[0],
            tablaColumnaInicio;

        registros.forEach( (item, index) => {
            tablaColumnaInicio = POSICION_INICIO_DATOS_TABLA[1];

            workingCell = worksheet.getRow(tablaFilaInicio).getCell(tablaColumnaInicio++);
            workingCell.value = index + 1;
            workingCell.border = borderFullStyle;
            workingCell = worksheet.getRow(tablaFilaInicio).getCell(tablaColumnaInicio++);
            workingCell.value = item.empleado_codigo_unico;
            workingCell.border = borderFullStyle;

            item.horas.forEach( hora => {
                workingCell = worksheet.getRow(tablaFilaInicio).getCell(tablaColumnaInicio++);
                workingCell.value = hora.hora_inicio;
                workingCell.border = borderFullStyle;
                workingCell = worksheet.getRow(tablaFilaInicio).getCell(tablaColumnaInicio++);
                workingCell.value = hora.hora_fin;
                workingCell.border = borderFullStyle;
            });

            tablaFilaInicio++;
        });
        return worksheet;
    };

    const saveExcel = async ({fileName, data}) => {
      const workbook = new Excel.Workbook();

      const workSheetsCreatedIds = [];
      try {
        const workSheets = procesarData(data);

        workSheets.forEach(({
            empresa_id,
            empresa_nombre,
            fecha = "",
            registros = []
        }) => {
            const worksheet = generateWorkSheet(
                workbook,
                {
                    empresa_id,
                    empresa_nombre,
                    fecha,
                    registros
                });
            workSheetsCreatedIds.push(worksheet.id);
        });
        // write the content using writeBuffer
        const buf = await workbook.xlsx.writeBuffer();
        // download the processed file
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
      } catch (error) {
        console.error('<<<ERROR>>>', error);
        console.error('Algo ha fallado.', error.message);
      } finally {
        // removing worksheet's instance to create new one
       // workbook.removeWorksheet(workSheetName);
       workSheetsCreatedIds.forEach( workSheetId => {
            workbook.removeWorksheet(workSheetId);
       })
      }
    };
    
    return {
        saveExcel
    }
}