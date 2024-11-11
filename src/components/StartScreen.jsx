import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        {/* Chamando a função startGame que recebeu via props do App.js para iniciar o jogo */}
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen