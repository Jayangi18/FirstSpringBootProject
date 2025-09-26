package com.firstSpring.TaskManager.repository;

import com.firstSpring.TaskManager.model.Task;
import com.firstSpring.TaskManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
