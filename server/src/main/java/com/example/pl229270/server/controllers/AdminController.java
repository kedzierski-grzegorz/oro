package com.example.pl229270.server.controllers;

import com.example.pl229270.server.Utils;
import com.example.pl229270.server.entities.User;
import com.example.pl229270.server.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/admin")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public @ResponseBody Page<User> getUsers(
            @RequestParam(value = "page", required=false, defaultValue = "0") int page,
            @RequestParam(value = "size", required=false, defaultValue = "10") int size,
            @RequestParam(value = "sort", required=false, defaultValue = "email") String sort,
            @RequestParam(value = "desc", required=false, defaultValue = "false") boolean desc
    ) {
        PageRequest pr = PageRequest.of(page, size);
        if (sort != null && !sort.isEmpty()) {
            pr.withSort(Sort.by(desc ? Sort.Direction.DESC : Sort.Direction.ASC, sort));
        }

        return userRepository.findAll(pr);
    }

    @PutMapping("/users")
    public void updateUser(@RequestBody User user) {
        User entity = userRepository.findById(user.getId()).orElse(null);
        if (entity == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (user.getEmail().isEmpty() || !Utils.isValidEmailAddress(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email address");
        }

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            entity.setPassword(Utils.hash256(user.getPassword()));
        }

        entity.setEmail(user.getEmail());
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setRole(user.getRole());
        entity.setBirthDate(user.getBirthDate());
        userRepository.save(entity);
    }
}
