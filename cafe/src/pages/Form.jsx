import React from 'react'
import history from '../history'
import ItemForm from '../components/ItemForm'

export default function Form(props) {
  const type = props.match.params.type
  const id = props.match.params.id

  if (type !== 'create' && type !== 'edit') {
    history.push('/404')
    return null
  }

  const submitHandler = (values, setSubmit) => {
    console.log(values)
    setSubmit(true)
  }

  return <ItemForm type={type} onSubmit={submitHandler} />
}
