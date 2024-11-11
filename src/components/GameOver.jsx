import './GameOver.css';

const GameOver = ({ retry, score }) => {
  return (
    <div>
        <h1>Fim do Jogo!</h1>
        <h2>A sua pontuação foi: <span>{score}</span></h2>
        {/* Chamando a função retry que recebeu via props do App.js para reiniciar o jogo */}
        <button onClick={retry}>Jogar novamente</button>
    </div>
  )
}

export default GameOver