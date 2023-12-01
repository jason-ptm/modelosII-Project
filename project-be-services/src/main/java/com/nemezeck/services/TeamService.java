package com.nemezeck.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nemezeck.model.Competition;
import com.nemezeck.model.Team;
import com.nemezeck.model.User;
import com.nemezeck.repository.PersonRepository;
import com.nemezeck.repository.TeamRepository;


import jakarta.transaction.Transactional;


@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final PersonRepository memberInfo;


    @Autowired
    public TeamService(TeamRepository teamRepository, PersonRepository memberInfo) {
        this.teamRepository = teamRepository;
        this.memberInfo = memberInfo;
    }

    @Transactional
    public Team createTeam(String teamName, String userID) {
        User user = memberInfo.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userID));
        Team team = new Team();
        team.setTeamName(teamName);
        team.getTeamMembers().add(user);
        teamRepository.save(team);
        memberInfo.save(user);
        memberInfo.findById(userID).orElse(null).setHasTeam(true);
        return team;
    }
    @Transactional
	public Team addTeamMembers(String memberID, String teamID) throws Exception {
	    
	    
	    User desiredMember = memberInfo.findById(memberID)
	    		.orElseThrow(() -> new RuntimeException("User not found with ID: " + memberID));

	    Team desiredTeam = teamRepository.findById(Integer.parseInt(teamID))
	    		.orElseThrow(() -> new RuntimeException("Team not found with ID: " + teamID));

	    
	    desiredTeam.getTeamMembers().add(desiredMember);
	    memberInfo.save(desiredMember);
	    memberInfo.findById(memberID).orElse(null).setHasTeam(true);

	    return desiredTeam;
	}
    
    public boolean isTeamIDValid(String teamID) {
	    return teamRepository.existsById(Integer.parseInt(teamID));
    }
    
    public boolean isTeamNameAvailable(String teamName) {
        Optional<Team> existingTeamOptional = teamRepository.findTeamByName(teamName);


        if (existingTeamOptional.isPresent()) {
            Team existingTeam = existingTeamOptional.get();

            return existingTeam.getTeamName().equalsIgnoreCase(teamName);
        }

        return false;
    }
	
    public boolean isStudentInOtherTeam(String studentID) {
        User u = memberInfo.findById(studentID).orElse(null);
        return u.isHasTeam();
    }

    public Team getTeamInfoByID(String id) {
    	return teamRepository.findById(Integer.parseInt(id)).orElse(null);
    }
    public Team getTeamInfoByName(String teamName) {
    	return teamRepository.findTeamByName(teamName).orElse(null);
    }

    public Team getTeamByMemberIDService(String memberID) {
        User u;
        for(Team t : teamRepository.findAll()) {
            u=t.getTeamMembers().stream().filter((User e) -> e.getIdNumber().equals(memberID))
                .findFirst()
                .orElse(null);
            if(u!=null)
                return t;
        }
        return null;
    }

    @Transactional
    public void deleteTeam(String teamID) {
        Team team = teamRepository.findById(Integer.parseInt(teamID)).orElse(null);
        if (team != null) {
            List<User> teamMembersCopy = new ArrayList<>(team.getTeamMembers());
            for (User user : teamMembersCopy) {
                user.setHasTeam(false);
                team.getTeamMembers().remove(user);
            }
            teamRepository.deleteById(Integer.parseInt(teamID));
        }
    }
    @Transactional
    public void updateTeam(String teamID, String memberID) {
    	memberInfo.leaveTeam(memberID);
    	teamRepository.findById(Integer.parseInt(teamID)).orElse(null).getTeamMembers().remove(memberInfo.findById(memberID).orElse(null));
    }

	public List<Team> getAllTeams(){
		List<Team> c= new ArrayList<>();
		c= teamRepository.findAll();
		return c;
	}
}
