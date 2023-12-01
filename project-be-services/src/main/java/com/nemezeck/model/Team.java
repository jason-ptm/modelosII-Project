package com.nemezeck.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name="tblTeam")
public class Team {

    @Id
    @SequenceGenerator(
            name="team_sequence",
            sequenceName="team_sequence",
            allocationSize=1
            )
    @GeneratedValue(
            strategy=GenerationType.SEQUENCE,
            generator= "team_sequence"
            )
    @Column(name = "team_id")
    private int teamID;

    private String teamName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_team_id", referencedColumnName = "team_id", updatable=true)
    private List<User> teamMembers = new ArrayList<>();

    private boolean isEnrolled;

    
    public Team() {
    	
    }
  
    
    public Team(int teamID, String teamName, List<User> teamMembers, boolean isEnrolled) {
        super();
        this.teamID = teamID;
        this.teamName = teamName;
        this.teamMembers = teamMembers;
        this.isEnrolled= isEnrolled;
    }

    public int getTeamID() {
        return teamID;
    }
    public String getTeamName() {
        return teamName;
    }
    public List<User> getTeamMembers() {
        return teamMembers;
    }
    public void setTeamMembers(List<User> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }


	public boolean isEnrolled() {
		return isEnrolled;
	}


	public void setEnrolled(boolean isEnrolled) {
		this.isEnrolled = isEnrolled;
	}


    
    
}
