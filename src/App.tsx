import React from "react";
import CryptoConverter from "./components/CryptoConverter";
import { Container, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          maxWidth: "xl",
          width: "100%",
          height: "100vh",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <CryptoConverter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
