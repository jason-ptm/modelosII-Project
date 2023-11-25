import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import BackgroundImage from '../../../assets/formBackground.jpg'
import { TextFieldSincronized } from '../../../components'
import { ButtonSincronized } from '../../../components/TextFieldSincronized/TextFieldSincronized'
import { getStudentById } from '../../../redux/slice/studentReducer'
import './styles/index.css'

interface IFormProps {}

const ConsultForm: FC<IFormProps> = () => {
  const dispatch = useDispatch()
  const [code, setCode] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(getStudentById(code))
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }} />
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextFieldSincronized
              margin="normal"
              required
              fullWidth
              id="code"
              label="Codigo"
              name="code"
              value={code}
              autoFocus
              type="number"
              onChange={(e: any) => setCode(e.target.value)}
            />
            <ButtonSincronized
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </ButtonSincronized>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ConsultForm
