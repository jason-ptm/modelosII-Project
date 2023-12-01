import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Student } from '../../model/student'
import TextFieldSincronized from '../TextFieldSincronized'
import './style/index.css'

interface IStudentFormProps {
  index: number
  student: Student
  disabled?: boolean
  handleChange: (index: number, event: any) => void
}

const StudentForm: FC<IStudentFormProps> = ({
  index,
  student,
  handleChange,
  disabled,
}) => {
  const [currentStudent, setCurrentStudent] = useState<Student>(student)

  useEffect(() => {
    setCurrentStudent(student)
  }, [student])

  return (
    <Box
      sx={{
        flexBasis: '200px',
        flexGrow: 1,
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRight: index === 1 ? 2 : 0,
        borderLeft: index === 1 ? 2 : 0,
        borderColor: '#ddd',
      }}
    >
      <Typography variant="h6">{`Integrante ${index + 1}`}</Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextFieldSincronized
          margin="normal"
          required
          fullWidth
          id="id"
          label="Codigo"
          name="id"
          value={currentStudent.id}
          onChange={(e: any) => handleChange(index, e)}
          disabled={disabled}
        />
        <TextFieldSincronized
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre"
          name="name"
          value={currentStudent.name}
          onChange={(e: any) => handleChange(index, e)}
          disabled={disabled}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Materia</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentStudent.subject}
            name="grade"
            label="Materia"
            onChange={(e: any) => handleChange(index, e)}
          >
            <MenuItem value={''}>---</MenuItem>
            <MenuItem value={'basic'}>Programacion basica</MenuItem>
            <MenuItem value={'medium'}>Programacion orientada</MenuItem>
            <MenuItem value={'advanced'}>Programacion avanzada</MenuItem>
            <MenuItem value={'hard'}>Modelos I - Modelos II</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Semestre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentStudent.level}
            label="Semestre"
            name="semester"
            onChange={(e: any) => handleChange(index, e)}
          >
            <MenuItem value={0}>---</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default StudentForm
