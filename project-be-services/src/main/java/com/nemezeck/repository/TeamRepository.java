package com.nemezeck.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nemezeck.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer>{

	@Query(value="SELECT t FROM Team t WHERE t.teamName=:val")
	Optional<Team> findTeamByName(@Param("val")String teamName);
}
