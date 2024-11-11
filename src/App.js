// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// data
import { wordsList } from './data/words'; // Lista de palavras a serem descobertas

// componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// Estágios do jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [ gameStage, setGameStage ] = useState(stages[0].name);
  const [ words ] = useState(wordsList);

  const [ pickedWord, setPickedWord ] = useState("");
  const [ pickedCategory, setPickedCategory ] = useState("");
  const [ letters, setLetters ] = useState([]);

  const [ guessedLetters, setGuessedLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ guesses, setGuesses ] = useState(guessesQty);
  const [ score, setScore ] = useState(0);


  // Função que gera a palavra e a categoria que o usuário deverá advinhar
  //useCallback foi usado pois pickWordAndCategory é um dado monitorado pelo useCallback abaixo
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words); // pega todas as categorias no arquivo words.js
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] // gerando uma categoria aleatória

    const word = words[category][Math.floor(Math.random() * words[category].length)]
    // words[category] - acessando as palavras a partir da categoria gerada
    // [Math.floor(Math.random() * words[category].length)] - gerando uma palavra aleatória

    return {word, category}; // retornando a categoria e palavra que o usuário deverá advinhar
  }, [words])

  // Função que inicia o jogo
  //useCallback foi usado pois startGame é um dado monitorado pelo userEffect lá em baixo
  const startGame = useCallback(() => {
    // resetando para os estados iniciais
    clearLetterStates();

    // recebendo a palavra e a categoria
    const { word, category } = pickWordAndCategory();

    // Criando um array com as letras da palavra
    let wordLetters = word.split("");

    // colocando todas as letras em minusculo
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // setando os dados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Função que processa a letra digitada pelo usuário
  const verifyLetter = (letter) => {
    // colocando todas as letras em minuscula
    const normalizedLetter = letter.toString().toLowerCase();

    // verifica se a letra já foi utilizada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return; // só retorna para não processar uma letra já utilizada
    }

    // Inserindo as letras digitadas pelo usuário nas letras certas ou erradas e removendo as tentativas
    if(letters.includes(normalizedLetter)) {
      // caso a letra esteja certa
      // pega os elementos (letras) atuais e adiciona o novo (letra)
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ])
    } else if(typeof normalizedLetter === 'string' && normalizedLetter.length === 1) { //typeof normalizedLetter === 'string' && normalizedLetter.length === 1 - para tirar o [object, object] que tava inserindo
      // caso a letra esteja errada
      // pega os elementos (letras) atuais e adiciona o novo (letra)
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      // Diminuindo as tentativas
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // Monitorando as tentativas
  useEffect(() => {
    // cada vez que o dado informado no [] é alterado, aqui é chamado
    // Quando as tentaivas acabarem
    if(guesses <= 0) {
      // resetando para os estados iniciais
      clearLetterStates();

      // setando o estado do game para fim (game over) e assim encerrando o jogo
      setGameStage(stages[2].name);
    }
  }, [guesses]) //[dado que será monitorado]

  // Monitorando condição de vitória
  useEffect(() => {
    // Criando um array de letras unicas, para que se o usuário digitar o para a palavra ovo, ele já valide os dois o na palavra
    const uniqueLetters = [...new Set(letters)]

    // condição de vitória
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore((actualScore) => actualScore += 100);

      setTimeout(() => {
        // reiniciando o jogo com uma nova palavra
        setGuesses(guessesQty); //reiniciando as tentivas
        startGame();
      }, 3000);
    }
  }, [guessedLetters, letters, gameStage, startGame])



  // Função que reinicia o jogo
  const retry = () => {
    // Limpando a pontuação e as tentivas atuais
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {/* Só irá aparecer o StartScreen quando o stage for igual a start */}
      { gameStage === 'start' && <StartScreen startGame={startGame} /> }
      {/* Só irá aparecer o Game quando o stage for igual a game */}
      { gameStage === 'game' && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        /> 
      }
      {/* Só irá aparecer o GameOver quando o stage for igual a end */}
      { gameStage === 'end' && <GameOver retry={retry} score={score} /> }
    </div>
  );
}

export default App;
