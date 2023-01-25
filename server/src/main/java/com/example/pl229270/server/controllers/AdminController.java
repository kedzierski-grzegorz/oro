package com.example.pl229270.server.controllers;

import com.example.pl229270.server.auth.UserSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/admin")
public class AdminController {
    @GetMapping()
    public @ResponseBody String getAllUsers() {
        UserSession session = UserSession.getCurrentSession();
        return session.getEmail();
    }
}
