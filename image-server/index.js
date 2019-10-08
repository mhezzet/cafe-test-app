const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const {
  s3DeleteFile,
  s3UpdateFile,
  s3UploadFile
} = require('./s3HelperFunctions')

const app = express()

app.use(helmet())
app.use(cors())
app.use(fileUpload())

app.post('/images', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('No files were uploaded.')

  const image = req.files.image

  const response = await s3UploadFile(image)

  res.send(response)
})

app.delete('/images/:key', async (req, res) => {
  await s3DeleteFile(req.params.key)
  res.send('image deleted')
})

app.put('/images/:key', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('No files were uploaded.')

  const image = req.files.image

  const response = await s3UpdateFile(req.params.key, image)

  res.send(response)
})

app.listen(process.env.PORT)
