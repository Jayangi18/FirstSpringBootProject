package com.firstSpring.TaskManager.service;

import com.firstSpring.TaskManager.model.User;
import com.firstSpring.TaskManager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Register new user
    public User saveUser(User user){
        //hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    //Get all users
    public List<User> getAllUsers(){

        return userRepository.findAll();
    }

    //Get user by id
    public User getUserById(Long userId){
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    //Get user by username
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    //Update user
    public User updateUser(User userToUpdate, Long userId, String requestUsername, String requestRole){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        //role check - if not admin
        if (!"ADMIN".equalsIgnoreCase(requestRole) &&
                !user.getUsername().equals(requestUsername)) {
            throw new RuntimeException("Access denied: You can only update your own profile");
        }

        //if admin
        user.setUsername(userToUpdate.getUsername());
        user.setEmail(userToUpdate.getEmail());

        // If USER is updating themselves, allow email/username changes too
        return userRepository.save(user);
    }

    //delete user
    public void deleteUser(Long userId, String requestUsername, String requestRole){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (!"ADMIN".equalsIgnoreCase(requestRole) &&
                !user.getUsername().equals(requestUsername)) {
            throw new RuntimeException("Access denied: You can only delete your own account");
        }

        userRepository.delete(user);
    }
}
