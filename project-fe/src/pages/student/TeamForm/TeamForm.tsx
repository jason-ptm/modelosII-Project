import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackgroundImage from '../../../assets/registerBackground.jpg'
import StudentForm from '../../../components/StudentForm'
import { ButtonSincronized } from '../../../components/TextFieldSincronized/TextFieldSincronized'
import { Student } from '../../../model/student'
import { registerTeam } from '../../../redux/slice/studentReducer'
import { RootState } from '../../../redux/store'
import './styles/index.css'

interface IRegisterFormProps {}

const initialStudentsState: Student[] = [
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
]

const TeamForm: FC<IRegisterFormProps> = () => {
  const { error } = useSelector((state: RootState) => state.student)
  const dispatch = useDispatch()
  const [students, setStudents] = useState<Student[]>(initialStudentsState)

  const handleInputChange = (index: number, event: any) => {
    const newStudents = [...students]
    newStudents[index] = {
      ...newStudents[index],
      [event.target.name]: event.target.value,
    }
    setStudents(newStudents)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(registerTeam(students))
  }

  return (
    <Grid
      container
      sx={{
        height: '100%',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff2e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '70px 0',
        }}
      >
        <FormControl
          sx={{
            padding: '20px 40px',
            width: '60%',
            backgroundColor: '#fff',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" align="center">
            Registrar equipo
          </Typography>
          <Grid
            container
            direction="row"
            display="flex"
            spacing={2}
            sx={{
              gap: '10px',
              margin: '20px 0 0 0',
              width: '100%',
            }}
          >
            {students.map((student, index) => (
              <StudentForm
                index={index}
                key={index}
                student={student}
                handleChange={handleInputChange}
              />
            ))}
          </Grid>
          {error && <FormHelperText>{error.text}</FormHelperText>}
          <ButtonSincronized
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: '200px' }}
            onClick={handleSubmit}
          >
            Registrar equipo
          </ButtonSincronized>
        </FormControl>
      </Box>
    </Grid>
  )
}

export default TeamForm
