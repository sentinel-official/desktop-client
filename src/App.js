import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./utils/styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./utils/styles";
import { AuthGate } from "./Pages/Auth/AuthGate";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AuthGate />
      </Router>
    </ThemeProvider>
  );
}

export default App;
