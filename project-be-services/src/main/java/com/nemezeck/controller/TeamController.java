package com.nemezeck.controller;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nemezeck.config.ResponseStatus;
import com.nemezeck.model.Team;
import com.nemezeck.repository.TeamRepository;

import com.nemezeck.services.TeamService;


@RestController
@RequestMapping(path="/team")
public class TeamController {
	
	private final TeamService teamData;
	private final ResponseStatus rs;
	
	@Autowired
	public TeamController(TeamService teamData)
	{
		this.teamData= teamData;
		this.rs = new ResponseStatus();
	}
	
	@GetMapping
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
	

	    @PostMapping
	    public ResponseEntity<?> createTeams(@RequestParam(name="teamname") String teamName,
				@RequestParam(name="studentid") String studentID) {
	        
			try {
				
				
				if (teamName.trim().isEmpty() || teamName == null || studentID.trim().isEmpty() || studentID == null) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/createteam" ), HttpStatus.BAD_REQUEST );
				
				if(teamData.isTeamNameAvailable(teamName)) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.CONFLICT, "/createteam"), HttpStatus.CONFLICT);
				
				
				if(teamData.isStudentInOtherTeam(studentID)==true) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.UNPROCESSABLE_ENTITY, "/createteam"), HttpStatus.UNPROCESSABLE_ENTITY);
				
				
				Team createdTeam=teamData.createTeam(teamName, studentID);
				
				
				if (createdTeam != null)
					return new ResponseEntity<>(createdTeam, HttpStatus.OK);
				
				return new ResponseEntity<>(createdTeam, HttpStatus.NOT_FOUND);
			}
			catch(Exception ex) {
				LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/createteam");
				errorContent.put("error", "Internal Server Error: " + ex.getMessage());
				return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
			}
			
		}
	    
	    @PutMapping
	    public ResponseEntity<?> addMember(@RequestParam(name="teamid") String teamID,
				@RequestParam(name="studentid1") String studentID1) {
	        
			try {
				
				
				if (teamID.trim().isEmpty() || teamID == null || studentID1.trim().isEmpty() || studentID1 == null) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/add-members" ), HttpStatus.BAD_REQUEST );
				
				if(!teamData.isTeamIDValid(teamID))
					return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/add-members"), HttpStatus.NOT_FOUND );
				if(teamData.isStudentInOtherTeam(studentID1))
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.UNPROCESSABLE_ENTITY, "/add-members"), HttpStatus.UNPROCESSABLE_ENTITY); 
				
				Team updatedTeam=teamData.addTeamMembers(studentID1, teamID);
					
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
	    
	    @PutMapping("/add-members")
	    public ResponseEntity<?> addMembers(@RequestParam(name="teamid") String teamID,
				@RequestParam(name="studentid1") String studentID1, @RequestParam(name="studentid2") String studentID2) {
	        
			try {
				
				
				if (teamID.trim().isEmpty() || teamID == null || studentID1.trim().isEmpty() || studentID1 == null) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/add-members" ), HttpStatus.BAD_REQUEST );
				
				if(!teamData.isTeamIDValid(teamID))
					return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/add-members"), HttpStatus.NOT_FOUND );
				if(teamData.isStudentInOtherTeam(studentID1))
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.UNPROCESSABLE_ENTITY, "/add-members"), HttpStatus.UNPROCESSABLE_ENTITY); 
				if(teamData.isStudentInOtherTeam(studentID2))
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.UNPROCESSABLE_ENTITY, "/add-members"), HttpStatus.UNPROCESSABLE_ENTITY);
				
				Team updatedTeam=teamData.addTeamMembers(studentID1, teamID);
				if(!studentID2.isBlank()|| !studentID2.isEmpty())
					updatedTeam=teamData.addTeamMembers(studentID2, teamID);
					
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
	    
	    @PutMapping("/update-team")
	    public ResponseEntity<?> updateTeam(@RequestParam(name="teamid") String teamID,
				@RequestParam(name="studentid1") String studentID1) {
	        
			try {
				
				if (teamID.trim().isEmpty() || teamID == null || studentID1.trim().isEmpty() || studentID1 == null) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/update-team" ), HttpStatus.BAD_REQUEST );
				
				if(!teamData.isTeamIDValid(teamID))
					return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/add-members"), HttpStatus.NOT_FOUND );
				
				teamData.updateTeam(teamID, studentID1);
				Team updatedTeam= teamData.getTeamInfoByID(teamID);
					
				if (updatedTeam != null)
					return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
				
				return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/update-team"), HttpStatus.NOT_FOUND );

			}
			catch(Exception ex) {
				LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/update-team");
				errorContent.put("error", "Internal Server Error: " + ex.getMessage());
				return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
			}
	}   
	    @DeleteMapping
	    public ResponseEntity<?> deleteTeam(@RequestParam(name="teamid") String teamID) {
	        
			try {
				
				if (teamID.trim().isEmpty() || teamID == null ) 
					return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/delete-team" ), HttpStatus.BAD_REQUEST );
				
	
				teamData.deleteTeam(teamID);
				Team updatedTeam= teamData.getTeamInfoByID(teamID);
					
				if (updatedTeam == null)
					return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
				
				return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/delete-team"), HttpStatus.NOT_FOUND );

			}
			catch(Exception ex) {
				LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/delete-team");
				errorContent.put("error", "Internal Server Error: " + ex.getMessage());
				return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
			}
	}   

	@GetMapping("/team-by-member")
        public ResponseEntity<?> getTeamByMemberID(@RequestParam(name="studentid") String studentID) {
            try {


                if (studentID.trim().isEmpty() || studentID == null) 
                    return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/add-members" ), HttpStatus.BAD_REQUEST );


                Team updatedTeam=teamData.getTeamByMemberIDService(studentID);

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