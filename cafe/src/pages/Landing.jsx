import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export default function Landing() {
  const { data, error, loading } = useQuery(ITEMS)

  if (loading) return <div>loading</div>
  if (error) return <div>{error.message}</div>

  console.log(data)

  return <div>hi iam landing page</div>
}

const ITEMS = gql`
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
