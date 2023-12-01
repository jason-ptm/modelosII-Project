package com.nemezeck.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.nemezeck.model.User;
import com.nemezeck.repository.PersonRepository;


@Service
public class UserService {

	private final PersonRepository userInfo;
	
	@Autowired
	public UserService(PersonRepository userInfo) {
		super();
		this.userInfo = userInfo;
	}
	
	
	public User getUserInfoByID(String userID){
		return userInfo.findById(userID).orElse(null);
	}
	
		

}
