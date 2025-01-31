import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const DEFAULT_WORKSHEET_NAME = "WorkSheet Name",
      DEFAULT_FG_COLOR = "1e1f21",
      DEFAULT_COLUMN_ALIGN = "left",
      MSG_NO_SE_HA_ENVIADO_WORKSHEET_VALIDO = "No se ha enviado función de procesamiento tras lectura.";

export const useExcel = () => {
const saveExcel = async ({fileName, workSheets}) => {
    const workbook = new Excel.Workbook();
    const workSheetsCreatedIds = [];
    try {
    workSheets.forEach(({
        name = DEFAULT_WORKSHEET_NAME,
        columns = [],
        data = []
    }) => {

        let worksheet = workbook.addWorksheet(name);
        workSheetsCreatedIds.push(worksheet.id);
        worksheet.columns = columns;
        //Cabecera
        worksheet.getRow(1).font = { bold: true, color: {argb: "ffffff"}};
        worksheet.getRow(1).eachCell({ includeEmpty: false }, function(cell) {
            if (!Boolean(cell?._column)){
                return;
            }
            const columnKey = cell?._column?._key;

            const fgColor = columns.find( item => {
                return item.key === columnKey
            })?.fgColor ?? DEFAULT_FG_COLOR ;

            worksheet.getCell(cell.address).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: fgColor}, //#E97132
            }
        });

        worksheet.columns.forEach((column, i) => {
            column.width = columns[i]?.width ?? (column.header.length + 6);
            column.alignment = { horizontal: columns[i].align ?? DEFAULT_COLUMN_ALIGN};
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
                const wrapText = columns[cellNumber - 1]?.wrapText;

                if (Boolean(wrapText)){
                    worksheet.getCell(cellAddress).alignment.wrapText = true;
                }

                if (Boolean(formulaValues)){
                    worksheet.getCell(cellAddress).value = { formula : formulaValues.replaceAll("#", rowNumber)}
                }

                const isBlankValue = columns[cellNumber - 1]?.vacio;
                if (Boolean(isBlankValue)){
                    worksheet.getCell(cellAddress).value = "";
                }
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

const readExcel = ({file, fnProcesarWorksheets = null}) => {
    if (!fnProcesarWorksheets) {
        console.error(MSG_NO_SE_HA_ENVIADO_WORKSHEET_VALIDO);
        return;
    } 
    const workbook = new Excel.Workbook();
    const reader = new FileReader();

    reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const loadedWorkbook = await workbook.xlsx.load(data);
        const worksheets = loadedWorkbook.worksheets;
        fnProcesarWorksheets(worksheets);
    }
    reader.readAsArrayBuffer(file);
}

return {
    saveExcel,
    readExcel
}
}