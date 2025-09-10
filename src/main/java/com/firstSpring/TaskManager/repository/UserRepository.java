package com.firstSpring.TaskManager.repository;

import com.firstSpring.TaskManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long > {

}
