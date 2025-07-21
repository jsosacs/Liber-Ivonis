import { useState } from 'react'
import './ExpandableWrapper.css'

interface ExpandableWrapperProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export default function ExpandableWrapper({
  title,
  children,
  defaultExpanded = false,
}: ExpandableWrapperProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className="expandable-wrapper">
      <div className="expandable-header" onClick={() => setExpanded(e => !e)}>
        <h2 className="expandable-title">{title}</h2>
        <span className="expandable-toggle">{expanded ? '▾' : '▸'}</span>
      </div>
      {expanded && <div className="expandable-content">{children}</div>}
    </div>
  )
}
