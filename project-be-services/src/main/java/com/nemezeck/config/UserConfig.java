package com.nemezeck.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import com.nemezeck.model.User;
import com.nemezeck.repository.PersonRepository;
import com.nemezeck.repository.TeamRepository;

@Configuration
public class UserConfig {

	// @Bean
	// CommandLineRunner commandLineRunner(PersonRepository userInfo) {
	// 	return args ->{
	// 		User user1=new User("20212020127","Javier","Cordoba", 1,"Basica", false);
	// 		User user2=new User("20221020153","Jason","Solarte", 5,"Ciencias II",false);
	// 		User user3=new User("20212020128","Felipe","Endo", 1,"Basica", false);
	// 		User user4=new User("20221020154","Steven","Herrera", 1,"Basica", false);
	// 		User user5=new User("20212020115", "Sergio", "Sanabria", 1,"Basica", false);
	// 		User user6=new User("20212020118","Andres","Vanegas",1,"Basica",false);
	// 		userInfo.saveAll(List.of(user1, user2, user3, user4, user5, user6));
			
			
	// 	};
	// }
}
