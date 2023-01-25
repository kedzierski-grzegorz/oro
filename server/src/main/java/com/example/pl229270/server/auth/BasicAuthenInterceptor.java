package com.example.pl229270.server.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class BasicAuthenInterceptor implements HandlerInterceptor {

    public static Map<String, UserSession> sessions = new HashMap<String, UserSession>(){{
        put("test", new UserSession() {{
            setId(0);
            setRole(Role.ADMIN);
            setToken("test");
            setUsername("Jan");
            setFullName("Jan Nowak");
        }});
    }};

    private String[] anonymousAllowedPaths = new String[] {
        "/login"
    };

    private Map<String, String[]> rolesPaths = new HashMap<String, String[]>() {{
        put("/admin", new String[] { Role.ADMIN.toString() });
    }};

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getServletPath();
        for (String allowedPath : anonymousAllowedPaths) {
            if (path.startsWith(allowedPath)) {
                return true;
            }
        }

        String token = request.getHeader("Authorization");
        UserSession session = sessions.get(token == null || token.equals("") ? "unknown" : token);
        if (session == null) {
            response.sendError(401, "Unauthorized");
            return false;
        }

        for (String rolePath : rolesPaths.keySet()) {
            if (path.startsWith(rolePath)) {
                String[] roles = rolesPaths.get(rolePath);
                if (!Arrays.asList(roles).contains(session.getRole().toString())) {
                    response.sendError(403, "Forbidden");
                    return false;
                }
            }
        }

        return true;
    }
}
