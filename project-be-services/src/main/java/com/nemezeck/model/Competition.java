package com.nemezeck.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name="tblCompetition")
public class Competition {

    @Id
    @SequenceGenerator(
            name="comp_sequence",
            sequenceName="comp_sequence",
            allocationSize=1
            )
    @GeneratedValue(
            strategy=GenerationType.SEQUENCE,
            generator= "comp_sequence"
            )
    @Column(name="comp_id")
    private int compID;
    private String compName;
    private int compCategory;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_comp_id", referencedColumnName = "comp_id")
    private List<Team> teamsEnrolled = new ArrayList<>();
    
	public Competition() {
		super();
	}

    public Competition(int compID, String compName, int compCategory, List<Team> teamsEnrolled) {
        super();
        this.compID = compID;
        this.compName = compName;
        this.compCategory = compCategory;
        this.teamsEnrolled = teamsEnrolled;
    }

    public int getCompCategory() {
        return compCategory;
    }
    
    public void setCompCategory(int compCategory) {
    	this.compCategory=compCategory;
    }

    public String getCompName() {
        return compName;
    }

    public void setCompName(String compName) {
        this.compName = compName;
    }


    public int getCompID() {
        return compID;
    }

	public List<Team> getTeamsEnrolled() {
		return teamsEnrolled;
	}

	public void setTeamsEnrolled(List<Team> teamsEnrolled) {
		this.teamsEnrolled = teamsEnrolled;
	}

}
