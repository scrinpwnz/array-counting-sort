import { createRef } from 'react'

export const createRefMap = (length: number) => {
  return Array.from({ length }).map(_ => createRef<HTMLDivElement>())
}
