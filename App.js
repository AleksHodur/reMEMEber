import './App.css'
import { useEffect, useRef, useState } from 'react';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      setCards(shuffledCards);
      setTurns(0);
      setChoiceOne(null);
      setChoiceTwo(null);
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(prevTurns => prevTurns + 1);
    console.log('turns: ' + turns);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {

    if(choiceOne && choiceTwo){

      setDisabled(true);

        if(choiceOne.src === choiceTwo.src){
          setCards(prevCards => {

            return prevCards.map(card => {

              if(card.src === choiceOne.src){
                return {...card, matched: true};
              }else{
                return card;
              }
            });
          })
        console.log('correct!');
        }else{
        console.log('wrong!!');
        }

        setTimeout(resetTurn, 1000);
    }

  }, [choiceOne, choiceTwo]); 

  console.log(cards);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} 
          card={ card } 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: { turns }</p>
    </div>
  );
}

export default App