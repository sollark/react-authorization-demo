import { Button, ButtonProps, styled } from '@mui/material'

const SecondaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '1rem 0',
  marginInlineEnd: '1rem',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
  },
}))

export default SecondaryButton

/* using href forces a page reload */
/* <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>Edit</SecondaryButton> */
