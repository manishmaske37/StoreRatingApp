package com.example.ratingApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ratingApp.model.StoreDTO;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @PostMapping("/users")
    public void addUser(@RequestBody UserDTO dto) {}

    @PostMapping("/stores")
    public void addStore(@RequestBody StoreDTO dto) {}

    @GetMapping("/dashboard")
    public AdminDashboardDTO dashboard() {}
}

