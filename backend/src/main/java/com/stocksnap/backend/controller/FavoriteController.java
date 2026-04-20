package com.stocksnap.backend.controller;

import com.stocksnap.backend.dto.ProductResponse;
import com.stocksnap.backend.entity.User;
import com.stocksnap.backend.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping("/{productId}")
    public Map<String, String> add(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        favoriteService.add(user, productId);
        return Map.of("message", "Added to favorites");
    }

    @GetMapping
    public List<ProductResponse> all(@AuthenticationPrincipal User user) {
        return favoriteService.list(user);
    }

    @DeleteMapping("/{productId}")
    public Map<String, String> remove(@AuthenticationPrincipal User user, @PathVariable Long productId) {
        favoriteService.remove(user, productId);
        return Map.of("message", "Removed from favorites");
    }
}
