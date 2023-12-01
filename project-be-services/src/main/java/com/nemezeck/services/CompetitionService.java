package com.nemezeck.services;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nemezeck.model.Competition;
import com.nemezeck.repository.CompetitionRepository;
import com.nemezeck.repository.TeamRepository;
import com.nemezeck.model.Team;
import com.nemezeck.model.User;

@Service
public class CompetitionService {

	private final CompetitionRepository compRepository;
	private final TeamRepository teamInfo;
	
	@Autowired
	public CompetitionService(CompetitionRepository compRepository, TeamRepository teamInfo) {
		super();
		this.compRepository = compRepository;
		this.teamInfo = teamInfo;
	}
	
	public Competition createCompetition(String compName, int compCategory) {

	        Competition newComp = new Competition();
	        newComp.setCompCategory(compCategory);
	        newComp.setCompName(compName);
	        newComp.setTeamsEnrolled(new ArrayList<Team>());
	        compRepository.save(newComp);
	        return newComp;
	       
	}
	
    public boolean isCompNameAvailable(String compName) {
        Optional<Competition> existingCompOptional = compRepository.findCompByName(compName);


        if (existingCompOptional.isPresent()) {
            Competition existingComp = existingCompOptional.get();

            return existingComp.getCompName().equalsIgnoreCase(compName);
        }

        return false;
    }
    
    public boolean isCompIDValid(String compID) {
	    int teamIndex = Integer.parseInt(compID) - 1;
		  
	    if (teamIndex < 0 || teamIndex >= compRepository.findAll().size()) 
	        return false;
	    return true;
    }
    
    public Competition getCompByID(String compID) {
    	return compRepository.findById(Integer.parseInt(compID)).orElse(null);
    }
    
	public Competition enrollTeam(String teamName, String compName) throws Exception {
	    try {
	        Team team = teamInfo.findTeamByName(teamName).orElse(null);
	        Competition competition = compRepository.findCompByName(compName).orElse(null);

	        if (team != null && competition != null) {
	            
	            competition.getTeamsEnrolled().add(team);
	            team.setEnrolled(true);
	            compRepository.save(competition);
	            teamInfo.save(team);

	            return competition;
	        } else {
	            throw new Exception("Team or competition not found");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new Exception("Error enrolling team in competition: " + e.getMessage());
	    }
	}
	public boolean isTeamInOtherCompetition(String teamName) {
		Team t= teamInfo.findTeamByName(teamName).orElse(null);
		return t.isEnrolled();
	}
	
	public boolean isTeamEligibleForThisCompetition(String teamName, String compName) {
		
		
		ArrayList<Integer> teamLvl=new ArrayList<Integer>();
		java.util.List<User> u= teamInfo.findTeamByName(teamName).orElse(null).getTeamMembers();
		Competition c= compRepository.findCompByName(compName).orElse(null);
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
	
	public ArrayList<Competition> getAllCompetitionsByCategory(String compCategory) {
		return compRepository.findCompByCategory(Integer.parseInt(compCategory));
	}
	public List<Competition> getAllCompetitions(){
		List<Competition> c= new ArrayList<>();
		c= compRepository.findAll();
		return c;
	}
}
