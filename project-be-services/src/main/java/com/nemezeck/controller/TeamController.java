package com.nemezeck.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nemezeck.model.Competition;
import com.nemezeck.model.ResponseStatus;
import com.nemezeck.model.Team;
import com.nemezeck.repository.TeamRepository;

@RestController
public class TeamController {

	private final TeamRepository teamData;
	private final ResponseStatus rs;
	
	public TeamController(TeamRepository _teamData)
	{
		teamData= _teamData;
		this.rs = new ResponseStatus();
	}
	
	@GetMapping("/team")
	public ResponseEntity<?> getTeamInfo(@RequestParam(name="teamid") String teamID) {
		try {

			
			if (teamID.trim().isEmpty() || teamID == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/team" ), HttpStatus.BAD_REQUEST );
			
			
			Team team= teamData.getTeamInfoByID(teamID);
			
			if (team != null)
				return new ResponseEntity<>(team, HttpStatus.OK);
			
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/team"), HttpStatus.NOT_FOUND );
		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/team");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	
	@GetMapping("/teams-enrolled")
	public ResponseEntity<?> getTeamsEnrolled(@RequestParam(name="compid") String competitionID) {
		try {

			
			if (competitionID.trim().isEmpty() || competitionID == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/teams-enrolled" ), HttpStatus.BAD_REQUEST );
			
			
			ArrayList<Team> teamsEnrolledInComp= teamData.getTeamsInCompetitionByID(competitionID);
			
			
			if (teamsEnrolledInComp != null)
				return new ResponseEntity<>(teamsEnrolledInComp, HttpStatus.OK);
			
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/teams-enrolled"), HttpStatus.NOT_FOUND );
		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	
	@PutMapping("/createteam")
	public ResponseEntity<?> createTeam(@RequestParam(name="teamname") String teamName,
			@RequestParam(name="studentid") String studentID) {
		try {
			
			
			if (teamName.trim().isEmpty() || teamName == null || studentID.trim().isEmpty() || studentID == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/createteam" ), HttpStatus.BAD_REQUEST );
			
			if(teamData.isTeamNameAvailable(teamName)) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.CONFLICT, "/createteam"), HttpStatus.CONFLICT);
			
			
			if(teamData.isStudentInOtherTeam(studentID)==false) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.UNPROCESSABLE_ENTITY, "/createteam"), HttpStatus.UNPROCESSABLE_ENTITY);
			
			
			Team createdTeam=teamData.createTeams(teamName, studentID);
			
			
			if (createdTeam != null)
				return new ResponseEntity<>(createdTeam, HttpStatus.OK);

		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/createteam");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
		return null;
	}
	
	@PutMapping("/add-members")
	public ResponseEntity<?> enrollTeamToCompetition(@RequestParam(name="teamid") String teamID,
			@RequestParam(name="studentid") String studentID) {
		try {
			
			
			if (teamID.trim().isEmpty() || teamID == null || studentID.trim().isEmpty() || studentID == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/add-members" ), HttpStatus.BAD_REQUEST );
			
			if(teamData.isStudentInOtherTeam(studentID)==true) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.UNPROCESSABLE_ENTITY, "/add-members"), HttpStatus.UNPROCESSABLE_ENTITY);
			
			Team updatedTeam=teamData.addTeamMembers(studentID, teamID);
				
			if (updatedTeam != null)
				return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/add-members"), HttpStatus.NOT_FOUND );

		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/add-members");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	   
}
