import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/main.css'

// Set the saved theme BEFORE mounting React; dark is always the default.
let initialTheme = "dark";
try {
    initialTheme = localStorage.getItem("arabic-l10-theme") === "light" ? "light" : "dark";
} catch {
    // Browsers with blocked storage still get the original pitch-black theme.
}
document.documentElement.dataset.theme = initialTheme;
document.documentElement.style.colorScheme = initialTheme === "light" ? "light" : "";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
)