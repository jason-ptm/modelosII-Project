package com.nemezeck.controller;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nemezeck.config.ResponseStatus;
import com.nemezeck.model.Competition;
import com.nemezeck.services.CompetitionService;
import com.nemezeck.services.TeamService;
import com.nemezeck.config.ResponseStatus;

@RestController
@RequestMapping(path="/competition")
public class CompetitionController {
	private final CompetitionService compData;
	private final ResponseStatus rs;
	
	
	@Autowired
	public CompetitionController(CompetitionService compData)
	{
		this.compData= compData;
		this.rs = new ResponseStatus();
	}
	
	@GetMapping
	public ResponseEntity<?> getTeamInfo(@RequestParam(name="compid") String compID) {
		try {

			
			if (compID.trim().isEmpty() || compID == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/competition" ), HttpStatus.BAD_REQUEST );
			
			
			Competition comp= compData.getCompByID(compID);
			
			if (comp != null)
				return new ResponseEntity<>(comp, HttpStatus.OK);
			
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/competition"), HttpStatus.NOT_FOUND );
		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/competition");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	
	@PostMapping
	public ResponseEntity<?> createComp(@RequestParam(name="compname") String compName,
			@RequestParam(name="compcategory") String compCategory) {
		try {
			
			
			if (compName.trim().isEmpty() || compName == null || compCategory.trim().isEmpty() || compCategory == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/createcomp" ), HttpStatus.BAD_REQUEST );
			
			if(compData.isCompNameAvailable(compName)) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.CONFLICT, "/createcomp"), HttpStatus.CONFLICT);
			
			
			
			Competition createdComp=compData.createCompetition(compName, Integer.parseInt(compCategory));
			
			
			if (createdComp != null)
				return new ResponseEntity<>(createdComp, HttpStatus.OK);

		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/createcomp");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
		return null;
	}
	
	@PutMapping
	public ResponseEntity<?> enrollTeamToCompetition(@RequestParam(name="teamname") String teamName,
			@RequestParam(name="compname") String compName) {
		try {
			
			
			if (teamName.trim().isEmpty() || teamName == null || compName.trim().isEmpty() || compName == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/enroll-team" ), HttpStatus.BAD_REQUEST );
			
			if(compData.isTeamInOtherCompetition(teamName))
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.CONFLICT, "/enroll-team"), HttpStatus.CONFLICT);
			if(!compData.isTeamEligibleForThisCompetition(teamName, compName))
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.CONFLICT, "/enroll-team"), HttpStatus.CONFLICT);
			
			Competition updatedComp=compData.enrollTeam(teamName, compName);
			
				
			if (updatedComp != null)
				return new ResponseEntity<>(updatedComp, HttpStatus.OK);
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/enroll-team"), HttpStatus.NOT_FOUND );

		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/enroll-team");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	
	@GetMapping("/competition-category")
	public ResponseEntity<?> getCompetitionCategory(@RequestParam(name="compcategory") String compCategory) {
		try {

			
			if (compCategory.trim().isEmpty() || compCategory == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/competition-category" ), HttpStatus.BAD_REQUEST );
			
			Competition comp= compData.getAllCompetitionsByCategory(compCategory);
			
			if (comp != null)
				return new ResponseEntity<>(comp, HttpStatus.OK);
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND,"/competition-category"), HttpStatus.NOT_FOUND );
		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/competition-category");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	
}
