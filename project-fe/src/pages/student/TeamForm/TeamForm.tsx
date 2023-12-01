import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StudentForm from '../../../components/StudentForm'
import TextFieldSincronized, {
  ButtonSincronized,
} from '../../../components/TextFieldSincronized/TextFieldSincronized'
import { Student } from '../../../model/student'
import { editTeam, registerTeam } from '../../../redux/slice/studentReducer'
import { RootState } from '../../../redux/store'
import './styles/index.css'

interface IRegisterFormProps {}

const TeamForm: FC<IRegisterFormProps> = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { error, selectedStudent, selectedTeam, loading } = useSelector(
    (state: RootState) => state.student
  )
  const [name, setName] = useState(
    selectedStudent.team?.name?.replace(/['"]+/g, '') || ' '
  )
  const [students, setStudents] = useState<Student[]>(
    selectedStudent.team?.members || []
  )
  const [isCreate, setIsCreate] = useState(!!params?.id)
  const [disableForm, setDisableForm] = useState(false)

  useEffect(() => {
    setStudents(selectedStudent.team?.members || [])
    setName(selectedStudent.team?.name || '')
  }, [isCreate])

  useEffect(() => {
    if (
      selectedStudent.team &&
      selectedStudent.team.members.filter((member) => member.id).length > 1
    )
      setIsCreate(false)
    else setIsCreate(true)
  }, [selectedStudent.team])

  useEffect(() => {
    if (selectedStudent.team && selectedStudent.team.competitionInscribed) {
      setDisableForm(true)
    } else {
      setDisableForm(loading)
    }
  }, [loading, isCreate, selectedStudent.team])

  const handleInputChange = (index: number, event: any) => {
    const newStudents = students ? [...students] : []
    newStudents[index] = {
      ...newStudents[index],
      [event.target.name]: event.target.value,
    }
    setStudents(newStudents)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isCreate) {
      dispatch(
        registerTeam({
          name: name,
          members: students,
        })
      )
    } else {
      dispatch(
        editTeam({
          name,
          members: students,
        })
      )
    }
  }

  const getDisableFirstInput = (index: number): boolean => {
    return !disableForm && !isCreate && index === 0
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#ffffff2e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '70px 0',
        }}
      >
        <FormControl
          sx={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" align="center">
            {isCreate ? 'Registrar equipo' : 'Editar equipo'}
          </Typography>
          <Grid
            container
            direction="column"
            display="flex"
            spacing={2}
            sx={{
              margin: '20px 0 0 0',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <TextFieldSincronized
              margin="normal"
              required
              id="id"
              label="Nombre equipo"
              name="id"
              value={name}
              sx={{ width: '100%', maxWidth: '400px', margin: '20px' }}
              onChange={(e: any) => setName(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {students?.map((student, index) => (
                <StudentForm
                  index={index}
                  key={index}
                  student={student}
                  handleChange={handleInputChange}
                  disabled={getDisableFirstInput(index)}
                />
              ))}
            </Box>
          </Grid>
          {error && <FormHelperText>{error.text}</FormHelperText>}
          <ButtonSincronized
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: '200px' }}
            onClick={handleSubmit}
          >
            {isCreate ? 'Registrar equipo' : 'Guardar equipo'}
          </ButtonSincronized>
        </FormControl>
      </Box>
    </Grid>
  )
}

export default TeamForm
