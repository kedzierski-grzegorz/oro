package com.example.pl229270.server.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class UserSession {
    @Getter @Setter
    private int id;
    @Getter @Setter
    private Role role;
    @Getter @Setter
    private String token;
    @Getter @Setter
    private String username;
    @Getter @Setter
    private String fullName;

    public static UserSession getCurrentSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        String token = attr.getRequest().getHeader("Authorization");
        return BasicAuthenInterceptor.sessions.get(token == null || token.equals("") ? "unknown" : token);
    }
}
