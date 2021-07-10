const express = require('express')
const app = express()
const kuromoji = require('kuromoji')

app.use(express.json({ extended: true, limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

function getFurigana(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: './node_modules/kuromoji/dict'}).build((err: any, tokenizer: any) => {
      if(err) {
        reject(err)
      }
      const path = tokenizer.tokenize(text)
      let furigana: string = ''
      path.forEach((element: any) => {
        // console.log(element.reading)
        furigana = furigana + element.reading
      })
      resolve(furigana)
    })
  })
}

app.get('/shiritori', async (req: any, res: any) => {
  const input = req.query.text
  const furigana = await getFurigana(input)
  .then((result) => {
    return result
  })
  .catch(e => {
    console.log(e)
    return res.status(500).json()
  })
  return res.status(200).json({
    input,
    furigana
  })
})

module.exports = {
  path: '/api',
  handler: app
}