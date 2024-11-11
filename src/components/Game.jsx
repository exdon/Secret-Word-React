import { useRef, useState } from 'react';
import './Game.css';

const Game = ({
    verifyLetter, 
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score}) => {
        const [letter, setLetter] = useState("");
        const letterInputRef = useRef(null); // cria uma referência a um elemento no dom (tipo um document.querySelector("div"))

        const handleSubmit = (e) => {
            e.preventDefault();

            // verificando letra digitada pelo usuário
            verifyLetter(letter);

            // limpando o campo de input de letra
            setLetter("");

            // dando foco no elemento em referência
            // isso fará com que ao terminar de digitar a palavra o cursor continue com foco no input
            // para facilitar a entrada da próxima palavra sem que o usuário precisse clicar de novo
            letterInputRef.current.focus();
        }

  return (
    <div className='game'>
        <p className='points'>
            <span>Pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="tip">
            Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentiva(s).</p>
        <div className="wordContainer">
            {letters.map((letter, index) => (
                //imprime a letra, caso ela já tenha sido advinhada
                guessedLetters.includes(letter) 
                ? (
                    <span key={index} className='letter'>{letter}</span>
                )
                : (
                    // caso contrário não mostra nada
                    <span key={index} className="blankSquare"></span>
                ) 
            ))}
        </div>
        <div className="letterContainer">
            <p>Tente advinhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name='letter' maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
                <button>Jogar</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras erradas:</p>
            {wrongLetters.map((letter, i) => (
                // mostra todas as letras incorretas já informadas
                <span key={i}>{letter}, </span>
            ))}
        </div>
        <div>
            <p>Letras já utilizadas:</p>
            {guessedLetters + " "}
        </div>
    </div>
  )
}

export default Game