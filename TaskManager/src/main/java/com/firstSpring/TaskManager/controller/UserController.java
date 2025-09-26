package com.firstSpring.TaskManager.controller;

import com.firstSpring.TaskManager.model.User;
import com.firstSpring.TaskManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.Map;
import com.firstSpring.TaskManager.security.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    //Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication auth) {
        return ResponseEntity.ok(userService.getUserByUsername(auth.getName()));
    }

//    @PostMapping("/save")
//    public ResponseEntity<User> saveUser(@RequestBody User user){
//        return ResponseEntity.ok(userService.saveUser(user));
//    }

    //Get id
    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    //Update user
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long id, @RequestBody User user, Authentication auth){
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

        // Update user
        User updatedUser = userService.updateUser(user, id, auth.getName(), role);

        // Generate new token
        String token = jwtUtil.generateToken(updatedUser.getUsername());

        // Return user info + token
        Map<String, Object> response = Map.of(
                "id", updatedUser.getId(),
                "username", updatedUser.getUsername(),
                "email", updatedUser.getEmail(),
                "role", role,
                "token", token
        );

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication auth){
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        userService.deleteUser(id, auth.getName(), role);
        return ResponseEntity.ok().build();
    }

}
