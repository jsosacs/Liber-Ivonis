import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import ExpandableWrapper from '../components/ExpandableWrapper'

export default function Proyectos() {
  return (
    <AppLayout>
      <div style={{ padding: '1rem' }}>

        <ExpandableWrapper title='Simulaciones'>

          <ExpandableWrapper title='Automata Celular'>
              <Link to="/Proyectos/Automata">Autómata Celular</Link>
          </ExpandableWrapper>

          <ExpandableWrapper title='Snake'>
              <Link to="/Proyectos/Snake">Snake</Link>
          </ExpandableWrapper>

        </ExpandableWrapper>


        <ExpandableWrapper title='Renders'>

          <ExpandableWrapper title='Fuente de Herón'>
              <iframe src="https://www.youtube.com/embed/rt4Soa-kD0o"></iframe>
          </ExpandableWrapper>

          <ExpandableWrapper title='DEMS'>
              <iframe src="https://www.youtube.com/embed/ImW8TN0xp6A"></iframe>
          </ExpandableWrapper>

          <ExpandableWrapper title='Aerogenerador'>
              <iframe src="https://www.youtube.com/embed/5hk-dhpeaR4"></iframe>
          </ExpandableWrapper>

          <ExpandableWrapper title='Hospital'>
              <iframe src="https://www.youtube.com/embed/z6CR7TGcFh0"></iframe>
          </ExpandableWrapper>

          <ExpandableWrapper title='RRDE'>
              <iframe src="https://www.youtube.com/embed/ghkNU5OhRz0"></iframe>
          </ExpandableWrapper>

          <ExpandableWrapper title='Despacho'>
              <iframe src="https://www.youtube.com/embed/Q_JvVnc3atY"></iframe>
          </ExpandableWrapper>

          <ExpandableWrapper title='Circuito'>
              <iframe src="https://www.youtube.com/embed/iICeaqBSDUc"></iframe>
          </ExpandableWrapper>

        </ExpandableWrapper>

        <ExpandableWrapper title = 'Repositorios'>
          <p>Poco a poco...</p>
        </ExpandableWrapper>

      </div>
    </AppLayout>
  )
}
