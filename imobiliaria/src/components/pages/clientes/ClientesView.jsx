import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Button, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import clienteService from '../../../services/clienteService';

export default function ClientesView() {
    const { id } = useParams(); // pega o id da rota dinâmica
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCliente() {
            try {
                const res = await clienteService.obterCliente(id); // buscar cliente pelo id
                setCliente(res);
            } catch (err) {
                console.error('Erro ao carregar cliente:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchCliente();
    }, [id]);

    if (loading) return <Typography align="center">Carregando cliente...</Typography>;

    if (!cliente) return <Typography align="center">Cliente não encontrado.</Typography>;

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", mt: 5 }}>
            <Typography variant="h4" mb={3} align="center">
                Detalhes do Cliente
            </Typography>

            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h6">{cliente.nome}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {cliente.email}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography><strong>CPF:</strong> {cliente.cpf}</Typography>
                <Typography><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</Typography>
                <Typography><strong>Telefone:</strong> {cliente.telefone}</Typography>
                <Typography><strong>Endereço:</strong> {cliente.endereco}</Typography>
                <Typography><strong>Login:</strong> {cliente.login}</Typography>

                {/* Botões ao final */}
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'grey.500', '&:hover': { backgroundColor: 'grey.600' } }}
                        onClick={() => navigate(-1)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/clientes-form/${cliente.id}`)}
                    >
                        Editar
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}
