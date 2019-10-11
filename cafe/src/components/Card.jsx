import React from 'react'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import history from '../history'
const itemEnumToString = enumr => (enumr !== 'SIDE' ? 'MAIN COURSE' : enumr)

const Card = ({ item, onDelete }) => (
  <div className='card m-4 rounded-0 shadow-sm' style={{ width: '20rem' }}>
    <img
      style={{ height: 300, objectFit: 'cover' }}
      src={item.photo.url}
      className='card-img-top'
      alt={item.photo.key}
    />
    <div className='card-body position-relative'>
      <div className='d-flex justify-content-between align-items-center '>
        <div>
          <div>{itemEnumToString(item.type)}</div>
          <div>{item.name}</div>
        </div>
        <div>{item.price} $</div>
      </div>
    </div>
    <div
      style={{ top: 5, right: 5, width: 50, background: '#d3d3d373' }}
      className='position-absolute d-flex justify-content-between align-items-center p-1'
    >
      <FaRegEdit
        onClick={() => history.push(`/edit/${item.id}`)}
        style={{ cursor: 'pointer' }}
      />
      <FaTrashAlt onClick={onDelete} style={{ cursor: 'pointer' }} />
    </div>
  </div>
)

export default Card
