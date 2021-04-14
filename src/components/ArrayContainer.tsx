import React, { FC, memo, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { useAction, useAtom } from '@reatom/react'
import { rerenderElementAction, rootAtom } from '../model'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '4rem'
  }
}))

interface Props {
  index: number
}

const ArrayContainer: FC<Props> = memo(({ index }) => {
  const container = useAtom(rootAtom, state => state.containers[index], [index])
  const rerenderElement = useAction(rerenderElementAction)

  const classes = useStyles()

  useEffect(() => {
    rerenderElement(index)
  }, [])

  return <div ref={container.ref} className={classes.root} />
})

export default ArrayContainer
