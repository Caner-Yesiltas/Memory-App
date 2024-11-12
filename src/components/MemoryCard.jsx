import React from 'react'

const MemoryCard = ({card, handleSelected, disabled}) => {
    const handleClick = () =>{
        if(!disabled) {
            handleSelected(card);
        }
      

    }

  return (
    <div className='card'>
    <img className='cardFront' src={card.path} alt='' />
    <img className='cardBack'  onClick={handleClick}  src='/img/cover.jpeg' alt='' />
  </div>
  )
}

export default MemoryCard
