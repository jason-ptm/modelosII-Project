import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Team } from '../../model/Team'
import { redirectRoute } from '../../redux/slice/studentReducer'
import { studentPath } from '../../utils/constants/paths'
import './styles/index.css'
import React from 'react'

interface ITeamItemListProps {
  team: Team
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
        flexDirection: 'column',
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
          gap: '20px',
          flexWrap: 'wrap',
          flexGrow: 1,
          width: '100%',
        }}
      >
        {team.members.map((student, index) =>
          student.id ? (
            <Box
              key={index}
              sx={{
                borderRadius: '8px',
                boxShadow: '0px 0px 21px 2px rgba(222,222,222,1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '',
                padding: '20px',
                flexBasis: '200px',
                flexGrow: 1,
              }}
            >
              <IconButton>
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: '60px', color: '#1976d2' }}
                />
              </IconButton>
              <Box>
                <Typography
                  variant="body2"
                  align="center"
                  fontSize={30}
                  color="#1976d2"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {student.name}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  fontSize={20}
                  color="#1976d2"
                >
                  {student.id}
                </Typography>
              </Box>
            </Box>
          ) : (
            <React.Fragment key={index}></React.Fragment>
          )
        )}
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
