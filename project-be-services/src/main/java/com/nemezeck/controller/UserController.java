package com.nemezeck.controller;

import java.util.LinkedHashMap;
import java.util.Optional;

import com.nemezeck.config.ResponseStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.nemezeck.model.User;
import com.nemezeck.repository.PersonRepository;
import com.nemezeck.services.UserService;


@RestController
public class UserController {
	
	private final UserService userService;
	private ResponseStatus rs;
	
	@Autowired
	public UserController(UserService userService)
	{
		this.userService= userService;
	}
	
	

	@GetMapping("/user")
	public ResponseEntity<?> getUserInfo(@RequestParam(name = "memberid") String memberID) {
		try {

			
			if (memberID.trim().isEmpty() || memberID == null) 
				return new ResponseEntity<Object>(rs.ErrorContent(HttpStatus.BAD_REQUEST,"/user" ), HttpStatus.BAD_REQUEST );
			
			
			Object user= userService.getUserInfoByID(memberID);
			
			if (user != null)
				return new ResponseEntity<>(user, HttpStatus.OK);
			
			
			return new ResponseEntity<>(rs.ErrorContent(HttpStatus.NOT_FOUND, "/user"), HttpStatus.NOT_FOUND );
		}
		catch(Exception ex) {
			LinkedHashMap<String, Object> errorContent = rs.ErrorContent(HttpStatus.INTERNAL_SERVER_ERROR,"/user");
			errorContent.put("error", "Internal Server Error: " + ex.getMessage());
			return new ResponseEntity<>(errorContent, HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	

	}
