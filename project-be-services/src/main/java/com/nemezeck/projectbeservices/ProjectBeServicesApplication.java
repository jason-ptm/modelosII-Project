package com.nemezeck.projectbeservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan(basePackages = "com.nemezeck.controller")
@ComponentScan(basePackages = "com.nemezeck.repository")

@SpringBootApplication
public class ProjectBeServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectBeServicesApplication.class, args);
	}

}
