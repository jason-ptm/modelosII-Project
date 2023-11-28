import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackgroundImage1 from '../../assets/competition1.jpg'
import BackgroundImage2 from '../../assets/competition2.jpg'
import BackgroundImage3 from '../../assets/competition3.jpg'
import BackgroundImage4 from '../../assets/competition4.jpg'
import BackgroundImage5 from '../../assets/competition5.jpg'
import {
  getCompetitions,
  joinCompetition,
  redirectRoute,
} from '../../redux/slice/studentReducer'
import { RootState } from '../../redux/store'
import './style/index.css'
import { useParams } from 'react-router-dom'

interface ICompetitionsListProps {}

const CompetitionsList: FC<ICompetitionsListProps> = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { competititons } = useSelector((state: RootState) => state.student)

  useEffect(() => {
    dispatch(getCompetitions())
  }, [])

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

  const handleClick = (id: string) => {
    if (params.adminId) {
      dispatch(
        redirectRoute({
          url: `admin/${params.adminId}/competitions/${id}`,
          state: {
            isCreated: true,
          },
        })
      )
    } else dispatch(joinCompetition(id))
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h4" align="center">
        Concursos
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: '20px' }}>
        {competititons.map((competition, index) => (
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
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  disabled={!competition.state}
                  onClick={() => handleClick(competition.id)}
                >
                  {
                    !params.adminId ? 'Inscribirse' : 'Editar'
                  }
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CompetitionsList
