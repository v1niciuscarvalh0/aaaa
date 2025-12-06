import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router";

export const ImoveisFilter = ({ setSearchTerm, searchTerm }) => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
            <Box>
                <Link to="/imoveis-form ">
                    <Button variant="contained">Adicionar cliente </Button>
                </Link>
            </Box >
            <Box display="flex" alignItems="center" gap={1}>
                <TextField
                    label="Pesquisar imóvel pelo título"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    value={searchTerm}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}

                />
            </Box>
        </Box >
    );
}