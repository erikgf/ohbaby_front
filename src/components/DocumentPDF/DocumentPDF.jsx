import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getHora, getHoy } from '../../assets/utils';

const styles = StyleSheet.create({
  page: {
    paddingTop: "1.5cm",
    paddingLeft: "1cm",
    paddingRight: "1cm",
    paddingBottom: "1.5cm"
  },
  table: {
    width: '100%',
    display: "table", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  tableCol: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  row: {
    margin: "auto", 
    flexDirection: "row" ,
  },
  header: {
    borderTop: 'none',
    textAlign: 'center',
    fontSize: 9
  },
  numberPage : {
    fontSize: 7,
    position: "absolute",
    width: "auto",
    right: "1cm",
    bottom: "1cm"
  },
  tableCell: { 
    margin: "auto", 
    marginTop: 2.5, 
    fontSize: 8 
  },
  empresa : {
    fontSize: 8.5,
    position: "absolute",
    width: "auto",
    left: "1cm",
    top: "1cm"
  },
  fecha : {
    fontSize: 7,
    position: "absolute",
    width: "auto",
    right: "1cm",
    top: "1cm"
  },
  titulo : {
    fontSize: 14,
    paddingBottom: '.3cm',
    width: "100%",
    textAlign: "center"
  },
});

const fechaHoy = getHoy();
const hora = getHora();
const nombreEmpresa = "Dival Perú";

export const DocumentPDF = ({titulo, cabeceras, registros})=>{
    return  <Document>
                <Page size="A4" style={styles.page}>
                  <Text style={styles.empresa}>{nombreEmpresa}</Text>
                  <Text style={styles.titulo}>{titulo}</Text>
                  <Text style={styles.fecha}>{fechaHoy} {hora}</Text>
                  <View style={styles.table}>
                    <View style={[styles.row, styles.header]}>
                      {
                        cabeceras?.map(c => {
                          return  <View  key={c.id} style={{...styles.tableCol, width: c.width}}>
                                    <Text>{c.label}</Text>
                                  </View>
                        })
                      }
                    </View>
                    {
                      registros.map(row => (
                        <View key={row.id} style={styles.row} wrap={false}>
                          {
                            cabeceras?.map(c => {
                              return  <View key={`${c.id}${row.id}`} style={{...styles.tableCol, width: c.width}}>
                                        <Text style={styles.tableCell}>{row[c.id]}</Text>
                                      </View>
                            })
                          }
                        </View>
                      ))
                    }
                  </View>
                  <Text style={styles.numberPage} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                  )} fixed />
                </Page>
            </Document>
};