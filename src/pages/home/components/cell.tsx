import React from 'react'

interface CellProps {
  isBlack: boolean
  onClick: () => void
  initialValue: string
}

const Cell: React.FC<CellProps> = ({ isBlack, onClick, initialValue }) => {
  const cellColor = isBlack ? 'white' : '#68FD8F'
  const cellBorder = isBlack ? 'none' : '1px solid black'

  return (
    <div className="cell" onClick={onClick} style={{ backgroundColor: cellColor, border: cellBorder }}>
      {initialValue}
    </div>
  )
}

export default Cell
