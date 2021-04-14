import { Button, createStyles, Theme, withStyles } from '@material-ui/core'
import React, { FC, memo } from 'react'
import SkipNextIcon from '@material-ui/icons/SkipNext'

const StyledButton = withStyles(
  createStyles((theme: Theme) => ({
    root: {
      borderRadius: '1rem',
      fontSize: '1.25rem',
      padding: '.5rem 1rem',
      color: theme.palette.background.paper,
      border: `1px solid rgba(255, 255, 255, .5)`,
      '&:hover': {
        border: `1px solid ${theme.palette.background.paper}`
      }
    },
    endIcon: {
      marginLeft: '.5rem',
      marginRight: '-.25rem'
    },
    iconSizeMedium: {
      '&>:first-child': {
        fontSize: '2.25rem'
      }
    }
  }))
)(Button)

interface Props {
  onClick: () => any
  disabled: boolean
}

const PlayButton: FC<Props> = memo(({ onClick, disabled }) => {
  return (
    <StyledButton
      disabled={disabled}
      variant={'outlined'}
      color={'primary'}
      endIcon={<SkipNextIcon />}
      onClick={onClick}>
      Следующий шаг
    </StyledButton>
  )
})

export default PlayButton
