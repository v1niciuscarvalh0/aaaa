import { Box, Container, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Outlet } from "react-router";

export default function Layout() {

    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="lg">
                <Box sx={{ marginTop: 8 }}>
                    <CssBaseline />
                    <Outlet />
                </Box>
            </Container>
        </>
    );
}
