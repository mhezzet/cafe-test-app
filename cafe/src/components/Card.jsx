import React from 'react'

const itemEnumToString = enumr => (enumr !== 'SIDE' ? 'MAIN COURSE' : enumr)

const Card = ({ item }) => (
  <div className='card m-4 rounded-0 shadow-sm' style={{ width: '20rem' }}>
    <img
      style={{ height: 300, objectFit: 'cover' }}
      src={item.photo.url}
      className='card-img-top'
      alt={item.photo.key}
    />
    <div className='card-body'>
      <div className='d-flex justify-content-between align-items-center '>
        <div>
          <div>{itemEnumToString(item.type)}</div>
          <div>{item.name}</div>
        </div>
        <div>{item.price} $</div>
      </div>
    </div>
  </div>
)

export default Card
