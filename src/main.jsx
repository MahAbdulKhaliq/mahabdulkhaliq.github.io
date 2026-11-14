import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'
import App from './App.jsx'

// Easter egg for anyone who opens the developer tools.
console.log(
  "%cYou're not supposed to be here, you sneaky thing. :^)",
  'color: #8fdc8a; font: 700 14px monospace;',
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
