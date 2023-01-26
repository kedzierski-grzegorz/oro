package com.example.pl229270.server.controllers;

import com.example.pl229270.server.Utils;
import com.example.pl229270.server.auth.Role;
import com.example.pl229270.server.auth.UserSession;
import com.example.pl229270.server.commands.LoginCommand;
import com.example.pl229270.server.commands.SignUpCommand;
import com.example.pl229270.server.entities.User;
import com.example.pl229270.server.repositories.UserRepository;
import com.google.common.hash.Hashing;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public UserSession login(@RequestBody LoginCommand command) {
        if (command.getEmail().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is empty");
        }
        if (command.getPassword().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is empty");
        }

        User user = userRepository.findByEmail(command.getEmail());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        String hashedPassword = Utils.hash256(command.getPassword());
        if (!user.getPassword().equals(hashedPassword)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        UserSession userSession = UserSession.getUserSessionByEmail(user.getEmail());
        if (userSession == null) {
            userSession = UserSession.createSession(user);
        }

        return userSession;
    }

    @PostMapping("/logout")
    public void logout() {
        UserSession session = UserSession.getCurrentSession();
        session.removeSession();
    }

    @PostMapping("/sign-up")
    public UserSession signUp(@RequestBody SignUpCommand command) {
        if (command.getEmail().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is empty");
        }
        if (command.getPassword().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is empty");
        }

        if (!Utils.isValidEmailAddress(command.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is invalid");
        }

        if (userRepository.existsByEmail(command.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User();
        user.setEmail(command.getEmail());
        user.setPassword(Utils.hash256(command.getPassword()));
        user.setRole(Role.USER);
        user.setFirstName("");
        user.setLastName("");

        userRepository.save(user);

        return UserSession.createSession(user);
    }
}
