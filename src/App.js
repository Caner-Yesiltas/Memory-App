import { useState } from 'react';
import './styles/App.css';
import { useEffect } from 'react';
import MemoryCard from './components/MemoryCard';

const cardList = [
  { path: '/img/1.jpeg', matched: false },
  { path: '/img/2.jpeg', matched: false },
  { path: '/img/3.jpeg', matched: false },
  { path: '/img/4.jpeg', matched: false },
  { path: '/img/5.jpeg', matched: false },
  { path: '/img/6.jpeg', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const prepareCards = () => {
    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
  };

  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);

      if (selectedOne.path === selectedTwo.path) {
        setCards((currentCards) => {
          return currentCards.map((card) => {
            if (card.path === selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;

              // TODO: Review complex state management in useEffect
              // TODO: Understand deep card state updates
              // TODO: Consider refactoring nested state logic !!!

              /*


              Note: I wrote this explanation in Turkish because React state management 
has a complex structure that can be quite confusing for those encountering 
it for the first time, and I wanted to explain it more clearly.


Cards state yönetiminde karşılaşılan kafa karıştırıcı durumlar:

1. setCards kullanırken aslında cards state'ini kullanıyoruz:
  - cards: ilk baştaki state'imiz tüm kartları içeriyor
  - setCards ile bu cards state'ini güncelliyoruz

2. setCards(currentCards => {}) yazarken:
  - currentCards parametresi aslında cards state'inin kendisi
  - Ama current dememizin sebebi artık ilk hali değil
  - Her state güncellemesinde kartlar güncellendiği için en son hali

3. En kafa karıştırıcı kısım:
  currentCards.map(card => {})
  - currentCards (yani güncellenmiş cards state'i) içinde 
  - card parametresiyle tekrar dönüyoruz
  - Bu card, en baştaki cards state'inin güncellenmiş halindeki her bir kart

Yani iç içe karmaşık gibi görünen yapının sebebi:
- cards -> state güncelleniyor 
- currentCards -> güncellenen state'i temsil ediyor
- card -> güncellenen state içindeki her bir kartı temsil ediyor
*/
            }
          });
        });
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  };

  return (
    <div className='container'>
      <h1>Memory App</h1>
      <button onClick={prepareCards}>Let's Play</button>
      <div className='card-grid'>
        {cards.map((card) => (
          <MemoryCard
            card={card}
            key={card.id}
            handleSelected={handleSelected}
            disabled={disabled}
            rotated={
              card === selectedOne || card === selectedTwo || card.matched
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
