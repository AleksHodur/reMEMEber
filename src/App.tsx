import './App.css'
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import { Card } from './lib/classes';

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
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
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

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

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
      <h1>reMEMEber</h1>
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
    </div>
  );
}

export default App