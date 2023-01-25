package com.example.pl229270.server.auth;

import com.example.pl229270.server.entities.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.UUID;

public class UserSession {
    @Getter @Setter
    private int id;
    @Getter @Setter
    private Role role;
    @Getter @Setter
    private String token;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String fullName;

    public void removeSession() {
        BasicAuthenInterceptor.sessions.remove(this.token);
    }

    public static UserSession getCurrentSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        String token = attr.getRequest().getHeader("Authorization");
        return BasicAuthenInterceptor.sessions.get(token == null || token.equals("") ? "unknown" : token);
    }

    public static UserSession getUserSessionByEmail(String email) {
        for (UserSession session : BasicAuthenInterceptor.sessions.values()) {
            if (session.getEmail().equals(email)) {
                return session;
            }
        }
        return null;
    }

    public static UserSession createSession(User user) {
        UserSession session = new UserSession();
        session.setId(user.getId());
        session.setEmail(user.getEmail());
        session.setRole(user.getRole());
        session.setFullName(user.getFirstName() + " " + user.getLastName());
        UUID uuid = UUID.randomUUID();
        session.setToken(uuid.toString().replace("-", ""));
        BasicAuthenInterceptor.sessions.put(session.getToken(), session);
        return session;
    }
}
