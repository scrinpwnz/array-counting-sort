import { makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { animated, config, useTrail } from 'react-spring'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  text: {
    userSelect: 'none',
    fontWeight: 700,
    color: theme.palette.background.paper
  }
}))

interface Props {
  text: string
}

const AnimatedText = animated(Typography)

const TutorialText: FC<Props> = ({ text }) => {
  const classes = useStyles()

  const items = text.split(' ')

  const trail = useTrail(items.length, {
    config: config.gentle,
    from: {
      transform: 'translate3d(0px, 100px, 0px)',
      opacity: 0
    },
    to: {
      transform: 'translate3d(0px,0px,0px)',
      opacity: 1
    },
    delay: 1000
  })

  return (
    <div className={classes.root}>
      {trail.map((props, index) => (
        <AnimatedText style={props} key={index} variant={'h2'} className={classes.text}>
          {items[index]}&nbsp;
        </AnimatedText>
      ))}
    </div>
  )
}

export default TutorialText
