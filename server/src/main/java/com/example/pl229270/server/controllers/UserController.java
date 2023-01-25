package com.example.pl229270.server.controllers;

import com.example.pl229270.server.auth.UserSession;
import com.example.pl229270.server.entities.User;
import com.example.pl229270.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping(path = "/all")
    public @ResponseBody String getAllUsers() {
        UserSession session = UserSession.getCurrentSession();
        return session.getEmail();
    }
}
