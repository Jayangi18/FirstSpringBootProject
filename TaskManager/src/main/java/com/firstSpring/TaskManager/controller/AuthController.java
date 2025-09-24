
package com.firstSpring.TaskManager.controller;

import com.firstSpring.TaskManager.dto.AuthRequest;
import com.firstSpring.TaskManager.dto.AuthResponse;
import com.firstSpring.TaskManager.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    //public endpoints for auth.  return JWTs, can use for protected endpoints.
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody AuthRequest request){
        try {
            String token = authService.signup(request);
            return ResponseEntity.ok(new AuthResponse(token));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(new AuthResponse("Error:" + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        try {
            String token = authService.login(request);
            return ResponseEntity.ok(new AuthResponse(token));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(new AuthResponse("Error: Invalid Credentials"));
        }
    }
}
