package com.nemezeck.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nemezeck.model.Competition;


@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Integer>{
	
	@Query(value="SELECT c FROM Competition c WHERE c.compName=:val")
	Optional<Competition> findCompByName(@Param("val")String compName);
	
	@Query(value="SELECT c FROM Competition c WHERE c.compCategory=:val")
	ArrayList<Competition> findCompByCategory(@Param("val")int compCategory);
}
