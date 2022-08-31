import { useState, createContext } from "react";
import {
  obtenerDiferenciaYear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    let resultado = 2000;
    //obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);
    //hay que restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;
    // europeo 30%  americano15% asiatico 5%
    resultado *= calcularMarca(datos.marca);
    //basico 20% completo 50%
    resultado *= calcularPlan(datos.plan);
    // para poner solo 2 decimales lo podria hacer asi
    // resultado = resultado.toFixed(2) o ya como se aplico con el helper
    resultado = formatearDinero(resultado);

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setResultado(resultado);
    }, 2000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        error,
        setError,
        cotizarSeguro,
        handleChangeDatos,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };
export default CotizadorContext;
