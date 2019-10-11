import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'

const localSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  type: yup.string().oneOf(['SIDE', 'MAIN_COURSE'])
})

export default function ItemForm({
  initialValues = null,
  onSubmit,
  type = 'create'
}) {
  const [photo, setPhoto] = useState(null)
  const [photoTouched, setPhotoTouched] = useState(false)

  useEffect(() => {
    if (type === 'edit' && initialValues) setPhoto(initialValues.item.photo)
  }, [initialValues])

  console.log('man', initialValues)

  return (
    <Formik
      enableReinitialize
      initialValues={
        (initialValues && initialValues.item) || {
          name: '',
          price: '',
          type: 'MAIN_COURSE'
        }
      }
      validationSchema={localSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!photo) {
          setSubmitting(false)
          setPhotoTouched(true)
          return
        }
        const newValues = { ...values, photo }
        onSubmit(newValues, setSubmitting)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name='type'
            render={({ field, form: { isSubmitting } }) => (
              <div className='form-group row'>
                <label htmlFor='type' className='col-sm-2 col-form-label'>
                  Type
                </label>
                <div className='col-sm-10'>
                  <select
                    disabled={isSubmitting}
                    {...field}
                    className='form-control'
                    id='type'
                  >
                    <option value='MAIN_COURSE'>main course</option>
                    <option value='SIDE'>side</option>
                  </select>
                </div>
              </div>
            )}
          />
          <Field
            name='name'
            render={({ field, form: { touched, errors, isSubmitting } }) => (
              <div className='form-group row'>
                <label
                  htmlFor='name'
                  className={`col-sm-2 col-form-label ${touched.name &&
                    errors.name &&
                    'text-danger'}`}
                >
                  Name
                </label>
                <div className='col-sm-10'>
                  <input
                    {...field}
                    type='text'
                    disabled={isSubmitting}
                    className={`form-control ${touched.name &&
                      errors.name &&
                      'is-invalid'}`}
                    id='name'
                  />
                  {touched.name && errors.name && (
                    <small className='form-text text-danger '>
                      {errors.name}
                    </small>
                  )}
                </div>
              </div>
            )}
          />
          <Field
            name='price'
            render={({ field, form: { touched, errors, isSubmitting } }) => (
              <div className='form-group row'>
                <label
                  htmlFor='price'
                  className={`col-sm-2 col-form-label ${touched.price &&
                    errors.price &&
                    'text-danger'}`}
                >
                  Price
                </label>
                <div className='col-sm-10'>
                  <input
                    {...field}
                    type='number'
                    disabled={isSubmitting}
                    className={`form-control ${touched.price &&
                      errors.price &&
                      'is-invalid'}`}
                    id='price'
                  />
                  {touched.price && errors.price && (
                    <small className='form-text text-danger '>
                      {errors.price}
                    </small>
                  )}
                </div>
              </div>
            )}
          />
          <div className='form-group row'>
            <label htmlFor='photo' className='col-sm-2 col-form-label'>
              Photo
            </label>
            <div className='col-sm-10'>
              <div>
                <label htmlFor='photo' className='btn btn-primary'>
                  Choose Photo
                </label>
                <input
                  disabled={isSubmitting}
                  name='photo'
                  style={{ display: 'none' }}
                  onChange={e => setPhoto(e.target.files[0])}
                  accept='image/x-png,image/jpeg'
                  type='file'
                  id='photo'
                />
              </div>
              <span>{(photo && photo.name) || (photo && photo.key)}</span>
              {!photo && photoTouched && (
                <small className='form-text text-danger'>
                  photo is required
                </small>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type='submit'
              className='btn btn-primary'
            >
              {type === 'create' ? 'Save Item' : 'Edit Item'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
