import { FC, useEffect, useState } from 'react'
import './styles/index.css'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { TextFieldSincronized } from '../../../components'

interface ICompetitionDetailsProps {}

const CompetitionDetails: FC<ICompetitionDetailsProps> = (props) => {
  const params = useParams()


  const [name, setName] = useState()

  useEffect(() => {}, [])

  console.log('🚀 ~ file: CompetitionDetails.tsx:8 ~ COMPETITION')
  return (
    <Box>
      <TextFieldSincronized
        margin="normal"
        required
        fullWidth
        id="code"
        label="Codigo"
        name="code"
        autoFocus
        type="number"
        // onChange={(e: any) => setCode(e.target.value)}
      />
    </Box>
  )
}

export default CompetitionDetails
