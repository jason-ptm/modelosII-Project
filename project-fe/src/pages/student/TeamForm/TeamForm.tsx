import { Box, Grid, Typography } from '@mui/material'
import { FC, useState } from 'react'
import StudentForm from '../../../components/StudentForm'
import { ButtonSincronized } from '../../../components/TextFieldSincronized/TextFieldSincronized'
import { Student } from '../../../model/student'
import './styles/index.css'
import { useDispatch } from 'react-redux'
import { registerTeam } from '../../../redux/slice/studentReducer'

interface IRegisterFormProps {}

const initialStudentsState: Student[] = [
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
  { id: '', name: '', semester: 0, grade: '' },
]

const TeamForm: FC<IRegisterFormProps> = () => {
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
    console.log(
      '🚀 ~ file: TeamForm.tsx:33 ~ handleSubmit ~ students:',
      students
    )
    dispatch(registerTeam(students))
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ padding: '40px' }}
      >
        <Typography variant="h4">Registrar equipo</Typography>
        <Grid
          container
          direction="row"
          display="flex"
          spacing={2}
          sx={{ mt: '20px', gap: '10px' }}
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
        <ButtonSincronized
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: '200px' }}
        >
          Registrar equipo
        </ButtonSincronized>
      </Box>
    </Grid>
  )
}

export default TeamForm
