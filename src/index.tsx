import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import App from "./components/App/App";
import theme from "./muiTheme";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
