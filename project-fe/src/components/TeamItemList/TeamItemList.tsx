import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Student } from '../../model/student'
import { redirectRoute } from '../../redux/slice/studentReducer'
import { studentPath } from '../../utils/constants/paths'
import './styles/index.css'

interface ITeamItemListProps {
  team: Student[]
  showEditButton: boolean
}

const TeamItemList: FC<ITeamItemListProps> = ({ team, showEditButton }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const handleEditClick = () => {
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          flexWrap: 'wrap',
          flexGrow: 1,
          maxWidth: '1500px',
        }}
      >
        {team.map((student, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: index !== 2 ? '1px solid #ddd' : '0',
              marginRight: '',
              padding: '20px',
              flexBasis: '200px',
              flexGrow: 1,
            }}
          >
            <Typography variant="h6" color="#444">
              <Box
                sx={{
                  fontWeight: 'bold',
                }}
              >{`Participante ${index + 1}`}</Box>
            </Typography>
            <PersonIcon fontSize="large" />

            <Box
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Nombre:
              <Typography variant="body2" align="center">
                {student.name}
              </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Codigo:
              <Typography variant="body2" align="left">
                {student.id}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {showEditButton && (
        <Button variant="contained" onClick={handleEditClick}>
          Editar
        </Button>
      )}
    </Box>
  )
}

export default TeamItemList
