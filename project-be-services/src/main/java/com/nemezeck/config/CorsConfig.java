package com.nemezeck.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/team")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
                registry.addMapping("/competition")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT")
                    .allowedHeaders("*")
                    .allowCredentials(true);
                registry.addMapping("/user")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
                registry.addMapping("/update-team")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("PUT")
                    .allowedHeaders("*")
                    .allowCredentials(true);
                registry.addMapping("/team/add-members")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("PUT")
                    .allowedHeaders("*")
                    .allowCredentials(true);  
                registry.addMapping("/competition/competition-category")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET")
                    .allowedHeaders("*")
                    .allowCredentials(true); 
				registry.addMapping("/team/team-by-member")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET")
                    .allowedHeaders("*")
                    .allowCredentials(true);
        
            }
        };
    }
}
