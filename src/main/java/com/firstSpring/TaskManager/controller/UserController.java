package com.firstSpring.TaskManager.controller;

import com.firstSpring.TaskManager.model.User;
import com.firstSpring.TaskManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    //Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        return ResponseEntity.ok(userService.saveUser(user));
    }

    //Get id
    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getIUserById(id));
    }

    //Update user
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user){
        return ResponseEntity.ok(userService.updateUser(user, id));
    }

    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

}
