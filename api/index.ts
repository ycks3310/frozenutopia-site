const express = require('express')
const app = express()
const kuromoji = require('kuromoji')

app.use(express.json({ extended: true, limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

const KUROMOJI_DIC_PATH = './node_modules/kuromoji/dict'

function getFurigana(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: KUROMOJI_DIC_PATH}).build((err: any, tokenizer: any) => {
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
  const input: string = req.query.text ?? null
  if(input === null) {
    return res.status(400).json({code: 900, error: 'text query is required'})
  }

  // ひらがな、カタカナ、漢字の判定
  const japanese_regex = /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/
  console.log(input.match(japanese_regex))
  if (input.match(japanese_regex) === null) {
    return res.status(400).json({ code: 901, error: 'text expects only Japanese'})
  }

  const furigana = await getFurigana(input)
    .then((result) => {
      return result
    })
    .catch(e => {
      console.log(e)
      return res.status(500).json({code: 999, error: e})
    })

  return res.status(200).json({
    code: 0,
    input,
    furigana
  })
})

module.exports = {
  path: '/api',
  handler: app
}