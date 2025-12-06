import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Stack, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { TextFieldControlled } from "../../components/inputs/TextFieldControlled";
import imovelService from '../../../services/imovelService';
import clienteService from '../../../services/clienteService';

export function ImoveisForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // captura o id da URL
    const [clientes, setClientes] = useState([]);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            titulo: "",
            descricao: "",
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
            preco: "",
            proprietarioId: "" // campo do select
        }
    });

    // Carregar clientes e, se existir id, carregar imóvel
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await clienteService.listarClientes();
                setClientes(res);
            } catch (err) {
                console.error('Erro ao buscar clientes:', err);
            }
        };
        fetchClientes();

        if (id) { // edição
            const fetchImovel = async () => {
                try {
                    const imovel = await imovelService.obterImovel(id);
                    reset({
                        titulo: imovel.titulo,
                        descricao: imovel.descricao,
                        rua: imovel.rua,
                        numero: imovel.numero,
                        complemento: imovel.complemento,
                        bairro: imovel.bairro,
                        cidade: imovel.cidade,
                        estado: imovel.estado,
                        cep: imovel.cep,
                        preco: imovel.preco,
                        proprietarioId: imovel.proprietario.id
                    });
                } catch (err) {
                    console.error('Erro ao carregar imóvel:', err);
                    alert('Não foi possível carregar os dados do imóvel.');
                }
            };
            fetchImovel();
        }
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = { ...data, proprietario: { id: data.proprietarioId } };
            delete payload.proprietarioId;

            let res;
            if (id) {
                res = await imovelService.atualizarImovel(id, payload);
                alert(`Imóvel atualizado: ${res.titulo}`);
            } else {
                res = await imovelService.criarImovel(payload);
                alert(`Imóvel cadastrado: ${res.titulo}`);
            }

            reset();
            navigate(-1);
        } catch (err) {
            console.error('Erro ao salvar imóvel:', err);
            alert('Erro ao salvar imóvel. Veja o console para mais detalhes.');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                mt: 5,
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" mb={3} align="center">
                {id ? "Editar Imóvel" : "Cadastro de Imóvel"}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextFieldControlled control={control} name="titulo" label="Título do imóvel" rules={{ required: 'Título é obrigatório' }} fullWidth />
                    <TextFieldControlled control={control} name="descricao" label="Descrição" rules={{ required: 'Descrição é obrigatória' }} fullWidth multiline rows={4} />
                    <TextFieldControlled control={control} name="rua" label="Rua" rules={{ required: 'Rua é obrigatória' }} fullWidth />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextFieldControlled control={control} name="numero" label="Número" fullWidth />
                        <TextFieldControlled control={control} name="complemento" label="Complemento" fullWidth />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextFieldControlled control={control} name="bairro" label="Bairro" fullWidth />
                        <TextFieldControlled control={control} name="cidade" label="Cidade" fullWidth />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextFieldControlled control={control} name="estado" label="Estado" fullWidth />
                        <TextFieldControlled control={control} name="cep" label="CEP" fullWidth />
                    </Stack>

                    <TextFieldControlled control={control} name="preco" label="Preço" type="number" rules={{ required: 'Preço é obrigatório' }} fullWidth />

                    {/* Select de clientes */}
                    <Controller
                        name="proprietarioId"
                        control={control}
                        rules={{ required: 'Proprietário é obrigatório' }}
                        render={({ field, fieldState: { error } }) => (
                            <FormControl fullWidth error={!!error}>
                                <InputLabel id="cliente-label">Proprietário</InputLabel>
                                <Select
                                    {...field}
                                    labelId="cliente-label"
                                    label="Proprietário"
                                >
                                    {clientes.map((cliente) => (
                                        <MenuItem key={cliente.id} value={cliente.id}>
                                            {cliente.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && <Typography color="error" variant="caption">{error.message}</Typography>}
                            </FormControl>
                        )}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                onClick={() => navigate(-1)}
                                sx={{ width: 140, backgroundColor: 'grey.500', color: 'white', '&:hover': { backgroundColor: 'grey.600' } }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" color="primary" sx={{ width: 140 }}>
                                {id ? "Atualizar Imóvel" : "Cadastrar Imóvel"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
}
