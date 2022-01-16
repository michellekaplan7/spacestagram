import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          color: "red",
        },
      },
    },
  },
});

const responsiveFontOptions = {
  factor: 2, //default: 2
};

export default responsiveFontSizes(theme, responsiveFontOptions);
