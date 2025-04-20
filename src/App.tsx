import './App.css'
import { useCallback, useContext, useEffect, useState } from 'react';
import SingleCard from './components/singleCard/SingleCard';
import { Card } from './lib/classes';
import Modal from './components/modal/Modal';
import { ModalContext } from './context/ModalContext';

const cardImages: Card[] = [
  new Card("/img/drakeposting-1.jpg", false, 1, 'drakeposting', 1),
  new Card("/img/drakeposting-2.jpg", false, 2, 'drakeposting', 2),
  new Card("/img/girl-yelling-cat-1.jpg", false, 3, 'girl-yelling-cat', 1),
  new Card("/img/girl-yelling-cat-2.jpg", false, 4, 'girl-yelling-cat', 2),
  new Card("/img/kombucha-girl-1.jpg", false, 5, 'kombucha-girl',1),
  new Card("/img/kombucha-girl-2.jpg", false, 6, 'kombucha-girl', 2),
  new Card("/img/cat-monkey-1.jpg", false, 7, 'cat-monkey', 1),
  new Card("/img/cat-monkey-2.jpg", false, 8, 'cat-monkey', 2),
  new Card("/img/this-is-fine-1.jpg", false, 9, 'this-is-fine', 1),
  new Card("/img/this-is-fine-2.jpg", false, 10, 'this-is-fine', 2),
  new Card("/img/for-the-better-1.jpg", false, 11, 'for-the-better', 1),
  new Card("/img/for-the-better-2.jpg", false, 12, 'for-the-better', 2)
]

function App() {

  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [victory, setVictory] = useState<boolean>(false);

  const [matchFlag, setMatchFlag] = useState<boolean>(false);

  const { showModal, dispatch } = useContext(ModalContext);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setVictory(false);
  }

  const resetTurn = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setMatchFlag(false);
    setTurns(prevTurns => prevTurns + 1);
  }, []);

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const handleInfo = () => {
    if (victory) {
      dispatch({ type: 'WIN_MESSAGE', payload: null });
    } else {
      dispatch({ type: 'WELCOME_PAGE', payload: null });
    }
  }

  const showWinMessage = useCallback(() => {
    dispatch({ type: 'WIN_MESSAGE', payload: null});
  }, [dispatch]);

  //start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {

    if(choiceOne && choiceTwo){

      setDisabled(true);

        if(choiceOne.meme === choiceTwo.meme){
          setCards((prevCards: Card[]) => {

            return prevCards.map(card => {

              if(card.meme === choiceOne.meme){

                setMatchFlag(true);
                return {...card, matched: true};

              }else{
                return card;
              }
            });
          })

        }

        setTimeout(resetTurn, 1000);
    }

  }, [choiceOne, choiceTwo, resetTurn]); 

  useEffect(() => {

    const matchedCards = cards.filter((card) => card.matched === true);
    
    if(matchedCards.length === cards.length && matchedCards.length !== 0) {

      setVictory(true);
      
      setTimeout(() => {
        showWinMessage();

      }, 800);
    }

  }, [matchFlag, cards, showWinMessage]);

  return (
    <div className="App">
      <div className="game-and-info">
        <h1 className='game-title'>reMEMEber</h1>
        <div className="icon" onClick={ handleInfo }>
          <img src="/icons/info-svgrepo-com.svg" alt="info" />
        </div>
      </div>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map((card: Card) => (
          <SingleCard key={card.id} 
          card={ card } 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: { turns }</p>
      {showModal && <Modal newGame={shuffleCards} />}
    </div>
  );
}

export default App;