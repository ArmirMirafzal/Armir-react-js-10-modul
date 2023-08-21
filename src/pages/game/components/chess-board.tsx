import "../../../assets/chessboard.css";

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ChessBoard = () => {
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;

      if (number % 2 === 0) {
        board.push(
          <div className="tile white-tile">
            [{horizontalAxis[i]}
            {verticalAxis[j]}]
          </div>
        );
      }
      if (number % 2 !== 0) {
        board.push(
          <div className="tile black-tile">
            [{horizontalAxis[i]}
            {verticalAxis[j]}]
          </div>
        );
      }
    }
  }

  return <div id="chessboard">{board}</div>;
};

export default ChessBoard;
