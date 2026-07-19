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

        if (authHeader != null && authHeader.startsWith(bearer)) {
            jwt = authHeader.substring(7);
            
            // FIX: Wrap inside a try-catch block to intercept expired token exceptions gracefully
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (ExpiredJwtException e) {
                logger.warn("JWT token has expired. Sending 401 Unauthorized state to frontend.");
                
                // 1. Clear out any corrupt authentication details from the current runtime session context
                SecurityContextHolder.clearContext();
                
                // 2. Enforce explicit HTTP 401 status metadata headers on the response payload pipeline
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Token Expired\", \"message\": \"" + e.getMessage() + "\"}");
                
                // 3. Break execution early here to prevent the request from hitting your controllers
                return; 
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {    
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
