package com.firstSpring.TaskManager.service;

import com.firstSpring.TaskManager.dto.AuthRequest;
import com.firstSpring.TaskManager.model.User;
import com.firstSpring.TaskManager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    //signup-save user with hashed password and return jwt
    public User signup(AuthRequest request){
        if (userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username already exists.");
        }

        if(request.getEmail() == null || request.getEmail().trim().isEmpty()){
            throw new RuntimeException("Email is required");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String role = (request.getRole() == null || request.getRole().isBlank())
                ?"USER"
                : request.getRole().toUpperCase();
        if (!role.equals("USER") && !role.equals("ADMIN")){
            role = "USER";
        }
        user.setRole(role);

        return userRepository.save(user);
    }

    //login- authenticate and return jwt
    public User login(AuthRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        return userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
