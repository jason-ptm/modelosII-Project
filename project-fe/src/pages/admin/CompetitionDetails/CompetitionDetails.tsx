import { FC, useEffect, useState } from 'react'
import './styles/index.css'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { TextFieldSincronized } from '../../../components'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch } from 'react-redux'
import { createCompetition } from '../../../redux/slice/adminReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

interface ICompetitionDetailsProps {}

const CompetitionDetails: FC<ICompetitionDetailsProps> = (props) => {
  const params = useParams()
  const dispatch = useDispatch()

  const { loading } = useSelector((state: RootState) => state.admin)

  const [name, setName] = useState('')
  const [level, setLevel] = useState('')

  const handleClickCreateCompetition = () => {
    dispatch(
      createCompetition({
        name: name,
        level: level,
      })
    )
  }

  return (
    <Box>
      <Typography variant="h4" align="center">
        {true ? 'Crear competencia' : 'Competencia'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextFieldSincronized
          margin="normal"
          required
          id="name"
          label="Nombre competencia"
          name="name"
          autoFocus
          value={name}
          disabled={loading}
          sx={{
            flexGrow: 1,
            maxWidth: '400px',
            flexBasis: '200px',
          }}
          onChange={(e: any) => setName(e.target.value)}
        />
        <FormControl
          sx={{
            flexGrow: 1,
            maxWidth: '400px',
            flexBasis: '200px',
          }}
          margin="normal"
          disabled={loading}
        >
          <InputLabel id="demo-simple-select-label">Materia minima</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            name="grade"
            label="Materia"
            onChange={(e: any) => setLevel(e.target.value)}
          >
            <MenuItem value={''}>---</MenuItem>
            <MenuItem value={'1'}>Programacion basica</MenuItem>
            <MenuItem value={'2'}>Programacion orientada</MenuItem>
            <MenuItem value={'3'}>Programacion avanzada</MenuItem>
            <MenuItem value={'4'}>Modelos I - Modelos II</MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={loading}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleClickCreateCompetition}
        >
          Crear
        </Button>
      </Box>
    </Box>
  )
}

export default CompetitionDetails
