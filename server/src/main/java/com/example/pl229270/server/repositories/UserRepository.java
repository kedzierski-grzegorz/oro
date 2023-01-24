package com.example.pl229270.server.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.pl229270.server.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {
}
