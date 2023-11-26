package com.nemezeck.model;

import java.util.ArrayList;

public class Competition {
	
	
	private String compID;
	private String compName;
	private int compCategory;
	private ArrayList<Team> teamsEnrolled= new ArrayList<Team>(9);
	
	public Competition(String compID, String compName, int compCategory, ArrayList<Team> teamsEnrolled) {
		super();
		this.compID = compID;
		this.compName = compName;
		this.compCategory = compCategory;
		this.teamsEnrolled = teamsEnrolled;
	}

	public int getCompCategory() {
		return compCategory;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public ArrayList<Team> getTeamsEnrolled() {
		return teamsEnrolled;
	}

	public void setTeamsEnrolled(ArrayList<Team> teamsEnrolled) {
		this.teamsEnrolled = teamsEnrolled;
	}

	public String getCompID() {
		return compID;
	}
	
	
	
	
}
