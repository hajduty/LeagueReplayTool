import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { RenderForm } from './Pages/Render.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './theme.ts'
import { VisibilityForm } from './Pages/Visibility.tsx'
import { KeybindsForm } from './Pages/Keybinds.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/render" element={<RenderForm />} />
          <Route path="/visibility" element={<VisibilityForm />} />
          <Route path="/keybind" element={<KeybindsForm />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
