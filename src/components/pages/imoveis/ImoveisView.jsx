import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Button, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import imovelService from '../../../services/imovelService';

export default function ImoveisView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imovel, setImovel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchImovel() {
            try {
                const res = await imovelService.obterImovel(id);
                setImovel(res);
            } catch (err) {
                console.error('Erro ao carregar imóvel:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchImovel();
    }, [id]);

    if (loading) return <Typography align="center">Carregando imóvel...</Typography>;
    if (!imovel) return <Typography align="center">Imóvel não encontrado.</Typography>;

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", mt: 5 }}>
            <Typography variant="h4" mb={3} align="center">
                Detalhes do Imóvel
            </Typography>

            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h6">{imovel.titulo}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {imovel.descricao}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography>
                    <strong>Endereço:</strong> {imovel.rua}, {imovel.numero} {imovel.complemento || ''}, {imovel.bairro}, {imovel.cidade} - {imovel.estado}, CEP: {imovel.cep}
                </Typography>
                <Typography><strong>Preço:</strong> R$ {imovel.preco}</Typography>

                {imovel.proprietario && (
                    <Typography>
                        <strong>Proprietário:</strong> {imovel.proprietario.nome} ({imovel.proprietario.email})
                    </Typography>
                )}

                {/* Botões de ação */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'grey.500', color: 'white', '&:hover': { backgroundColor: 'grey.600' } }}
                            onClick={() => navigate(-1)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/imoveis-form/${imovel.id}`)}
                        >
                            Editar
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
