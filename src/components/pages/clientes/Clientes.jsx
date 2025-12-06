import { Box, Typography, TextField } from "@mui/material";
import { ClientesTable } from "./ClientesTable";
import { useState, useMemo } from "react";
import { useClientes } from "../../../hooks/useClientes";
import { ClientesFilter } from "./ClientesFilter";

export const Clientes = () => {
    const { clientes, loading } = useClientes();
    const [searchTerm, setSearchTerm] = useState("");

    // Filtra os clientes pelo nome com base na palavra-chave
    const filteredClientes = useMemo(() => {
        if (!searchTerm) return clientes;
        return clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [clientes, searchTerm]);

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Página de Clientes
            </Typography>

            <ClientesFilter setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            <ClientesTable clientes={filteredClientes} loading={loading} />
        </Box>
    );
}
