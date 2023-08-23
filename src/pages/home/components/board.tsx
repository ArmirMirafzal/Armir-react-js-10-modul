import React from 'react'

import { Cell } from '.'

interface ChessboardProps {
  boardData: string[][]
  selectedValue: string
  onCellClick: (value: string, rowIndex: number, colIndex: number) => void
}

const Chessboard: React.FC<ChessboardProps> = ({ boardData, selectedValue, onCellClick }) => {
  const renderRow = (rowIndex: number) => {
    const cells = []

    for (let colIndex = 0; colIndex < 8; colIndex++) {
      const isBlack = (rowIndex + colIndex) % 2 === 1
      const cellContent = boardData[colIndex][rowIndex]

      cells.push(<Cell key={colIndex} isBlack={isBlack} initialValue={cellContent} onClick={() => onCellClick(selectedValue, rowIndex, colIndex)} />)
    }

    return cells
  }

  const renderBoard = () => {
    const rows = []

    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
      rows.push(
        <div key={rowIndex} className="row">
          {renderRow(rowIndex)}
        </div>
      )
    }

    return rows
  }

  return <div id="chessboard">{renderBoard()}</div>
}

export default Chessboard
