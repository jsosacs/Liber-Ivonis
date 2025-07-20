import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'

export default function Proyectos() {
  return (
    <AppLayout>
      <div style={{ padding: '1rem' }}>
        <h2>Simulaciones</h2>
        <ul>
          <li>
            <Link to="/Proyectos/Automata">Autómata Celular</Link>
          </li>
          <li>
            <Link to="/Proyectos/Snake">Snake</Link>
          </li>
        </ul>
        <h2>Renders</h2>
        <ul>
          <li>
            <Link to="https://youtu.be/rt4Soa-kD0o">Fuente de Herón</Link>
          </li>
          <li>
            <Link to="https://youtu.be/ImW8TN0xp6A">DEMS</Link>
          </li>
          <li>
            <Link to="https://youtu.be/5hk-dhpeaR4">Aerogenerador</Link>
          </li>
          <li>
            <Link to="https://youtu.be/z6CR7TGcFh0">Hospital</Link>
          </li>
          <li>
            <Link to="https://youtu.be/ghkNU5OhRz0">RRDE</Link>
          </li>
          <li>
            <Link to="https://youtu.be/Q_JvVnc3atY">Despacho</Link>
          </li>
          
          <li>
            <Link to="https://youtu.be/iICeaqBSDUc">Circuito</Link>
          </li>
        </ul>
        <h2>Repositorios</h2>
      </div>
    </AppLayout>
  )
}
