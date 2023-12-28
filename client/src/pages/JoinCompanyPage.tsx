import JoinCompanyForm from '@/cmps/forms/JoinCompanyForm'
import CustomLink from '@/cmps/link/CustomLink'
import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'

const JoinCompanyPage: FC = () => {
  log('JoinCompany connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h2>Join a company</h2>
      <JoinCompanyForm />
      <p>
        Want to create your company?{' '}
        <CustomLink to='/account/edit'>Create a company</CustomLink>
      </p>
    </Box>
  )
}

export default JoinCompanyPage
