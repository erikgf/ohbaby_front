import Excel from 'exceljs';
import { saveAs } from 'file-saver';


export const useExcel = () => {
    const saveExcel = async ({fileName, workSheets}) => {
      const workbook = new Excel.Workbook();
      const workSheetsCreatedIds = [];
      try {
        workSheets.forEach(({
            name = "Worksheet Name",
            columns = [],
            data = []
        }) => {
            let worksheet = workbook.addWorksheet(name);
            workSheetsCreatedIds.push(worksheet.id);
            worksheet.columns = columns;

            //Cabecera
            worksheet.getRow(1).font = { bold: true, color: {argb: "ffffff"}};
            worksheet.getRow(1).eachCell({ includeEmpty: false }, function(cell) {
                const columnKey = cell._column._key;
                const fgColor = columns.find( item => {
                    return item.key === columnKey
                })?.fgColor ?? "04195f" ;
                worksheet.getCell(cell.address).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: fgColor}, //#E97132
                }
            });

            worksheet.columns.forEach((column, i) => {
                column.width = column.header.length + 6;
                column.alignment = { horizontal: columns[i].align ?? "center"};
            });

            data.forEach(singleData => {
                worksheet.addRow(singleData);
            });

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                // store each cell to currentCell
                if (rowNumber <= 1){
                    return;
                }
                // loop through currentCell to apply border only for the non-empty cell of excel
                row._cells.forEach(singleCell => {
                    const cellAddress = singleCell._address;
                    const cellNumber = singleCell._column._number;
                    const formulaValues = columns[cellNumber - 1]?.formula;

                    if (Boolean(formulaValues)){
                        worksheet.getCell(cellAddress).value = { formula : formulaValues.replaceAll("#", rowNumber)}
                    }

                    const isBlankValue = columns[cellNumber - 1]?.vacio;
                    if (Boolean(isBlankValue)){
                        worksheet.getCell(cellAddress).value = "";
                    }

                  // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                    //
                    //console.log({singleCell})
                    /*
                    if (singleCell._column._key === "statusOnTime"){
                        worksheet.getCell(cellAddress).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: statusOnTimeBackgroundColor}
                        };

                        worksheet.getCell(cellAddress).font = { 
                            bold: true, 
                            color: {argb: statusOnTimeColor}
                        };
                    }

                    if (singleCell._column._key === "status"){
                        worksheet.getCell(cellAddress).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: statusColor}
                        };

                        worksheet.getCell(cellAddress).font = { 
                            bold: true, 
                            color: {argb: "ffffff"}
                        };
                    }
                    */
                });
              });

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