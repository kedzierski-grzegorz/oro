package com.example.pl229270.server.entities;

import com.example.pl229270.server.auth.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String firstName;
    @Getter @Setter
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Getter @Setter
    private Role role;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String password;
    @Getter @Setter
    private Date birthDate;
}
