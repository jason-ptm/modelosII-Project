package com.nemezeck.projectbe2;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@ComponentScan({"com.nemezeck.config","com.nemezeck.controller","com.nemezeck.repository","com.nemezeck.services"})
@EntityScan(basePackages="com.nemezeck.model")
@EnableJpaRepositories("com.nemezeck.repository") 

@SpringBootApplication
public class ProjectBe2Application {

	public static void main(String[] args) {
		SpringApplication.run(ProjectBe2Application.class, args);
	}

}
