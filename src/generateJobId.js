// @flow

import crypto from 'crypto'

const BYTE_COUNT = 12

async function generateJobId () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(BYTE_COUNT, (err, buf) => {
      if (err) {
        reject(err)
      }
      resolve(buf.toString('hex'))
    })
  })
}

export default generateJobId
