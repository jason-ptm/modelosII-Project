import { Competition } from '../../model/Competition'

export const getCompetitionAdapter = (competition: any): Competition => {
  return {
    id: competition.compID,
    level: competition.compCategory,
    name: competition.compName,
    teams: competition.teamsEnrolled,
  }
}

export const getCompetitionsAdapter = (competitions: any): Competition[] => {
  const finalCompetitions: Competition[] = competitions.map(
    (competition: any) => getCompetitionAdapter(competition)
  )

  console.log(
    '🚀 ~ file: CompetitionAdapter.ts:18 ~ getCompetitionsAdapter ~ finalCompetitions:',
    finalCompetitions
  )
  return finalCompetitions
}
