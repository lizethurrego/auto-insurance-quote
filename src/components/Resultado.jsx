import useCotizador from "../hooks/useCotizador";
import { MARCAS, PLANES, YEARS } from "../constants";
import { useCallback, useMemo, useRef } from "react";

const Resultado = () => {
  const { resultado, datos } = useCotizador();
  if (resultado === 0) return null;

  const { marca, plan, year } = datos;
  const yearRef = useRef(year)

  const [nombreMarca] = useMemo(()=>
    MARCAS.filter(m => m.id === Number(marca)),
    [resultado]
    )

  const [nombrePlan] = useMemo(()=>
    PLANES.filter(p => p.id === Number(plan)),
    [resultado]
    )



  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-3xl">Summary</h2>
      <p className="my-2">
        <span className="font-bold">Brand: </span>
        {nombreMarca.nombre}
      </p>
      <p className="my-2">
        <span className="font-bold">Plan: </span>
        {nombrePlan.nombre}
      </p>
      <p className="my-2">
        <span className="font-bold">Year: </span>
        {yearRef.current}
      </p>
      <p className="my-2 text-2xl">
        <span className="font-bold">Quote's Total: </span>
        {resultado}
      </p>
    </div>
  );
};

export default Resultado;
