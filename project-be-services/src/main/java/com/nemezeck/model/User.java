package com.nemezeck.model;

public class User {
	
	private String idNumber;
	private String firstName;
	private String firstSurname;
	private int currentProgrammingClassLevel;
	private String currentProgrammingClassName;
	private String teamAssigned;
	
	public User() {}

	public User(String idNumber, String firstName, String firstSurname, int currentProgrammingClassLevel,
			String currentProgrammingClassName, String teamAssigned) {
		super();
		this.idNumber = idNumber;
		this.firstName = firstName;
		this.firstSurname = firstSurname;
		this.currentProgrammingClassLevel = currentProgrammingClassLevel;
		this.currentProgrammingClassName = currentProgrammingClassName;
		this.teamAssigned = teamAssigned;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getFirstSurname() {
		return firstSurname;
	}

	public int getCurrentProgrammingClassLevel() {
		return currentProgrammingClassLevel;
	}

	public String getCurrentProgrammingClassName() {
		return currentProgrammingClassName;
	}

	public String getTeamAssigned() {
		return teamAssigned;
	}

	public void setTeamAssigned(String teamAssigned) {
		this.teamAssigned = teamAssigned;
	}

	
	
	
}
