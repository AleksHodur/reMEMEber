import './SingleCard.css';
import { SingleCardProps } from '../../lib/types';

function SingleCard({ card, handleChoice, flipped, disabled }: SingleCardProps) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card);
        }
    }

    return ( 
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
              <img className='front' src={card.src} alt='card front'/>
              <img src='/img/cover.webp'
              alt="card-back"
              className="back"
              onClick={ handleClick }
              />
            </div>
        </div>
     );
}

export default SingleCard;