package com.stocksnap.backend.controller;

import com.stocksnap.backend.entity.Store;
import com.stocksnap.backend.entity.User;
import com.stocksnap.backend.repository.UserRepository;
import com.stocksnap.backend.service.ProductService;
import com.stocksnap.backend.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserRepository userRepository;
    private final StoreService storeService;
    private final ProductService productService;

    @GetMapping("/users")
    public List<User> users() {
        return userRepository.findAll();
    }

    @GetMapping("/stores")
    public List<Store> stores() {
        return storeService.getAllStores();
    }

    @PutMapping("/stores/{id}/verify")
    public Store verify(@PathVariable Long id) {
        return storeService.verifyStore(id);
    }

    @PutMapping("/users/{id}/disable")
    public Map<String, String> disable(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(false);
        userRepository.save(user);
        return Map.of("message", "User disabled successfully");
    }

    @DeleteMapping("/products/{id}")
    public Map<String, String> deleteProduct(@PathVariable Long id, @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        productService.delete(id, admin);
        return Map.of("message", "Product removed successfully");
    }
}
