import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login.jsx'
import PacientesCadastrados from './pages/PacientesCadastrados.jsx'
import DetalhesPaciente from './pages/DetalhesPaciente.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/pacientes",
    element: <PacientesCadastrados/>
  },
  {
    path: "/pacientes/detalhes",
    element: <DetalhesPaciente/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
