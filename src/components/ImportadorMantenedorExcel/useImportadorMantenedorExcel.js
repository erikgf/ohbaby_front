import { useEffect, useState } from "react";
import { useExcel } from "@/hooks";
import Mensajes from "@/data/mensajes";

const formatDateCell = (cell) => {
    if (cell instanceof Date) {
        const formattedDate = cell.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return formattedDate;
    }
    return cell;
};

const getWorkSheetsSoloCabeceras = (cabeceraAlta, cabeceraBaja) => {
    return [
        {
            name: "Alta",
            columns: cabeceraAlta?.map( item => ({key: item.id, header: item.label, align: "left"})),
            data: []
        },
        {
            name: "Baja",
            columns: cabeceraBaja?.map( item => ({key: item.id, header: item.label, align: "left"})),
            data: []
        }
    ];
};

const getWorkSheets = (resultado, cabeceraAlta, cabeceraBaja) => {
    const _data = [];

    if (Boolean(resultado?.alta_invalid_records)){
        _data.push({
            name: "Altas",
            columns: [...(cabeceraAlta?.map( item => ({key: item.id, header: item.label, align: "left"}))), {key: "__errors", header: "Errores", align: "left", wrapText: true, width: 120}],
            data : resultado.alta_invalid_records?.map( ({errors, record}) => {
                return {
                    ...record,
                    __errors: Object.keys(errors).map( item => errors[item].join(" ")).join("\n")
                };
            })
        });
    }

    if (Boolean(resultado?.baja_invalid_records)){
        _data.push({
            name: "Bajas",
            columns: [...(cabeceraBaja?.map( item => ({key: item.id, header: item.label, align: "left"}))), {key: "__errors", header: "Errores", align: "left", wrapText: true, width: 120}],
            data : resultado.baja_invalid_records?.map( ({errors, record}) => {
                return {
                    ...record,
                    __errors: Object.keys(errors).map( item => errors[item].join(" ")).join("\n")
                };
            })
        });
    }
    return _data;
};

const procesarWorkSheet = (worksheet, cabeceraData) => {
    const dataFromExcel = [];
    const maxColsChecked = cabeceraData.length;

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1){
            const rowData = { id: rowNumber - 1 };
            row.eachCell({ includeEmpty : true}, (cell, colNumber) => {
                const formattedCell = formatDateCell(cell.value);
                if (colNumber <= maxColsChecked) {
                    const header = cabeceraData[colNumber - 1].id;
                    rowData[header] = formattedCell;
                }
            });
            dataFromExcel.push(rowData);
        }
    });

    return dataFromExcel;
};

export const useImportadorMantenedorExcel = ({isOpen,  resultado, onClearResultado, nombreTabla, cabeceraAlta, cabeceraBaja, fnImportacion, TABS}) => {
    const [isMostrarEjemplo, setIsMostrarEjemplo] = useState(false);
    const [valueTabIndex, setValueTabIndex] = useState(TABS[0].id);
    const [dataProcesada, setDataProcesada] = useState(null);
    const isMantenerVentanaGrande = isMostrarEjemplo || Boolean(dataProcesada);
    const { saveExcel, readExcel } = useExcel();

    const toggleMostrarEjemplo = () => {
        setIsMostrarEjemplo(!isMostrarEjemplo);
    };

    const handleChangeTab = (event, newValue) => {
        setValueTabIndex(newValue);
    };

    const onDescartarData = () => {
        onClearResultado();
        setDataProcesada(null);
    };

    const onImportar = () => {
        if (dataProcesada && fnImportacion){
            if (!confirm(Mensajes.ESTA_SEGURO_REALIZAR_ACCION)){
                return;
            }

            fnImportacion(dataProcesada?.dataAlta, dataProcesada?.dataBaja);
            return;
        }
    }

    const onDescargarErrores = () => {
        if ( !resultado ) return;

        const worksheets = getWorkSheets(resultado, cabeceraAlta, cabeceraBaja);

        saveExcel({
            fileName: `errores_detalle_${nombreTabla.replaceAll(" ","_").toLocaleLowerCase()}_${new Date().getTime()}`,
            workSheets : worksheets
        });
    };

    const onDescargarEstructura = () => {
        const worksheets = getWorkSheetsSoloCabeceras(cabeceraAlta, cabeceraBaja);

        saveExcel({
            fileName: `estructura_${nombreTabla.replaceAll(" ","_").toLocaleLowerCase()}`,
            workSheets : worksheets
        });
    }

    const onProcesarLecturaFileExcel = (file) => {
        readExcel({
            file,
            fnProcesarWorksheets: (worksheets) => {
            
            if (worksheets.length < 1){
                alert("El archivo debe tener al menos 1 pestaña.");
                return;
            }

            let workSheetsProcesados = 0;
            const dataProcesada = {
                dataAlta: [],
                dataBaja: []
            };

            worksheets.forEach(worksheet => {
                const workSheetName = worksheet.name.toLocaleLowerCase();

                switch (workSheetName) {
                    case TABS[0].label.toLocaleLowerCase():
                        dataProcesada.dataAlta = procesarWorkSheet(worksheet, cabeceraAlta);
                        workSheetsProcesados++;
                        break;
                    case TABS[1].label.toLocaleLowerCase():
                        dataProcesada.dataBaja =procesarWorkSheet(worksheet, cabeceraBaja);
                        workSheetsProcesados++;
                        break;
                    default:
                        break;
                }
            });

            if (workSheetsProcesados <= 0){
                alert("No hay pestañas que procesar en el archivo cargado.");
                return;
            }

            setDataProcesada(dataProcesada);
            }
        });
    };

    useEffect(()=>{
        if (isOpen === false) onDescartarData();
    }, [isOpen]);
 

    return {
        isMostrarEjemplo,
        valueTabIndex,
        dataProcesada,
        isMantenerVentanaGrande,
        toggleMostrarEjemplo,
        handleChangeTab,
        onProcesarLecturaFileExcel,
        onDescartarData,
        onImportar,
        onDescargarErrores,
        onDescargarEstructura
    }
}