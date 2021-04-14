import { makeStyles, Paper, Theme } from '@material-ui/core'
import React, { FC, memo } from 'react'
import { IArrayItem } from '../model'
import ArrayElementPlaceholder from './ArrayElementPlaceholder'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    gap: '.25rem',
    padding: '.5rem',
    borderRadius: '1.5rem'
  },
  spot: {
    position: 'relative',
    width: '4rem',
    height: '4rem'
  }
}))

interface Props {
  state: IArrayItem[]
}

const InitialArray: FC<Props> = memo(({ state }) => {
  const classes = useStyles()

  return (
    <Paper elevation={6} className={classes.root}>
      {state.map((item, index) => (
        <div key={index} className={classes.spot} ref={item.ref}>
          <ArrayElementPlaceholder value={item.value} selected={item.selected} />
        </div>
      ))}
    </Paper>
  )
})

export default InitialArray
