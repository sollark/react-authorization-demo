import Input from './inputs/TextInput'

const SignInForm = () => {
  console.log('SignInForm connected')
  return (
    <>
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
    </>
  )
}

export default SignInForm
