import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Planos from "../pages/Planos";
import TelaPrincipal from "../pages/TelaPrincipal";
import Checkout from "../pages/Checkout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/lancamentos" element={<TelaPrincipal />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
