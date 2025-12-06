import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import { Clientes } from "./components/pages/clientes/Clientes";
import { Imoveis } from "./components/pages/imoveis/Imoveis";
import { ImoveisForm } from "./components/pages/imoveis/ImoveisForm";
import ClientesForm from "./components/pages/clientes/ClientesForm";
import ImoveisView from "./components/pages/imoveis/ImoveisView";
import ClientesView from "./components/pages/clientes/ClientesView";

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/clientes-form" element={<ClientesForm />} />
                <Route path="/clientes-form/:id" element={<ClientesForm />} />
                <Route path="/clientes-view/:id" element={<ClientesView />} /> {/* rota dinâmica */}
                <Route path="/imoveis" element={<Imoveis />} />
                <Route path="/imoveis-form" element={<ImoveisForm />} />
                <Route path="/imoveis-form/:id" element={<ImoveisForm />} />
                <Route path="/imoveis-view/:id" element={<ImoveisView />} /> {/* rota dinâmica */}
            </Route>
        </Routes>
    );
}
