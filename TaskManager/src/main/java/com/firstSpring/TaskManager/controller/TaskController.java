package com.firstSpring.TaskManager.controller;

import com.firstSpring.TaskManager.model.Task;
import com.firstSpring.TaskManager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication auth) {
        return ResponseEntity.ok(taskService.getTasksForUser(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task, Authentication auth) {
        return ResponseEntity.ok(taskService.addTask(auth.getName(), task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
