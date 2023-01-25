package com.example.pl229270.server.commands;

import lombok.Getter;
import lombok.Setter;

public class LoginCommand {
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String password;
}
