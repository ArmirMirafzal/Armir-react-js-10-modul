import { useEffect, useState } from 'react'
import { Box } from '@mantine/core'

import '../../../assets/chess-board.css'

// const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8]
// const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const ChessBoard = () => {
  const [boards, setBoard] = useState([
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'p', '', '', '', ''],
    ['', '', '', 'R', '', '', '', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'p', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ])
  const [count, setCount] = useState(0)

  const newBoard = []

  for (let j = 0; j < boards.length; j++) {
    for (let i = 0; i < boards[j].length; i++) {
      const number = j + i + 2

      if (number % 2 === 0) {
        newBoard.push(<div className="tile white-tile">[{[boards[j][i]]}]</div>)
      }
      if (number % 2 !== 0) {
        newBoard.push(<div className="tile black-tile">[{[boards[j][i]]}] </div>)
      }
    }
  }

  const numRookCaptures = (boards: string[][]) => {
    let result = count

    const ry = boards.findIndex(sb => sb.includes('R'))
    const rx = boards[ry]?.findIndex(cell => cell === 'R')

    let RX = ''
    let RY = ''

    for (let y = 0; y < boards.length; y++) {
      for (let x = 0; x < boards.length; x++) {
        const cell = boards[y][x]

        if (ry === y && cell !== '') RY += cell
        if (rx === x && cell !== '') RX += cell
      }
    }

    for (let i = 0; i < RX.length - 1; i++) {
      const sub = RX[i] + RX[i + 1]

      if (sub === 'pR' || sub === 'Rp') result++
    }

    for (let i = 0; i < RY.length - 1; i++) {
      const sub = RY[i] + RY[i + 1]

      if (sub === 'pR' || sub === 'Rp') result++
    }

    return result
  }

  useEffect(() => {
    setCount(numRookCaptures(boards))
  }, [boards])

  return (
    <div id="app">
      <div id="chessboard">{newBoard}</div>
      <Box sx={{ color: '#fff' }}>{count}</Box>
    </div>
  )
}

export default ChessBoard
