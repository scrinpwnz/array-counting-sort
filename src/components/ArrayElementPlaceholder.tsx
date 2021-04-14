import { makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, memo, ReactText } from 'react'
import { purple } from '@material-ui/core/colors'
import cn from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    userSelect: 'none',
    width: '4rem',
    height: '4rem',
    top: 0,
    left: 0,
    display: 'grid',
    placeItems: 'center',
    zIndex: 0,
    border: theme.palette.text.secondary,
    borderRadius: '1rem',
    background: theme.palette.background.default,
    overflow: 'hidden',
    boxShadow: `
        inset 0px 2px 4px -1px rgb(0 0 0 / 20%),
        inset 0px  4px 5px 0px rgb(0 0 0 / 14%),
        inset 0px 1px 10px 0px rgb(0 0 0 / 12%)
    `,
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: 300,
      easing: 'ease'
    })
  },
  selected: {
    backgroundColor: purple[100]
  }
}))

interface Props {
  value?: ReactText
  selected?: boolean
}

const ArrayElementPlaceholder: FC<Props> = memo(({ value, selected }) => {
  const classes = useStyles()

  return (
    <div className={cn(classes.root, { [classes.selected]: selected })}>
      <Typography variant={'h4'} color={'textSecondary'}>
        {value}
      </Typography>
    </div>
  )
})

export default ArrayElementPlaceholder
