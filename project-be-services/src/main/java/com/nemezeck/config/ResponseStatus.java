package com.nemezeck.config;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;

import org.springframework.http.HttpStatus;

public class ResponseStatus {

	
	public LinkedHashMap<String, Object> ErrorContent(HttpStatus httpStatus, String endpoint) {
		
		LinkedHashMap<String, Object> errorResponse = new LinkedHashMap<>();
		errorResponse.put("timestamp", LocalDateTime.now().toString());
		errorResponse.put("path", endpoint); 
		switch (httpStatus){
			case NOT_FOUND:
				errorResponse.put("status", HttpStatus.NOT_FOUND.value());
		        errorResponse.put("error", "Not Found");
				break;
			case BAD_REQUEST:
				errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
		        errorResponse.put("error", "Bad Request");
		        errorResponse.put("path", endpoint);
		        break;
			case CONFLICT:
				errorResponse.put("status", HttpStatus.CONFLICT.value());
		        errorResponse.put("error", "Conflict");
		        errorResponse.put("path", endpoint);
		        break;
			case UNPROCESSABLE_ENTITY:
				errorResponse.put("status", HttpStatus.UNPROCESSABLE_ENTITY.value());
		        errorResponse.put("error", "Unprocessable entity");
		        errorResponse.put("path", endpoint);
		        break;
			default:
				errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
		        errorResponse.put("path", endpoint);
		        
		}
		return errorResponse;
	}
}
