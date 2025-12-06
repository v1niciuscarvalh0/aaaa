import { useEffect, useState } from "react";

import clienteService from "../services/clienteService";

export function useClientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getClientesData = async () => {
        try {
            setLoading(true);
            const clientes = await clienteService.listarClientes();
            setClientes(clientes);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    useEffect(()=>{
        getClientesData()
    }, [])


    return { clientes, loading }
}