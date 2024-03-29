import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { ThemeProvider , createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff"
    },
    secondary: {
      main: "#ffffff"
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(    

  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)
