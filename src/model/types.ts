import { RefObject } from 'react'

export interface IState {
  domReady: boolean
  elements: IElement[]
  containers: IContainer[]
  initialArray: IArrayItem[]
  countingArray: ICountingArrayItem[]
  resultArray: IArrayItem[]
}

export interface IElement {
  value: number
  position?: IPosition
  ref: RefObject<HTMLDivElement>
  containerRef: RefObject<HTMLDivElement>
}

export interface IContainer {
  ref: RefObject<HTMLDivElement>
  containerRef: RefObject<HTMLDivElement>
}

export interface IArrayItem {
  value: number
  selected: boolean
  indexSelected: boolean
  ref: RefObject<HTMLDivElement>
}

export interface ICountingArrayItem extends IArrayItem {
  numberOfElements: number
}

export interface IPosition {
  top: number
  left: number
}
