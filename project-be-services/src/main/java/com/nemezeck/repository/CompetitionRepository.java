package com.nemezeck.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nemezeck.model.Competition;
import com.nemezeck.model.Team;
import com.nemezeck.model.User;


@Repository
public class CompetitionRepository {
	private TeamRepository teamsInfo;
	private List<Competition> comps;
	private ArrayList<Team> teamsEnrolled= new ArrayList<Team>();
	
	//for team creation
	@Autowired
	public CompetitionRepository(TeamRepository teamsInfo)
	{
		this.teamsInfo = teamsInfo;
        this.comps = new ArrayList<>();
	}
	
	public Competition createCompetition(String compName, int compCategory) {
	    int compID = comps.size() + 1;
	    try {
	        Competition newComp = new Competition(Integer.toString(compID), compName, compCategory, new ArrayList<>(9));
	        comps.add(newComp);
	        return newComp;
	    } catch (Exception e) {
	        e.printStackTrace();
	        
	        return null; 
	    }
	}
	
	public Competition getCompetitionInfoByID(String compID){
		Competition comp = comps.stream()
				.filter((Competition e) -> e.getCompID().equals(compID))
				.findFirst()
				.orElse(null);
		return comp;
	}
	
	public Competition getCompetitionInfoByName(String compName){
		Competition comp = comps.stream()
				.filter((Competition e) -> e.getCompName().equals(compName))
				.findFirst()
				.orElse(null);
		return comp;
	}
	
	public boolean isCompNameAvailable(String compName) {
		
		for(Competition c : comps) {
			c=comps.stream().filter((Competition e) -> e.getCompName().equals(compName))
			.findFirst()
			.orElse(null);
			if(c.getCompName().equals(compName)) 
				return true;
			
			}
		return false;
	}
	
	public Competition enrollTeam(String teamName, String compName) throws Exception {
	    try {
	        Team team = teamsInfo.getTeamInfoByName(teamName);
	        Competition competition = getCompetitionInfoByName(compName);

	        if (team != null && competition != null) {
	            teamsInfo.setTeamComp(teamName, compName);
	            competition.setTeamsEnrolled(teamsInfo.getTeamsInCompetitionByName(compName));

	            // Set the competition ID in the team
	            team.setCompetitionRegistered(competition.getCompID());

	            return competition;
	        } else {
	            throw new Exception("Team or competition not found");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new Exception("Error enrolling team in competition: " + e.getMessage());
	    }
	}
	
	public boolean isTeamEligibleForThisCompetition(String teamID, String compID) {
		
		
		ArrayList<Integer> teamLvl=new ArrayList<Integer>();
		ArrayList<User> u=teamsInfo.getTeamInfoByID(teamID).getTeamMembers();
		Competition c= comps.get(Integer.parseInt(compID)-1);
		for(User us:u) {
			teamLvl.add(us.getCurrentProgrammingClassLevel());
			int max=Collections.max(teamLvl);
			if(max <= c.getCompCategory()) {
				return true;
			}else if(max >= c.getCompCategory() && c.getCompCategory()>=3)
				return true;
		}
		return false;
	}
	
}
