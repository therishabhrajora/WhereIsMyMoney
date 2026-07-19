package com.whereismymoney.WhereIsMyMoney.config;

import java.util.List;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.whereismymoney.WhereIsMyMoney.Services.CustomUserDetailService;
import com.whereismymoney.WhereIsMyMoney.helper.DatabaseConstants;

@Configuration
@EnableAutoConfiguration
public class SecurityConfig {
    String CORS_ORIGIN = DatabaseConstants.CORS_ORIGIN;

    private JwtRequestFilter jwtRequestFilter;
    private CustomUserDetailService userDetailService;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter, CustomUserDetailService userDetailService) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.userDetailService = userDetailService;
    }

    @Bean
    public SecurityFilterChain sequrityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(httpbasic -> httpbasic.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/","/api/users/**","/api/ai/**").permitAll()

                        // 🔐 Secure endpoints
                        .requestMatchers("/api/records/**","/api/user-message/**").authenticated()

                        // fallback: block anything else
                        .anyRequest().denyAll())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowCredentials(true);

            config.setAllowedOrigins(List.of(
                    "https://moneyspendwise.netlify.app",
                    "http://localhost:5173",
                "https://nl1mk3c6-5173.inc1.devtunnels.ms"));

            config.addAllowedHeader("*");
            config.addAllowedMethod("*");
            return config;
        }));

        // http.oauth2Login(oauth -> {
        // oauth.loginPage("/collections/account");
        // oauth.successHandler(oAuthenticationSuccessHandler);
        // });

        http.logout(logout -> logout
                .logoutUrl("/collections/logout")
                .logoutSuccessUrl("/collections?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll());

        http.sessionManagement(session -> session
                .invalidSessionUrl("/login?invalidSession=true"));

        return http.build();

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
