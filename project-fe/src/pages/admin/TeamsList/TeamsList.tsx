import { FC } from 'react'
import './styles/index.css'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { TeamItemList } from '../../../components'

interface ITeamsListProps {}

const TeamsList: FC<ITeamsListProps> = (props) => {
  const { teams } = useSelector((state: RootState) => state.admin)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        gap: '10px',
      }}
    >
      <Typography variant="h4" align="center">
        Equipos
      </Typography>
      {teams.length > 1 ? (
        teams.map((team: any) => (
          <>
            <TeamItemList team={team} key={team.id} showEditButton={false} />
          </>
        ))
      ) : (
        <Typography variant="h5" align="center">
          No hay equipos registrados
        </Typography>
      )}
    </Box>
  )
}

export default TeamsList
