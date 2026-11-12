import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login.jsx'
import PacientesCadastrados from './pages/PacientesCadastrados.jsx'
import DetalhesPaciente from './pages/DetalhesPaciente.jsx'
import CadastrarPaciente from './pages/CadastrarPaciente.jsx'
import EditarPaciente from './pages/EditarPaciente.jsx'

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
  },
  {
    path: "/pacientes/cadastro",
    element: <CadastrarPaciente/>
  },
  {
    path: "/pacientes/edit",
    element: <EditarPaciente/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
