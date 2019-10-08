const AWS = require('aws-sdk')

const accessKeyId = process.env.ACCESS_KEY
const Bucket = process.env.BUCKET_NAME
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3bucket = new AWS.S3({ accessKeyId, secretAccessKey, Bucket })

function s3UploadFile(file) {
  const params = {
    Bucket,
    Key: new Date().getMilliseconds() + file.name,
    Body: file.data,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

function s3DeleteFile(Key) {
  const params = { Bucket, Key }

  return new Promise((resolve, reject) => {
    s3bucket.deleteObject(params, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

function s3UpdateFile(oldKey, file) {
  const params = {
    Bucket,
    Key: oldKey,
    Body: file.data,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3bucket.putObject(params, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

module.exports = { s3UpdateFile, s3DeleteFile, s3UploadFile }
