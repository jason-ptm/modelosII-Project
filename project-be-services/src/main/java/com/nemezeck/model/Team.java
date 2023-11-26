package com.nemezeck.model;

import java.util.ArrayList;

public class Team {
	
	private String teamID;
	private String teamName;
	private ArrayList<User> teamMembers= new ArrayList<User>(2);
	private String competitionID;
		
	public Team(String teamID, String teamName, ArrayList<User> teamMembers, String competitionID) {
		super();
		this.teamID = teamID;
		this.teamName = teamName;
		this.teamMembers = teamMembers;
		this.competitionID = competitionID;
	}

	public String getTeamID() {
		return teamID;
	}
	public String getTeamName() {
		return teamName;
	}
	public ArrayList<User> getTeamMembers() {
		return teamMembers;
	}
	public void setTeamMembers(ArrayList<User> teamMembers) {
		this.teamMembers = teamMembers;
	}

	public String getCompetitionRegistered() {
		return competitionID;
	}

	public void setCompetitionRegistered(String competitionID) {
		this.competitionID = competitionID;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	
	
}
