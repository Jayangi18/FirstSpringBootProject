package com.firstSpring.TaskManager.dto;

//@Data
public class AuthResponse {
    private String token;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    //for error messages
    public AuthResponse(String token) {
        this.token = token;
        this.role = null;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
