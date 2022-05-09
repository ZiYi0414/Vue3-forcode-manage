export type user = {
  date: string
  name: string
  address: string
  email: string
  img: string
  password: string
  sign: string
  state: number
  tag: string[]
  userId: number
}

export interface User {
  date: string
  name: string
  address: string
  email: string
  img: string
  password: string
  sign: string
  state: number
  tag: string[]
  userId: number
}

export type share = {
  createTime: string
  details: string
  id: number
  img: string
  isDiscuss: number
  isReviewed: number
  title: string
}

export interface Share {
  share: share
  user: user
}
