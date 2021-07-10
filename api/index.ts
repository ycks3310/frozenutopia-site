const express = require('express')
const app = express()
const kuromoji = require('kuromoji')

app.use(express.json({ extended: true, limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

app.get('/shiritori', (req: any, res: any) => {
  const text = req.query.text
  kuromoji.builder({ dicPath: './node_modules/kuromoji/dict'}).build((err: any, tokenizer: any) => {
    const path = tokenizer.tokenize(text)
    let yomigana: string = ''
    path.forEach((element: any) => {
      console.log(element.reading)
      yomigana = yomigana + element.reading
    })
    return res.status(200).json({
      input: text,
      output: yomigana
    })
  })

})

module.exports = {
  path: '/api',
  handler: app
}