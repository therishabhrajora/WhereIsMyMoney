package com.whereismymoney.WhereIsMyMoney.config;

import java.io.IOException;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.whereismymoney.WhereIsMyMoney.Services.CustomUserDetailService;
import com.whereismymoney.WhereIsMyMoney.helper.SecurityConstants;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.FilterChain;
// Import the exception class explicitly from the JWT library
import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    String header = SecurityConstants.HEADER_STRING;
    String bearer = SecurityConstants.TOKEN_PREFIX;

    private final CustomUserDetailService userDetailService;
    private final JwtUtil jwtUtil;

    public JwtRequestFilter(@Lazy CustomUserDetailService userDetailService, JwtUtil jwtUtil) {
        this.userDetailService = userDetailService;
        this.jwtUtil = jwtUtil;
    }

    
    @Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    final String authHeader = request.getHeader(header);
    String username = null;
    String jwt = null;

    // 1. If there's no header, or it doesn't start with Bearer, skip validation safely
    if (authHeader == null || !authHeader.startsWith(bearer)) {
        filterChain.doFilter(request, response);
        return;
    }

    jwt = authHeader.substring(7).trim(); // Remove leading/trailing spaces
    
    // 2. Extra safety: Check if the token string itself is empty after stripping "Bearer "
    if (jwt.isEmpty()) {
        filterChain.doFilter(request, response);
        return;
    }

    try {
        username = jwtUtil.extractUsername(jwt);
    } catch (ExpiredJwtException e) {
        logger.warn("JWT token has expired. Sending 401 Unauthorized state to frontend.");
        SecurityContextHolder.clearContext();
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Token Expired\", \"message\": \"" + e.getMessage() + "\"}");
        return; 
    } catch (Exception e) {
        // Catch any other JWT parsing exceptions (malformed, bad signature, etc.)
        logger.error("Error parsing JWT token: " + e.getMessage());
        filterChain.doFilter(request, response);
        return;
    }

    // 3. Strict string validation: Ensure username is not null, empty, or the string literal "null"
    if (username != null && !username.trim().isEmpty() && !username.equalsIgnoreCase("null") 
            && SecurityContextHolder.getContext().getAuthentication() == null) {    
        
        UserDetails userDetails = this.userDetailService.loadUserByUsername(username);
        if (jwtUtil.validateToken(jwt, userDetails)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                    null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
    filterChain.doFilter(request, response);
}

}
