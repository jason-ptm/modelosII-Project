package com.nemezeck.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nemezeck.model.User;

@Repository
public interface PersonRepository extends JpaRepository<User, String>{
	
	@Query(value="SELECT fk_team_id FROM User fk_team_id WHERE idNumber=:val")
	User getUserTeamAssignedID(@Param("val")String studentID ) ;
	
	@Modifying
	@Query("UPDATE User SET hasTeam= false WHERE idNumber=:val")
	void leaveTeam(@Param("val")String studentID ) ;
}
