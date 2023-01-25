package com.example.pl229270.server.controllers;

import com.example.pl229270.server.auth.UserSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/admin")
public class AdminController {
    @GetMapping()
    public @ResponseBody String getAllUsers() {
        UserSession session = UserSession.getCurrentSession();
        return session.getUsername();
    }
}
