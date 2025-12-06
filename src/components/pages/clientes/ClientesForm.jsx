import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { TextFieldControlled } from "../../components/inputs/TextFieldControlled";
import { useNavigate, useParams } from "react-router";
import clienteService from '../../../services/clienteService';

export default function ClientesForm() {
    const { id } = useParams(); // ID da rota, se existir
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        control
    } = useForm();

    // Função para buscar cliente no caso de edição
    useEffect(() => {
        if (id) {
            setLoading(true);
            clienteService.obterCliente(id)
                .then(cliente => {
                    // Preenche os campos do formulário
                    Object.keys(cliente).forEach(key => {
                        if (key in cliente) setValue(key, cliente[key]);
                    });
                })
                .catch(err => console.error('Erro ao carregar cliente:', err))
                .finally(() => setLoading(false));
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            if (id) {
                // Edição
                await clienteService.atualizarCliente(id, data);
                alert('Cliente atualizado com sucesso!');
            } else {
                // Criação
                await clienteService.criarCliente(data);
                alert('Cliente criado com sucesso!');
            }
            navigate('/clientes');
        } catch (err) {
            console.error('Erro ao salvar cliente', err);
            alert('Erro ao salvar cliente. Veja o console para detalhes.');
        }
    };

    if (loading) return <Typography align="center" mt={5}>Carregando cliente...</Typography>;

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
                {id ? 'Editar Cliente' : 'Cadastro de Cliente'}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextFieldControlled
                        control={control}
                        name="nome"
                        label="Nome*"
                        rules={{ required: 'Nome é obrigatório' }}
                        fullWidth
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <TextFieldControlled
                                control={control}
                                name="cpf"
                                label="CPF*"
                                rules={{ required: 'CPF é obrigatório' }}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextFieldControlled
                                control={control}
                                name="dataNascimento"
                                label="Data de Nascimento*"
                                type="date"
                                rules={{ required: 'Data de nascimento é obrigatória' }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Box>
                    </Stack>

                    <TextFieldControlled
                        control={control}
                        name="login"
                        label="Login*"
                        rules={{ required: 'Login é obrigatório' }}
                        fullWidth
                    />

                    <TextFieldControlled
                        control={control}
                        name="email"
                        label="Email*"
                        type="email"
                        rules={{
                            required: 'Email é obrigatório',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' }
                        }}
                        fullWidth
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <TextFieldControlled
                                control={control}
                                name="telefone"
                                label="Telefone"
                                rules={{ required: 'Telefone é obrigatório' }}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextFieldControlled
                                control={control}
                                name="endereco"
                                label="Endereço"
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Box>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <TextFieldControlled
                                control={control}
                                name="senha"
                                label="Senha*"
                                type="password"
                                rules={{ required: 'Senha é obrigatória', minLength: { value: 6, message: 'Senha muito curta' } }}
                                fullWidth
                            />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <TextFieldControlled
                                control={control}
                                name="repetirSenha"
                                label="Repetir Senha*"
                                type="password"
                                rules={{
                                    required: 'Repetir senha é obrigatório',
                                    validate: (value) => value === watch('senha') || 'As senhas não coincidem'
                                }}
                                fullWidth
                            />
                        </Box>
                    </Stack>

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
                                {id ? 'Salvar' : 'Cadastrar'}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
}
