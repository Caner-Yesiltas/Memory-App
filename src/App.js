import { useState } from 'react';
import './styles/App.css';
import { useEffect } from 'react';

const cardList = [
  { path: '/img/1.jpeg' },
  { path: '/img/2.jpeg' },
  { path: '/img/3.jpeg' },
  { path: '/img/4.jpeg' },
  { path: '/img/5.jpeg' },
  { path: '/img/6.jpeg' },
];

function App() {
  const [cards, setCards] = useState([]);

  const prepareCards = () => {
  
    const sortedCards = [[...cardList, ...cardList]].sort(()=>0.5 - Math.random()).map((card)=>({...card, id:Math.random()}))

    setCards(sortedCards);
    
  };

  useEffect(() => {
    prepareCards();
  }, []);

  return (
    <div className='container'>
      <h1>Memory App</h1>
      <button>Let's Play</button>
      <div className='card-grid'>
        {cards.map((card) => (
          <div className='card'>
            <img className='cardFront' src={card.path} alt='' />
            <img className='cardBack' src='/img/cover.jpeg' alt='' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
