import { ImportadorMantenedorExcel } from "@/components/ImportadorMantenedorExcel/ImportadorMantenedorExcel";
import { FormRegister } from "./components/FormRegister";
import { ListaPersonal } from "./components/ListaPersonal";
import { ModalRegistroContratos } from "./components/ModalRegistroContratos";
import { useImportadorMantenedor } from "./hooks/useImportadorMantenedor";

export const Personal = ()=>{
    //useImportar
    const { state, onOpenImportador, onClearResultado, onCloseImportador, onGuardarMasivo } = useImportadorMantenedor();
    
    return <>
            <ListaPersonal onOpenImportador = { onOpenImportador } />
            <FormRegister />
            <ModalRegistroContratos />
            <ImportadorMantenedorExcel 
                    nombreTabla="Empleado"
                    isOpen={state.isOpenImportador} onClose={onCloseImportador}
                    isCargandoImportacion = {state.cargandoGuardarMasivo}
                    resultado = { state.resultados }
                    erroresMasivo = { state.erroresMasivo }
                    onClearResultado = { onClearResultado }
                    fnImportacion={onGuardarMasivo}
                    cabeceraAlta={[
                        { id: "numero_de_documento_antiguo", label: "Núm. Documento** (Editar)"},
                        { id: "numero_de_documento", label: "Núm. Documento Nuevo**", isRequired: true},
                        { id: "tipo_de_documento", label: "Tipo Documento (D,C)", title: "D: DNI, C: Carné Extranjería"},
                        { id: "apellido_paterno", label: "Ap. Paterno", isRequired: true}, 
                        { id: "apellido_materno", label: "Ap. Materno", isRequired: true},
                        { id: "nombres", label: "Nombres", isRequired: true},
                        { id: "fecha_de_ingreso", label: "F. Ingreso"},
                        { id: "fecha_de_nacimiento", label: "F. Nacimiento"},
                        { id: "direccion", label: "Dirección"},
                        { id: "distrito_ubigeo", label: "Ubigeo Distrito"},
                        { id: "pais", label: "País (2 Letras)", title : "PE: Perú, EC: Ecuador, VE: Venezuela"},
                        { id: "empresa", label: "Empresa"},
                        { id: "celular", label: "Celular"},
                        { id: "sexo", label: "Sexo (F,M)", title: "F: Femenino, M: Masculino"},
                        { id: "estado_civil", label: "Estado Civil (S,D,C,V)", title: "S: Soltero, D: Divorciado, C: Casado, V: Viudo"},
                        { id: "puesto", label: "Puesto"},
                        { id: "telefono_de_referencia", label: "Tel. Referencia"},
                        { id: "nombre_de_familiar", label: "Nombre de Familiar"},
                        { id: "fecha_inicio_de_contrato", label: "Contrato - Fecha Inicio"},
                        { id: "descuento_de_contrato", label: "Contrato - Dscto. Planilla"},
                        { id: "horario_de_contrato", label: "Contrato - Horario (Código)"},
                        { id: "salario_de_contrato", label: "Contrato - Salario"},
                    ]}
                    registrosEjemploAlta = {[
                    ]}
                    cabeceraBaja = {[
                        { id: "numero_de_documento_antiguo", label: "Número Documento**", isRequired: true},
                    ]}
                    registrosEjemploBaja = {[
                    ]}
                    />
        </>
}