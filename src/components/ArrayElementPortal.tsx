import React, { FC, memo } from 'react'
import { createPortal } from 'react-dom'
import ArrayElement from './ArrayElement'

interface Props {
  index: number
  container: Element | null
}

const ArrayElementPortal: FC<Props> = memo(({ index, container }) => {
  if (!container) return null

  return createPortal(<ArrayElement index={index} />, container)
})

export default ArrayElementPortal
