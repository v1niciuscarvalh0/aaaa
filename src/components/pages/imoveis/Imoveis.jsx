import { Box, Typography, TextField } from "@mui/material";
import { ImoveisFilter } from "./ImoveisFilter";
import Grid from "@mui/material/Grid";
import ImoveisCard from "./ImoveisCard";
import { useNavigate } from "react-router";
import { useEffect, useState, useMemo } from "react";

export const Imoveis = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDetails = (id) => {
        navigate(`/imoveis-view/${id}`);
    };

    useEffect(() => {
        const fetchImoveis = async () => {
            try {
                const response = await fetch("http://localhost:8080/imoveis");
                if (!response.ok) throw new Error("Erro ao buscar imóveis");
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImoveis();
    }, []);

    const filteredCards = useMemo(() => {
        if (!searchTerm) return cards;
        return cards.filter(card =>
            card.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [cards, searchTerm]);

    if (loading) {
        return <Typography>Carregando imóveis...</Typography>;
    }

    return (
        <>
            <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Página de Imóveis
                </Typography>

                {/* Campo de pesquisa substituindo o botão */}


                <ImoveisFilter setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                <Box sx={{ marginBottom: 6 }} />
            </Box>

            <Grid container spacing={2}>
                {filteredCards.map((card) => (
                    <Grid item key={card.id}>
                        <ImoveisCard
                            title={card.titulo || "Sem título"}
                            description={card.descricao || "Sem descrição disponível"}
                            onDetails={() => handleDetails(card.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
