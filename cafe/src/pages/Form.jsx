import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import history from '../history'
import ItemForm from '../components/ItemForm'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { ITEMS } from './Landing'
import imageServer from '../api'

export default function Form(props) {
  const type = props.match.params.type
  const id = props.match.params.id
  const [createItem] = useMutation(CREATE_ITEM)
  const [updateItem] = useMutation(UPDATE_ITEM)
  const [getItem, { data }] = useLazyQuery(ITEM)

  useEffect(() => {
    if (id) getItem({ variables: { id } })
  }, [id, getItem])

  if (type !== 'create' && type !== 'edit') {
    history.push('/404')
    return null
  }

  const submitHandler = async (values, setSubmit) => {
    if (type === 'create') {
      const form = new FormData()
      form.append('image', values.photo)

      const response = await imageServer.post('/images', form)

      await createItem({
        variables: {
          ...values,
          photo: {
            create: {
              url: response.data.Location,
              key: response.data.key
            }
          }
        },
        update(
          proxy,
          {
            data: { createItem }
          }
        ) {
          const { items } = proxy.readQuery({ query: ITEMS })

          proxy.writeQuery({
            query: ITEMS,
            data: { items: [createItem, ...items] }
          })
        }
      })

      setSubmit(true)
      history.push('/')
    } else {
      if (values.photo instanceof File) {
        const form = new FormData()
        form.append('image', values.photo)

        await imageServer.put(`/images/${data.item.photo.key}`, form)

        await updateItem({ variables: values })
        setSubmit(true)
        history.push('/')
      } else {
        await updateItem({ variables: values })
        setSubmit(true)
        history.push('/')
      }
    }
  }

  return (
    <div style={{ maxWidth: 1450 }}>
      <div style={{ maxWidth: 523, marginLeft: 111, marginRight: 20 }}>
        <ItemForm type={type} initialValues={data} onSubmit={submitHandler} />
      </div>
    </div>
  )
}

const CREATE_ITEM = gql`
  mutation createItem(
    $name: String!
    $price: Float!
    $type: ItemType!
    $photo: PhotoCreateOneWithoutItemInput!
  ) {
    createItem(
      data: { name: $name, price: $price, type: $type, photo: $photo }
    ) {
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

const ITEM = gql`
  query item($id: ID!) {
    item(where: { id: $id }) {
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
const UPDATE_ITEM = gql`
  mutation updateItem(
    $id: ID!
    $name: String!
    $price: Float!
    $type: ItemType!
  ) {
    updateItem(
      data: { name: $name, price: $price, type: $type }
      where: { id: $id }
    ) {
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
