import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';
import clienteService from '../../../services/clienteService';
import { LoadingSpinner } from '../../components/inputs/LoadingSpinner';

export function ClientesTable({ clientes, onClienteDeleted, loading }) {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/clientes-view/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Deseja realmente excluir este cliente?')) return;
        try {
            await clienteService.deletarCliente(id);
            alert('Cliente excluído com sucesso!');
            if (onClienteDeleted) onClienteDeleted(id); // callback para atualizar lista
        } catch (err) {
            console.error('Erro ao excluir cliente', err);
            alert('Erro ao excluir cliente. Veja o console para detalhes.');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'dataNascimento', headerName: 'Data de nascimento', width: 150 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'telefone', headerName: 'Telefone', width: 160 },
        { field: 'login', headerName: 'Login', width: 160 },
        { field: 'endereco', headerName: 'Endereço', width: 160 },
        {
            field: 'actions',
            headerName: 'Ações',
            type: 'actions',
            width: 120,
            getActions: (params) => [
                <IconButton color="primary" onClick={() => handleEdit(params.id)} key="edit">
                    <EditIcon />
                </IconButton>,
                <IconButton color="error" onClick={() => handleDelete(params.id)} key="delete">
                    <DeleteIcon />
                </IconButton>,
            ],
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            {loading ? <LoadingSpinner /> :
                <DataGrid
                    rows={clientes}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    sx={{ border: 0 }}
                />
            }
        </Paper>

    );
}
