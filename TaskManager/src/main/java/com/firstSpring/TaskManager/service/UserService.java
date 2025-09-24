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

    public User getIUserById(Long userId){
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(User userToUpdate, Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userToUpdate.getUsername());
        user.setEmail(userToUpdate.getEmail());

        return userRepository.save(user);
    }

    public void deleteUser(Long userId){
        if (userRepository.existsById(userId)){
            userRepository.deleteById(userId);
        }
        else {
            throw new RuntimeException("User not found");
        }
    }

}
