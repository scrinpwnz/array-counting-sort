import { createStore } from '@reatom/core'
import { rootAtom } from '../model'

export const store = createStore(rootAtom)

declare global {
  interface Window {
    store: typeof store
  }
}

window.store = store
