import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components';
import './App.css';
import { Horario, HorarioPersonal, ImprimirAsistenciaManual, Login, MarcarAsistencia, Personal, Principal, RegistrarAsitenciaManual } from './pages';
import { useEffect } from 'react';
import useNotification from './hooks/useNotification';
import { useUI } from './hooks';

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

  return   <Routes>
              {/* Public */}
              <Route path="/" element={<Login />} />
              {/* Private */}
              <Route element = {<RequireAuth/>}>
                <Route path="/main" element={<Principal />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/horarios" element={<Horario />} />
                <Route path="/horarios-personal" element={<HorarioPersonal />} />
                <Route path="/marcar-asistencia" element={<MarcarAsistencia />} />
                <Route path="/registrar-asistencia-manual" element={<RegistrarAsitenciaManual />} />
                <Route path="/imprimir-asistencia-manual" element={<ImprimirAsistenciaManual />} />
              </Route>
              { /* Catch all */}
              <Route path="*" element={<Login />} />
            </Routes>
}

export default App
