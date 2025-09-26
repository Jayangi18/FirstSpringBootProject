package com.firstSpring.TaskManager.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private boolean completed = false;

    // link task → user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
