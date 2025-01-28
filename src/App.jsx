import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components';
import './App.css';
import { AppEnMantenimiento, Entregas, Horario, HorarioPersonal, ImprimirAsistenciaManual, Login, MarcarAsistencia, Personal, Principal, RegistrarAsitenciaManual, ReporteAsistenciaRegistro, TipoEntregas, Usuarios } from './pages';
import { useEffect } from 'react';
import useNotification from './hooks/useNotification';
import { useUI } from './hooks';

const mantenimiento = import.meta.env.VITE_MANTENIMIENTO == 1;

function App() {
  const {  mensaje, onLimpiarMensaje } = useUI();
  const notificar = useNotification();

  useEffect(()=>{
      if (!Boolean(mensaje)) return;
      notificar(mensaje);
      return () => {
        onLimpiarMensaje();
      }
  }, [mensaje]);

  if (mantenimiento){
    return   <Routes>
        <Route path="*" element={<AppEnMantenimiento />} />
      </Routes>  
  }

  return   <Routes>
              {/* Public */}
              <Route path="/" element={<Login />} />
              {/* Private */}
              <Route element = {<RequireAuth/>}>
                <Route path="/main" element={<Principal />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/tipo-entregas" element={<TipoEntregas />} />
                <Route path="/horarios" element={<Horario />} />
                <Route path="/horarios-personal" element={<HorarioPersonal />} />
                <Route path="/marcar-asistencia" element={<MarcarAsistencia />} />
                <Route path="/registrar-asistencia-manual" element={<RegistrarAsitenciaManual />} />
                <Route path="/entregas" element={<Entregas />} />
                <Route path="/imprimir-asistencia-manual" element={<ImprimirAsistenciaManual />} />
                <Route path="/reporte-asistencias-registro" element={<ReporteAsistenciaRegistro />} />
              </Route>
              { /* Catch all */}
              <Route path="*" element={<Login />} />
            </Routes>
}
export default App
