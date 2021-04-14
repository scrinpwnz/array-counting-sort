import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ICountingArrayItem } from '../model'
import { animated, config, Spring } from 'react-spring'
import { purple } from '@material-ui/core/colors'
import cn from 'classnames'
import { createDebounce } from '../helpers/createDebounce'
import IndexItem from './IndexItem'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    gap: '.5rem',
    padding: '1rem',
    borderRadius: '1.5rem',
    userSelect: 'none'
  },
  item: {
    display: 'grid',
    placeItems: 'center',
    gridGap: '.25rem',
    padding: '.5rem',
    color: purple[900],
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: 300,
      easing: 'ease'
    })
  },
  selected: {
    backgroundColor: purple[100]
  },
  index: {
    display: 'flex',
    justifyContent: 'center',
    width: '1rem'
  },
  spot: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, 4rem)',
    width: '4rem',
    gridGap: '.5rem'
  }
}))

const getWindowModifier = () => window.innerWidth * 0.0083333333

interface Props {
  state: ICountingArrayItem[]
}

const CountingArray: FC<Props> = ({ state }) => {
  const classes = useStyles()
  const [windowModifier, setWindowModifier] = useState<number>(getWindowModifier())

  const prevData = useMemo<number[]>(() => [], [])

  const getContainerHeight = useCallback(
    (number: number) => {
      return number * (windowModifier * 4) + (number > 1 ? (number - 1) * (windowModifier * 0.5) : 0)
    },
    [windowModifier]
  )

  const setHeightModifierListener = useCallback(() => {
    setWindowModifier(getWindowModifier())
  }, [])

  const setHeightModifierListenerThrottler = useMemo(() => createDebounce(setHeightModifierListener, 200), [])

  useEffect(() => {
    window.addEventListener('resize', setHeightModifierListenerThrottler)
    return () => {
      window.removeEventListener('resize', setHeightModifierListenerThrottler)
    }
  }, [])

  return (
    <Paper className={classes.root} elevation={6}>
      {state.map((item, index) => {
        return (
          <div key={index}>
            <Paper className={cn(classes.item, { [classes.selected]: item.selected })} variant={'outlined'}>
              <Typography variant={'h4'} color={'inherit'} align={'center'}>
                {item.value}
              </Typography>
            </Paper>
            <IndexItem index={index} selected={item.indexSelected} />
            <Spring
              config={config.wobbly}
              onResolve={() => (prevData[index] = item.numberOfElements)}
              from={{ height: prevData[index] ?? 0 }}
              to={{
                height: getContainerHeight(item.numberOfElements)
              }}>
              {props => <animated.div key={index} ref={item.ref} className={classes.spot} style={props} />}
            </Spring>
          </div>
        )
      })}
    </Paper>
  )
}

export default CountingArray
