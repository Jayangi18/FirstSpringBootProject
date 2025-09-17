package com.firstSpring.TaskManager.dto;

//import lombok.Data;
//
//@Data
public class AuthRequest {

    private String username;

    private String password;

    private String email;

    //default constructor
    public AuthRequest() {
    }

    //constructor with parameters
    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    //    @Override
//    public String toString() {
//        return "AuthRequest{username='" + username + "'}"; // Don't log password for security
//    }
}
