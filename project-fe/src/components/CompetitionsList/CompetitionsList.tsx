import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackgroundImage1 from '../../assets/competition1.jpg'
import BackgroundImage2 from '../../assets/competition2.jpg'
import BackgroundImage3 from '../../assets/competition3.jpg'
import BackgroundImage4 from '../../assets/competition4.jpg'
import BackgroundImage5 from '../../assets/competition5.jpg'
import {
  getCompetitionsByCategory,
  joinCompetition,
  redirectRoute,
} from '../../redux/slice/studentReducer'
import { RootState } from '../../redux/store'
import './style/index.css'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { getCompetitions } from '../../redux/slice/adminReducer'
import { Competition } from '../../model/Competition'

interface ICompetitionsListProps {}

const CompetitionsList: FC<ICompetitionsListProps> = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { competititons: competitionsStudent, selectedStudent } = useSelector(
    (state: RootState) => state.student
  )
  const { competitions: competitionsAdmin } = useSelector(
    (state: RootState) => state.admin
  )

  const [competitions, setCompetitions] = useState<Competition[]>([])

  useEffect(() => {
    if (params.id && selectedStudent.team) {
      let higherLevel = selectedStudent.team.members[0].level

      for (const student of selectedStudent.team.members) {
        if (student.level > higherLevel) {
          higherLevel = student.level
        }
      }
      dispatch(getCompetitionsByCategory(higherLevel))
    } else if (params.adminId) {
      dispatch(getCompetitions())
    }
  }, [])

  useEffect(() => {
    if (params.adminId) {
      setCompetitions(competitionsAdmin)
    } else {
      setCompetitions(competitionsStudent)
    }
  }, [competitionsAdmin, competitionsStudent])

  const getRandomBackground = () => {
    const images = [
      BackgroundImage1,
      BackgroundImage2,
      BackgroundImage3,
      BackgroundImage4,
      BackgroundImage5,
    ]

    return images[Math.floor(Math.random() * 4)]
  }

  const handleClickCreateCompetition = () => {
    dispatch(
      redirectRoute({
        url: `admin/${params.adminId}/create-competition`,
        state: {
          isCreated: false,
        },
      })
    )
  }

  const handleClick = (competition: Competition) => {
    if (params.adminId) {
      dispatch(
        redirectRoute({
          url: `admin/${params.adminId}/competitions/${competition.id}`,
          state: {
            isCreated: true,
          },
        })
      )
    } else
      dispatch(
        joinCompetition({
          teamName: selectedStudent.team?.name,
          competitionName: competition.name,
        })
      )
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Box>
        {params.adminId && (
          <Button
            sx={{
              position: 'absolute',
            }}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleClickCreateCompetition}
          >
            Crear
          </Button>
        )}
        <Typography variant="h4" align="center">
          Concursos
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ marginTop: '20px' }}>
        {competitions.map((competition, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                }}
                image={getRandomBackground()}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {competition.name}
                </Typography>
                <Typography>{competition.level}</Typography>
              </CardContent>
              {!params.adminId && (
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleClick(competition)}
                    disabled={selectedStudent.team?.competitionInscribed}
                  >
                    Inscribirse
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CompetitionsList
