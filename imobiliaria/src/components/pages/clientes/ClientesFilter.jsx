import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export const ClientesFilter = ({ setSearchTerm, searchTerm }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Link to="/clientes-form" >
                    <Button variant="contained">Adicionar cliente</Button>
                </Link>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <TextField
                    label="Buscar cliente pelo nome"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
}