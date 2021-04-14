import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC, memo } from 'react'
import { IArrayItem } from '../model'
import ArrayElementPlaceholder from './ArrayElementPlaceholder'
import IndexItem from './IndexItem'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    gap: '.25rem',
    padding: '.5rem',
    borderRadius: '1.5rem',
    userSelect: 'none'
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

const ResultArray: FC<Props> = memo(({ state }) => {
  const classes = useStyles()

  return (
    <Paper elevation={6} className={classes.root}>
      {state.map((item, index) => (
        <div key={index}>
          <div className={classes.spot} ref={item.ref}>
            <ArrayElementPlaceholder selected={item.selected} />
          </div>
          <IndexItem index={index + 1} selected={item.indexSelected} />
        </div>
      ))}
    </Paper>
  )
})

export default ResultArray
