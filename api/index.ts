const express = require('express')
const app = express()
const kuromoji = require('kuromoji')
const KUROMOJI_DIC_PATH = './node_modules/kuromoji/dict'
const pg = require('pg')
let pool: any
if(process.env.ENV == 'develop') {
  pool = new pg.Pool({
    database: process.env.DB_NAME_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    port: 5432
  })
} else if (process.env.ENV == 'production') {
  pool = new pg.Pool({
    database: process.env.DB_NAME_PROD,
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    host: process.env.DB_HOST_PROD,
    port: 5432
  })
}
app.use(express.json({ extended: true, limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

function getFurigana(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: KUROMOJI_DIC_PATH}).build((err: any, tokenizer: any) => {
      if(err) {
        reject(err)
      }
      const path = tokenizer.tokenize(text)
      // 複数個の単語を繋げて作られている単語はルール違反とする
      //（アメリカ合衆国大統領など）
      if(path.length != 1) {
        reject(-1)
      }
      // 名詞以外はルール違反とする
      if(path[0].pos != '名詞') {
        reject(-2)
      }
      resolve(path[0].reading)
    })
  })
}

async function getNextWord(currentWord: string) {
  const c = await pool.connect()
  const nextFirstChar = currentWord.slice(-1) // 今の単語の最後の1文字
  const result = await c.query(
  `
    SELECT
      id,
      word,
      furigana
    FROM
      word_list
    WHERE
      furigana LIKE $1
    AND
      furigana NOT LIKE '%ン'
    ORDER BY RANDOM()
    LIMIT 1
  `, [nextFirstChar + '%'])
    .then((result: any) => {
      return {
        id: result.rows[0].id,
        word: result.rows[0].word,
        furigana: result.rows[0].furigana
      }
    })
    .catch((err: any) => {
      console.log(err)
      return null
    })

  return result
}

/**
 * true：OK
 * false: ルール違反
 * -1: エラー
 */
app.get('/shiritori', async (req: any, res: any) => {
  const input: string = req.query.text ?? null
  if(input === null) {
    return res.status(400).json({code: -1, error: 'text query is required'})
  }

  // ひらがな、カタカナ、漢字の判定
  const japanese_regex = /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/
  // console.log(input.match(japanese_regex))
  if (input.match(japanese_regex) === null) {
    return res.status(400).json({ code: -1, error: 'text expects only Japanese'})
  }

  const inputWordInformation = await getFurigana(input)
    .then((result) => {
      if(result.slice(-1) != 'ン') {
        return {
          furigana: result,
          violation: false,
          error: null,
          error_code: true
        }
      } else {
        return {
          furigana: result,
          violation: true,
          error: '入力された言葉が「ん」で終了しています',
          error_code: 0
        }
      }
    })
    .catch((error) => {
      switch(error) {
        case -1:
          // 言葉が2つ以上の単語から作られている
          return {
            furigana: '',
            violation: true,
            error: '複数の単語からなる言葉を入力することはできません',
            error_code: error
          }
        case -2:
          // 名詞以外の単語が入力された
          return {
            furigana: '',
            violation: true,
            error: '入力する言葉は名詞でなければいけません',
            error_code: error
          }
        default:
          return {
            furigana: '',
            violation: null,
            error: error,
            error_code: null
          }
      }
    })

  if(inputWordInformation.error != null) {
    return res.status(200).json({
      code: false,
      input: {
        input_word: input,
        information: inputWordInformation
      },
      next: null
    })
  }

  const nextWordInformation = await getNextWord(inputWordInformation.furigana)

  return res.status(200).json({
    code: true,
    input: {
      input_word: input,
      information: inputWordInformation
    },
    next: nextWordInformation
  })
})

module.exports = {
  path: '/api',
  handler: app
}
