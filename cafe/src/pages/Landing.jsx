import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Card from '../components/Card'
import history from '../history'

export default function Landing() {
  const { data, error, loading } = useQuery(ITEMS)

  if (loading)
    return (
      <div className='d-flex mt-5 justify-content-center'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    )
  if (error) return <div>{error.message}</div>

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h5 className='mx-4'>Menu</h5>
        <button
          onClick={() => history.push('/create')}
          type='button'
          className='btn btn-primary mx-4'
        >
          Add menu item
        </button>
      </div>
      <div className='d-flex flex-wrap justify-content-center mt-4'>
        {data.items.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export const ITEMS = gql`
  query {
    items {
      id
      name
      price
      type
      photo {
        id
        url
        key
      }
    }
  }
`
