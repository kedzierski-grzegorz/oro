package com.example.pl229270.server.controllers;

import com.example.pl229270.server.Utils;
import com.example.pl229270.server.auth.UserSession;
import com.example.pl229270.server.entities.User;
import com.example.pl229270.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping(path = "/me")
    public User getMyData() {
        UserSession session = UserSession.getCurrentSession();
        return userRepository.findById(session.getId()).orElse(null);
    }

    @PutMapping("/me")
    public void updateMyData(@RequestBody User user) {
        UserSession session = UserSession.getCurrentSession();
        User entity = userRepository.findById(session.getId()).orElse(null);
        if (entity == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (user.getEmail().isEmpty() || !Utils.isValidEmailAddress(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email address");
        }

        if (!entity.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            entity.setPassword(Utils.hash256(user.getPassword()));
        }

        entity.setEmail(user.getEmail());
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setBirthDate(user.getBirthDate());
        userRepository.save(entity);
    }
}
