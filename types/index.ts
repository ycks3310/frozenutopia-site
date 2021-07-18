/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
declare interface InputWordInfo {
    furigana: string
    first_char: string
    last_char: string
    id: number | null
    violation: boolean | null
    error: null | string
    error_code: any
}

declare interface NextWordInfo {
    id: number
    word: string
    furigana: string
    first_char: string
    last_char: string
}
