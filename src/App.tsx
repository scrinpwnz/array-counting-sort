import React, { useCallback, useMemo, useState } from 'react'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useAction, useAtom } from '@reatom/react'
import {
  blinkReaction,
  countingArray,
  initialArray,
  moveContainerAction,
  rerenderElementAction,
  rootAtom,
  setNumberOfElementsInCountingArrayAction,
  setSelectedAction,
  setValueInCountingArrayAction
} from './model'
import ArrayElementPortal from './components/ArrayElementPortal'
import { useForceUpdate } from './hooks'
import ArrayContainerPortal from './components/ArrayContainerPortal'
import { sleep } from './helpers'
import TutorialText from './components/TutorialText'
import { animated, config, Spring, useTrail } from 'react-spring'
import ResultArray from './components/ResultArray'
import PlayButton from './components/PlayButton'
import CountingArray from './components/CountingArray'
import InitialArray from './components/InitialArray'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `linear-gradient(112.1deg, rgba(32,38,57,1) 11.4%, rgba(63,76,119,1) 70.2%)`
  },
  mainContainer: {
    height: '100%',
    position: 'relative',
    overflowY: 'auto'
  },
  mainTitle: {
    display: 'grid',
    placeItems: 'center',
    height: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    placeItems: 'center',
    opacity: 100,
    paddingTop: '4rem',
    transition: theme.transitions.create(['opacity'], {
      duration: 1000,
      easing: 'ease'
    })
  },
  hidden: {
    opacity: 0
  }
}))

const App = () => {
  const classes = useStyles()
  const forceUpdate = useForceUpdate()
  const [done, setDone] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const atom = useAtom(rootAtom)
  const moveContainer = useAction(moveContainerAction)
  const setSelected = useAction(setSelectedAction)
  const blink = useAction(blinkReaction)
  const setValueInCountingArray = useAction(setValueInCountingArrayAction)
  const setNumberOfElementsInCountingArray = useAction(setNumberOfElementsInCountingArrayAction)
  const rerenderElement = useAction(rerenderElementAction)

  const moveElement = (
    index: number,
    arrayIndex: number,
    countingArrayValue: number,
    countingArrayNumberOfElements: number,
    to: 'countingArray' | 'resultArray'
  ) => {
    moveContainer({
      index,
      containerRef: atom[to][arrayIndex].ref
    })
    setValueInCountingArray({
      index: arrayIndex,
      payload: countingArrayValue
    })
    blink({ index: arrayIndex, array: 'countingArray', type: 'selected' })
    setNumberOfElementsInCountingArray({
      index: arrayIndex,
      payload: countingArrayNumberOfElements
    })
  }

  const sumNext = async (index: number, value: number, nextValue: number) => {
    blink({ index, array: 'countingArray', type: 'selected' })
    blink({ index: index + 1, array: 'countingArray', type: 'selected' })
    await sleep(600)
    setValueInCountingArray({
      index: index + 1,
      payload: value + nextValue
    })
    blink({ index: index + 1, array: 'countingArray', type: 'selected' })
    await sleep(300)
  }

  const setNewPosition = async (
    initialArrayIndex: number,
    countingArrayIndex: number,
    resultArrayIndex: number,
    elements: number,
    initialArr: number[]
  ) => {
    setSelected({
      index: initialArrayIndex,
      array: 'initialArray',
      payload: true,
      type: 'selected'
    })
    await sleep(500)
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: true,
      type: 'indexSelected'
    })
    await sleep(1000)
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: true,
      type: 'selected'
    })
    await sleep(500)
    setSelected({
      index: resultArrayIndex - 1,
      array: 'resultArray',
      payload: true,
      type: 'indexSelected'
    })

    await sleep(500)
    const initialLastIndex = initialArr.lastIndexOf(initialArray[initialArrayIndex])
    initialArr[initialLastIndex] = 999
    rerenderElement(initialLastIndex)
    await sleep(500)

    moveContainer({
      index: initialLastIndex,
      containerRef: atom.resultArray[resultArrayIndex - 1].ref
    })
    setValueInCountingArray({
      index: countingArrayIndex,
      payload: resultArrayIndex - 1
    })
    blink({ index: countingArrayIndex, array: 'countingArray', type: 'selected' })
    setNumberOfElementsInCountingArray({
      index: countingArrayIndex,
      payload: elements
    })

    await sleep(500)
    setSelected({
      index: initialArrayIndex,
      array: 'initialArray',
      payload: false,
      type: 'selected'
    })
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: false,
      type: 'indexSelected'
    })
    setSelected({
      index: countingArrayIndex,
      array: 'countingArray',
      payload: false,
      type: 'selected'
    })
    setSelected({
      index: resultArrayIndex - 1,
      array: 'resultArray',
      payload: false,
      type: 'indexSelected'
    })
  }

  const steps = useCallback(async function* steps() {
    const initialArr = [...initialArray]
    const countingArr = [...countingArray]
    const elementsInCountingArr = [...countingArray]

    let index = 0
    for (const value of initialArr) {
      setDisabled(true)
      moveElement(index++, value, ++countingArr[value], countingArr[value], 'countingArray')
      elementsInCountingArr[value]++
      setDisabled(false)
      yield
    }

    for (let i = 0; i < countingArr.length - 1; ++i) {
      setDisabled(true)
      await sumNext(i, countingArr[i], countingArr[i + 1])
      countingArr[i + 1] = countingArr[i] + countingArr[i + 1]
      setDisabled(false)
      yield
    }

    const initialArrCopy = [...initialArr]
    for (let i = 0; i < initialArr.length; ++i) {
      setDisabled(true)
      await setNewPosition(
        i,
        initialArr[i],
        countingArr[initialArr[i]]--,
        --elementsInCountingArr[initialArr[i]],
        initialArrCopy
      )
      setDisabled(false)
      if (i !== initialArr.length -1) yield
    }
    setDone(true)
  }, [])

  const generator = useMemo(() => steps(), [])

  const algorithmComponents = [
    <PlayButton disabled={disabled || done} onClick={() => generator.next()} />,
    <InitialArray state={atom.initialArray} />,
    <CountingArray state={atom.countingArray} />,
    <ResultArray state={atom.resultArray} />
  ]

  const trail = useTrail(algorithmComponents.length, {
    config: config.gentle,
    from: { opacity: 0 },
    to: { opacity: 1 },
    onStart: () => forceUpdate(),
    delay: 3000
  })

  return (
    <div className={classes.root}>
      <>
        <div className={classes.mainContainer}>
          <div className={classes.content}>
            <TutorialText text={'Алгоритм сортировки подсчётом'} />
            {trail.map((props, index) => (
              <animated.div style={props} key={index}>
                {algorithmComponents[index]}
              </animated.div>
            ))}
            {done && <Spring
              config={config.wobbly}
              from={{ transform: `scale(0)` }}
              to={{ transform: `scale(1)` }}>
              {props => (
                <animated.div style={props}>
                  <Box fontWeight={700} color={'success.main'}>
                    <Typography variant={'h3'} color={'inherit'}>Массив отсортирован!</Typography>
                  </Box>
                </animated.div>
              )}
            </Spring>}
          </div>
        </div>
        {atom.containers.map((item, index) => (
          <ArrayContainerPortal key={index} index={index} container={item.containerRef.current} />
        ))}
        {atom.elements.map((item, index) => (
          <ArrayElementPortal key={index} index={index} container={item.containerRef.current} />
        ))}
      </>
    </div>
  )
}

export default App
