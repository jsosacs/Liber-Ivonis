import { Link } from 'react-router-dom'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Liber Ivonis</h1>
        <p>Un proyecto de Javier Sosa y Paula Díaz</p>
        <p>Alumnos del Grado en Ingeniería Informática</p>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/Proyectos">Proyectos</Link>
          <Link to="/Guias">Guías ULL</Link>
          <Link to="/QuienesSomos">Quienes Somos</Link>
          <Link to="/Contacto">Contacto</Link>
        </nav>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Liber Ivonis</p>
      </footer>
    </div>
  )
}
