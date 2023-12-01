package com.nemezeck.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;


@Entity
@Table(name="tblUser")

public class User {
    @Id
    private String idNumber;

    private String firstName;
    private String firstSurname;
    private int currentProgrammingClassLevel;
    private String currentProgrammingClassName;

//    @ManyToOne
//    @JoinColumn(name="team_id", nullable=false)
//    private Team teamAssigned;
    private boolean hasTeam;

    public User() {}

    public User(String idNumber, String firstName, String firstSurname, int currentProgrammingClassLevel,
            String currentProgrammingClassName, Boolean hasTeam) {
        super();
        this.idNumber = idNumber;
        this.firstName = firstName;
        this.firstSurname = firstSurname;
        this.currentProgrammingClassLevel = currentProgrammingClassLevel;
        this.currentProgrammingClassName = currentProgrammingClassName;
        this.hasTeam=hasTeam;
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

	public boolean isHasTeam() {
		return hasTeam;
	}

	public void setHasTeam(boolean hasTeam) {
		this.hasTeam = hasTeam;
	}

//    public Team getTeamAssigned() {
//        return teamAssigned;
//    }
//
//    public void setTeamAssigned(Team teamAssigned) {
//        this.teamAssigned = teamAssigned;
//    }

    
    

}
