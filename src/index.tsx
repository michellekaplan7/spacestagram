import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import App from "./components/App/App";
import { StoreProvider } from "./components/Store/Store";
import theme from "./muiTheme";
import "./index.css";

ReactDOM.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById("root")
);
