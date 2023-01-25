package com.example.pl229270.server.controllers;

import com.example.pl229270.server.entities.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/login")
public class LoginController {

    @GetMapping()
    public @ResponseBody String getAllUsers() {
        return "login";
    }
}
