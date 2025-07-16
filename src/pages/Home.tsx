import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Proyectos Liber-Ivonis</h1>
      <ul>
        <li>
          <Link to="/automata">Autómata Celular</Link>
        </li>
        {/* <li><Link to="/otro">Otro Proyecto</Link></li> */}
      </ul>
    </div>
  )
}
