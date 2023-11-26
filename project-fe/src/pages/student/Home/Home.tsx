import { FC, useEffect } from 'react'
import TeamItemList from '../../../components/TeamItemList'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { getTeamById } from '../../../redux/slice/studentReducer'

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  const dispatch = useDispatch()
  const { selectedTeam, selectedStudent } = useSelector(
    (state: RootState) => state.student
  )

  useEffect(() => {
    dispatch(getTeamById(selectedStudent.id))
  }, [selectedStudent])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
      }}
    >
      <Typography variant="h4" align="center">
        {'Equipo'}
      </Typography>
      <TeamItemList team={selectedTeam} showEditButton />
    </Box>
  )
}

export default Home
