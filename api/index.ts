const express = require('express')
const app = express()
const kuromoji = require('kuromoji')
const KUROMOJI_DIC_PATH = './node_modules/kuromoji/dict'
const pg = require('pg')
let pool: any
if (process.env.ENV === 'develop') {
  pool = new pg.Pool({
    database: process.env.DB_NAME_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    port: 5432
  })
} else if (process.env.ENV === 'production') {
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

function getFurigana(text: string): Promise<{reading: string, id: number}> {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: KUROMOJI_DIC_PATH}).build(async (err: any, tokenizer: any) => {
      if (err) {
        reject(err)
      }
      const path = tokenizer.tokenize(text)
      // 複数個の単語を繋げて作られている単語はルール違反とする
      // （アメリカ合衆国大統領など）
      if (path.length !== 1) {
        return reject(-1)
      }
      // 名詞以外はルール違反とする
      if (path[0].pos !== '名詞') {
        return reject(-2)
      }
      if (path[0].word_type === 'UNKNOWN') {
        return reject(-3)
      }
      return resolve({
        reading: path[0].reading,
        id: await getWordId(text)
      })
    })
  })
}

function convertSmallKatakana (text1: string, text2: string): string {
  switch (text1) {
    case ('ァ'):
      return 'ア'
    case ('ィ'):
      return 'イ'
    case ('ゥ'):
      return 'ウ'
    case ('ェ'):
      return 'エ'
    case ('ォ'):
      return 'オ'
    case ('ッ'):
      return 'ツ'
    case ('ャ'):
      return 'ヤ'
    case ('ュ'):
      return 'ユ'
    case ('ョ'):
      return 'ヨ'
    case ('ヵ'):
      return 'カ'
    case ('ヶ'):
      return 'ケ'
    case ('ヮ'):
      return 'ワ'
    case ('ヱ'):
      return 'エ'
    case ('ー'):
      return text2 // 伸ばしぼうで終わった場合手前の文字を取ることとする
    default:
      return text1
  }
}

async function getWordId (text: string) {
  const c = await pool.connect()
  const result = await c.query(
  `
    SELECT
      id
    FROM
      word_list
    WHERE
      word = $1
    LIMIT 1
  `, [text])
    .then((result: any) => {
      return result.rows[0].id
    })
    .catch((err: any) => {
      console.log(err)
      return null
    })
  await c.release(true)
  return result
}

async function getNextWord (currentWord: string) {
  const c = await pool.connect()
  const nextFirstChar = convertSmallKatakana(currentWord.slice(-1), currentWord.slice(-2, -1))
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
      const lastChar = convertSmallKatakana(result.rows[0].furigana.slice(-1), result.rows[0].furigana.slice(-2, -1))
      return {
        id: result.rows[0].id,
        word: result.rows[0].word,
        furigana: result.rows[0].furigana,
        first_char: result.rows[0].furigana.slice(0, 1),
        last_char: lastChar
      }
    })
    .catch((err: any) => {
      console.log(err)
      return null
    })
  await c.release(true)
  return result
}

/**
 * true：OK
 * false: ルール違反
 * -1: エラー
 */
app.get('/shiritori/next', async (req: any, res: any) => {
  const input: string = req.query.text ?? null
  if (input === null) {
    return res.status(400).json({ code: -1, error: 'text query is required'})
  }

  // ひらがな、カタカナ、漢字の判定
  const japaneseRegex = /^[\u30A0-\u30FF\u3040-\u309F\u3005-\u3006\u30E0-\u9FCF]+$/
  // console.log(input.match(japanese_regex))
  if (input.match(japaneseRegex) === null) {
    return res.status(400).json({ code: -1, error: 'text expects only Japanese'})
  }

  const inputWordInformation = await getFurigana(input)
    .then((result) => {
      if (result.reading.slice(-1) !== 'ン') {
        const lastChar = convertSmallKatakana(result.reading.slice(-1), result.reading.slice(-2, -1))
        return {
          furigana: result.reading,
          first_char: result.reading.slice(0, 1),
          last_char: lastChar,
          id: result.id,
          violation: false,
          error: null,
          error_code: true
        }
      } else {
        return {
          furigana: result.reading,
          first_char: result.reading.slice(0, 1),
          last_char: result.reading.slice(-1),
          id: result.id,
          violation: true,
          error: 'ルール違反です（入力された言葉が「ん」で終了しています）',
          error_code: 0
        }
      }
    })
    .catch((error) => {
      switch (error) {
        case -1:
          // 言葉が2つ以上の単語から作られている
          return {
            furigana: '',
            first_char: '',
            last_char: '',
            id: null,
            violation: true,
            error: 'ルール違反です（複数の単語からなる言葉を入力することはできません）',
            error_code: error
          }
        case -2:
          // 名詞以外の単語が入力された
          return {
            furigana: '',
            first_char: '',
            last_char: '',
            id: null,
            violation: true,
            error: 'ルール違反です（入力する言葉は名詞でなければいけません）',
            error_code: error
          }
        case -3:
          // 登録されていない単語
          return {
            furigana: '',
            first_char: '',
            last_char: '',
            id: null,
            violation: true,
            error: 'その言葉は登録されていません',
            error_code: error
          }
        default:
          return {
            furigana: '',
            first_char: '',
            last_char: '',
            id: null,
            violation: null,
            error,
            error_code: null
          }
      }
    })

  if (inputWordInformation.error != null) {
    return res.status(200).json({
      code: false,
      input: {
        word: input,
        information: inputWordInformation
      },
      next: null
    })
  }

  const nextWordInformation = await getNextWord(inputWordInformation.furigana)

  return res.status(200).json({
    code: true,
    input: {
      word: input,
      information: inputWordInformation
    },
    next: nextWordInformation
  })
})

app.get('/shiritori/start', async (_req: any, res: any) => {
  const c = await pool.connect()
  const result = await c.query(
  `
    SELECT
      id,
      word,
      furigana
    FROM
      word_list
    WHERE
      furigana NOT LIKE '%ン'
    ORDER BY RANDOM()
    LIMIT 1
  `)
    .then((result: any) => {
      const lastChar = convertSmallKatakana(result.rows[0].furigana.slice(-1), result.rows[0].furigana.slice(-2, -1))
      return {
        id: result.rows[0].id,
        word: result.rows[0].word,
        furigana: result.rows[0].furigana,
        first_char: result.rows[0].furigana.slice(0, 1),
        last_char: lastChar
      }
    })
    .catch((err: any) => {
      console.log(err)
      return null
    })
  await c.release(true)
  return res.status(200).json(result)
})

module.exports = {
  path: '/api',
  handler: app
}
