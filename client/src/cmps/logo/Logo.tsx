import logo from '@/assets/logo/logo.png'
import { Box, SxProps, Typography } from '@mui/material'
import { FC } from 'react'

interface LogoProps {
  sxImg?: SxProps
  sxText?: SxProps
}

const Logo: FC<LogoProps> = (props: LogoProps) => {
  const { sxImg, sxText } = props

  return (
    <>
      <Box sx={{ ...sxImg, mr: 1 }}>
        <img src={logo} alt='Logo Image' />
      </Box>
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        sx={{
          ...sxText,
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
        LOGO
      </Typography>
    </>
  )
}

export default Logo
