import { useState } from "react";

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function clique(i){
    const squareSuivant = squares.slice();
    squareSuivant[i] = "X";
    setSquares(squareSuivant);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => clique(0)}/>
        <Square value={squares[1]} onSquareClick={() => clique(1)}/>
        <Square value={squares[2]} onSquareClick={() => clique(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => clique(3)}/>
        <Square value={squares[4]} onSquareClick={() => clique(4)}/>
        <Square value={squares[5]} onSquareClick={() => clique(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => clique(6)}/>
        <Square value={squares[7]} onSquareClick={() => clique(7)}/>
        <Square value={squares[8]} onSquareClick={() => clique(8)}/>
      </div>
    </>
  );
}
