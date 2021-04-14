import { declareAction } from '@reatom/core'
import { RefObject } from 'react'
import { IPosition, IState } from './types'
import { sleep } from '../helpers'

export const setDomReadyAction = declareAction<boolean>()

export interface MoveContainerPayload {
  index: number
  containerRef: RefObject<HTMLDivElement>
}

export const moveContainerAction = declareAction<MoveContainerPayload>()

export interface SetElementPositionPayload {
  index: number
  position: IPosition
}

export const setElementPositionAction = declareAction<SetElementPositionPayload>()

export interface setValueInCountingArrayPayload {
  index: number
  payload: number
}

export const setValueInCountingArrayAction = declareAction<setValueInCountingArrayPayload>()

export const setNumberOfElementsInCountingArrayAction = declareAction<{
  index: number
  payload: number
}>()

export const rerenderElementAction = declareAction<number>()

interface IArrayPayload {
  array: keyof Omit<IState, 'elements' | 'containers' | 'domReady'>
  index: number
}

type TArrayType = 'selected' | 'indexSelected'

interface ISetSelectedPayload extends IArrayPayload {
  type: TArrayType
  payload: boolean
}

interface IBlinkPayload extends IArrayPayload {
  type: TArrayType
  timeout?: number
}

export const setSelectedAction = declareAction<ISetSelectedPayload>()

export const blinkReaction = declareAction<IBlinkPayload>(
  'blinkReaction',
  async ({ index, timeout = 300, type }, { dispatch }) => {
    dispatch(setSelectedAction({ index, payload: true, array: 'countingArray', type }))
    await sleep(timeout)
    dispatch(setSelectedAction({ index, payload: false, array: 'countingArray', type }))
  }
)
