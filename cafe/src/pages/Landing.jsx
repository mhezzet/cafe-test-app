import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import imageServer from '../api'
import Card from '../components/Card'
import history from '../history'

export default function Landing() {
  const { data, error, loading } = useQuery(ITEMS)
  const [deleteItem] = useMutation(DELET_ITEM)

  const deleteItemHandler = async id => {
    await imageServer.delete(`/images/${id}`)

    deleteItem({
      variables: { id },
      update(proxy) {
        const { items } = proxy.readQuery({ query: ITEMS })
        const newItems = [...items]
        const itemIndex = newItems.findIndex(item => item.id === id)

        newItems.splice(itemIndex, 1)

        proxy.writeQuery({
          query: ITEMS,
          data: { items: newItems }
        })
      }
    })
  }

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
    <div style={{ maxWidth: 1450, margin: 'auto' }} className=' mt-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h5 style={{ fontSize: 28 }} className='mx-4'>
          Menu
        </h5>
        <button
          onClick={() => history.push('/create')}
          type='button'
          style={{
            fontSize: 18,
            backgroundColor: '#3b86ff',
            borderColor: '#3b86ff'
          }}
          className='btn btn-primary mx-4'
        >
          Add menu item
        </button>
      </div>
      <div className='d-flex flex-wrap justify-content-center mt-4'>
        {data.items.map(item => (
          <Card
            key={item.id}
            onDelete={() => deleteItemHandler(item.id)}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export const ITEMS = gql`
  query {
    items(orderBy: updatedAt_DESC) {
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

const DELET_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
      name
      price
      type
    }
  }
`
