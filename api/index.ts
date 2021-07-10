const express = require('express')
const app = express()

app.use(express.json({ extended: true, limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

app.get('/test', (req: any, res: any) => {
  return res.status(200).json(['OK'])
})

module.exports = {
  path: '/api',
  handler: app
}