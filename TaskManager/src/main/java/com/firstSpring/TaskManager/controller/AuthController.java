
package com.firstSpring.TaskManager.controller;

import com.firstSpring.TaskManager.dto.AuthRequest;
import com.firstSpring.TaskManager.dto.AuthResponse;
import com.firstSpring.TaskManager.service.AuthService;
import com.firstSpring.TaskManager.model.User;
import com.firstSpring.TaskManager.security.JwtUtil;
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

    @Autowired
    private JwtUtil jwtUtil;

    //signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody AuthRequest request){
        try {
            User user = authService.signup(request);
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(new AuthResponse("Error:" + e.getMessage()));
        }
    }

    //login endpoint
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        try {
            User user = authService.login(request);
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(new AuthResponse("Error: Invalid Credentials"));
        }
    }
}
