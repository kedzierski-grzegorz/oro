package com.example.pl229270.server.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class BasicAuthenInterceptor implements HandlerInterceptor {

    public static Map<String, UserSession> sessions = new HashMap<String, UserSession>();

    private final String[] anonymousAllowedPaths = new String[] {
        "/login","/sign-up"
    };

    private final Map<String, String[]> rolesPaths = new HashMap<String, String[]>() {{
        put("/admin", new String[] { Role.ADMIN.toString() });
    }};

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getServletPath();
        if (path.equals("/error")) {
            return true;
        }

        String method = request.getMethod();
        String acceptMethods = request.getHeader("Access-Control-Request-Method");
        String acceptHeaders = request.getHeader("Access-Control-Request-Headers");
        if (
                method != null && method.equalsIgnoreCase("OPTIONS") &&
                acceptMethods != null &&
                acceptHeaders != null
        ) {
            return true;
        }

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
