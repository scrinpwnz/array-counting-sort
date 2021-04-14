import { makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import cn from 'classnames'
import { purple } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) => ({
  indexRoot: {
    transition: theme.transitions.create(['font-size', 'color'], {
      duration: 300,
      easing: 'ease'
    })
  },
  indexSelected: {
    color: purple[900],
    fontSize: '3rem'
  }
}))

interface Props {
  index: number
  selected: boolean
}

const IndexItem: FC<Props> = ({ index, selected }) => {
  const classes = useStyles()

  return (
    <Typography
      className={cn({ [classes.indexSelected]: selected })}
      variant={'h6'}
      color={'textSecondary'}
      align={'center'}
      classes={{
        root: classes.indexRoot
      }}>
      {index}
    </Typography>
  )
}

export default IndexItem
