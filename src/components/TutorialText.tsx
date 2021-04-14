import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { animated, config, useTrail, useTransition } from 'react-spring'
import { green, purple } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  text: {
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

  const [on, setOn] = useState(true)

  useEffect(() => setOn(true), [])

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
    }
  })

  const trailComponent = trail.map((props, index) => {
    return (
      <AnimatedText style={props} key={index} variant={'h4'} className={classes.text}>
        {items[index]}&nbsp;
      </AnimatedText>
    )
  })

  const transitions = useTransition(on, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const transitionsComponent = transitions((props, item) => {
    return (
      item && (
        <animated.div style={props} className={classes.root}>
          {trailComponent}
        </animated.div>
      )
    )
  })

  return transitionsComponent
}

export default TutorialText
