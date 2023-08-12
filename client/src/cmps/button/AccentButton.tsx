import { Button, ButtonProps, styled } from '@mui/material'

const AccentButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '1rem 0',
  marginInlineEnd: '1rem',
  backgroundColor: theme.palette.accent.main,
  color: theme.palette.accent.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.accent.dark,
  },
}))

export default AccentButton
