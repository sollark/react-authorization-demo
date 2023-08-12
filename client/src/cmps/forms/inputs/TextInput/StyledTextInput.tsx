import { TextField, TextFieldProps, styled } from '@mui/material'

const CustomTextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: '1rem 0',
  // input label when focused
  '& label.Mui-focused': {
    color: theme.palette.primary.divider,
  },
  // focused color for input with variant='standard'
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.divider,
  },
  // focused color for input with variant='filled'
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: theme.palette.primary.divider,
  },
  // focused color for input with variant='outlined'
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.divider,
    },
  },
}))

export default CustomTextInput

// Other way to do it:
// const StyledTextInput = styled(TextField, {
//   shouldForwardProp: (props) => props !== 'focusColor',
// })((p) => ({
//   // input label when focused
//   '& label.Mui-focused': {
//     color: p.theme.palette.primary.divider,
//   },
//   // focused color for input with variant='standard'
//   '& .MuiInput-underline:after': {
//     borderBottomColor: p.theme.palette.primary.divider,
//   },
//   // focused color for input with variant='filled'
//   '& .MuiFilledInput-underline:after': {
//     borderBottomColor: p.theme.palette.primary.divider,
//   },
//   // focused color for input with variant='outlined'
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: p.theme.palette.primary.divider,
//     },
//   },
// }))
