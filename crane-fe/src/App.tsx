import * as React from "react";
import { Routes, Route } from "react-router-dom";

// MUI dependencies
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

// Internal dependencies
import Story from "./pages/Story";
import HomePage from "./pages/HomePage";
import View from "./pages/View";
import Cloud from "./pages/Cloud";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ bgcolor: "background.default" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit" element={<Story />} />
            <Route path="/view" element={<View />} />
            <Route path="/cloud" element={<Cloud />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
