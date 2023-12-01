import { Box, Button, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TeamItemList from '../../../components/TeamItemList'
import { getTeamById, redirectRoute } from '../../../redux/slice/studentReducer'
import { RootState } from '../../../redux/store'
import { studentPath } from '../../../utils/constants/paths'

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { selectedStudent } = useSelector((state: RootState) => state.student)

  const handleRegister = () => {
    dispatch(
      redirectRoute({
        url: `${studentPath}/${params.id}/team`,
        state: {
          isCreated: false,
        },
      })
    )
  }

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
      {selectedStudent.team?.members.filter((member) => member.id).length ? (
        <>
          <Typography fontSize={40} fontWeight={700} align="center">
            {`Equipo ${selectedStudent.team?.name}`}
          </Typography>
          <TeamItemList team={selectedStudent.team} showEditButton />
        </>
      ) : (
        <>
          <Typography fontSize={40} fontWeight={700} align="center">
            {'No hay equipo'}
          </Typography>
          <Button variant="contained" onClick={handleRegister}>
            Registrar equipo
          </Button>
        </>
      )}
    </Box>
  )
}

export default Home
