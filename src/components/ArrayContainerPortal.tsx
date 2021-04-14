import React, { FC, memo } from 'react'
import { createPortal } from 'react-dom'
import ArrayContainer from './ArrayContainer'

interface Props {
  index: number
  container: Element | null
}

const ArrayContainerPortal: FC<Props> = memo(({ index, container }) => {
  console.log('[ArrayContainerPortal]', { container })

  if (!container) return null

  return createPortal(<ArrayContainer index={index} />, container)
})

export default ArrayContainerPortal
