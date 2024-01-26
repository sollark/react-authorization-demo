import { useTheme } from '@mui/material/styles'
import { Link, LinkPropsOptions } from '@tanstack/react-router'
import { FC, ReactNode } from 'react'

type CustomLinkProps = LinkPropsOptions & {
  color?: 'primary' | 'secondary' | 'error'
  children: ReactNode
}

const CustomLink: FC<CustomLinkProps> = ({ color, children, ...rest }) => {
  const theme = useTheme()
  const linkColor = color
    ? theme.palette[color].dark
    : theme.palette.accent.dark
  return (
    <Link style={{ color: linkColor }} {...rest}>
      {children}
    </Link>
  )
}

export default CustomLink
