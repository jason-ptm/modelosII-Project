import { FC, Fragment, useEffect } from 'react'
import './styles/index.css'
import { Button, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const TextFieldSincronized: FC<any> = (props) => {
  const { loading } = useSelector((state: RootState) => state.student)

  return (
    <TextField
      {...props}
      disabled={props.disabled ? props.disabled : loading}
    />
  )
}

export const ButtonSincronized: FC<any> = (props) => {
  const { loading } = useSelector((state: RootState) => state.student)
  return (
    <Button {...props} disabled={loading}>
      {props.children}
    </Button>
  )
}

export default TextFieldSincronized
