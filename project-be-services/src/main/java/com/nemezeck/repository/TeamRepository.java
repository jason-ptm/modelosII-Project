package com.nemezeck.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nemezeck.model.User;
import com.nemezeck.model.Competition;
import com.nemezeck.model.Team;

@Repository
public class TeamRepository {
	
	private PersonRepository memberInfo;
	private List<Team> teams;
	private ArrayList<User> members= new ArrayList<User>();
	private CompetitionRepository compInfo;
	
	
	//for team creation
	@Autowired
	public TeamRepository(PersonRepository memberInfo)
	{	
		this.compInfo=compInfo;
		this.memberInfo = memberInfo;
        this.teams = new ArrayList<>();
	}
	
	public Team createTeams(String teamName, String studentID) {
	    int teamID = teams.size() + 1;
	    try {
	        Team newTeam = new Team(Integer.toString(teamID), teamName, new ArrayList<>(2), "");
	        ArrayList<User> teamMembers = addTeamCreator(studentID);
	        newTeam.setTeamMembers(teamMembers);
	        teams.add(newTeam);
	        return newTeam;
	    } catch (Exception e) {
	        e.printStackTrace();
	        
	        return null; 
	    }
	}
		

	public ArrayList<User> addTeamCreator(String memberID) throws Exception {
		
	    if (memberID != null && !memberID.isEmpty() && memberInfo != null) {
	        members.add(memberInfo.getPersonInfo(memberID));
	    } else {
	    	throw new Exception("No fue posible agregar el miembro, por favor, revisar codigo de estudiante y de equipo");
	    }
	    return members;
	}
	
	public Team addTeamMembers(String memberID, String teamID) throws Exception {
	    
	    if (memberID == null || memberID.isEmpty() || teamID == null || teamID.isEmpty()) {
	        throw new Exception("Invalid memberID or teamID");
	    }

	    int teamIndex = Integer.parseInt(teamID) - 1;
	  
	    if (teamIndex < 0 || teamIndex >= teams.size()) 
	        throw new Exception("Invalid teamID");
	    

	    User desiredMember = memberInfo.getPersonInfo(memberID);

	    if (desiredMember == null) 
	        throw new Exception("Invalid memberID, member not found");
	    
	    
	    if (!desiredMember.getTeamAssigned().isBlank() && !desiredMember.getTeamAssigned().isEmpty()) 
	        throw new Exception("Member is already assigned to a team");
	    
	   
	    Team desiredTeam = teams.get(teamIndex);

	    
	    if (desiredTeam == null) 
	        throw new Exception("Invalid teamID, team not found");
	    
	    desiredTeam.getTeamMembers().add(desiredMember);

	    desiredMember.setTeamAssigned(teamID);

	    return desiredTeam;
	}
	
	public Team getTeamInfoByID(String id){
		Team team = teams.stream()
				.filter((Team e) -> e.getTeamID().equals(id))
				.findFirst()
				.orElse(null);
		return team;
	}
	public Team getTeamInfoByName(String teamName){
		Team team = teams.stream()
				.filter((Team e) -> e.getTeamName().equals(teamName))
				.findFirst()
				.orElse(null);
		return team;
	}
	
	public ArrayList<Team> getTeamsInCompetitionByID(String competitionID) {
	    ArrayList<Team> teamsEnrolled = new ArrayList<Team>();
	    
	    for (Team team : teams) {
	        if (team.getCompetitionRegistered().equals(competitionID)) {
	            teamsEnrolled.add(team);
	        }
	    }

	    return teamsEnrolled;
	}
	
	public ArrayList<Team> getTeamsInCompetitionByName(String competitionName) {
	    ArrayList<Team> teamsEnrolled = new ArrayList<Team>();
	    
	    for (Team team : teams) {
	        if (team.getCompetitionRegistered().equals(competitionName)) {
	            teamsEnrolled.add(team);
	        }
	    }

	    return teamsEnrolled;
	}
	
	public void setTeamComp(String teamName, String compName) {
			
		Team team = teams.stream()
				.filter((Team e) -> e.getTeamName().equals(teamName))
				.findFirst()
				.orElse(null);
		team.setCompetitionRegistered(compName);
		
	}
	
	public boolean isTeamNameAvailable(String teamName) {
		
		for(Team team : teams) {
			team=teams.stream().filter((Team e) -> e.getTeamName().equals(teamName))
			.findFirst()
			.orElse(null);
			if(team.getTeamName().equals(teamName)) 
				return true;
			
			}
		return false;
	}
	public boolean isStudentInOtherTeam(String studentID) {
		
		for(User u: members) {
			u=members.stream()
					.filter((User e) -> e.getTeamAssigned().isBlank())
					.findFirst()
					.orElse(null);
			if(u.getTeamAssigned().isBlank()||u.getTeamAssigned().isEmpty()) 
				return false;
		}
		return true;
		
	}
	

	
}
