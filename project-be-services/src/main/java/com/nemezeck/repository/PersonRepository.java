package com.nemezeck.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nemezeck.model.User;




@Repository
public class PersonRepository {
	private List<User> users;
	public PersonRepository()
	{
		users = new ArrayList<User>();
		users.add(new User("20202020202","testName","testSurName", 1,"Basica",""));
		users.add(new User("20202020203","testName1","testSurName1", 1,"Basica",""));
		users.add(new User("20202020204","testName2","testSurName2", 1,"Basica",""));
		users.add(new User("20202020205","testName3","testSurName3", 1,"Basica",""));
	}

	public User getPersonInfo(String id){
		User user = users.stream()
				.filter((User e) -> e.getIdNumber().equals(id))
				.findFirst()
				.orElse(null);
	
		return user;
	}
}
