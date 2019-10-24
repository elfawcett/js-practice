const https = require('https')

class Requester {
  constructor() {}

  get(url) {
    let data = ''

    return new Promise((resolve, reject) => {
      https
        .get(url, resp => {
          const { statusCode } = resp
          const contentType = resp.headers['content-type']
          let error

          if (statusCode !== 200) {
            error = new Error(`Bad status code: ${statusCode}`)
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error(`Wrong content-type.  Expected JSON, got: ${contentType}`)
          }

          if (error) {
            reject(error)
            resp.resume()
            return
          }

          /* handle incoming chunks */
          resp.on('data', chunk => {
            data += chunk
          })

          resp.on('end', () => {
            let result
            try {
              result = JSON.parse(data)
              resolve(result)
            } catch (err) {
              reject(new Error('Unable to parse data:', err))
            }
          })
        })
        .on('error', err => {
          reject(new Error(err.message))
        })
    })
  }
}

module.exports = Requester
