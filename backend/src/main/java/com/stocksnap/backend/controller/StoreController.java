package com.stocksnap.backend.controller;

import com.stocksnap.backend.dto.StoreRequest;
import com.stocksnap.backend.entity.Store;
import com.stocksnap.backend.entity.User;
import com.stocksnap.backend.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;

    @PostMapping
    @PreAuthorize("hasRole('STORE_OWNER')")
    public Store create(@AuthenticationPrincipal User user, @Valid @RequestBody StoreRequest request) {
        return storeService.createStore(user, request);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STORE_OWNER')")
    public Store my(@AuthenticationPrincipal User user) {
        return storeService.getMyStore(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STORE_OWNER')")
    public Store update(@PathVariable Long id, @AuthenticationPrincipal User user, @Valid @RequestBody StoreRequest request) {
        return storeService.updateStore(id, user, request);
    }

    @GetMapping
    public List<Store> allVerified() {
        return storeService.getAllVerifiedStores();
    }

    @GetMapping("/{id}")
    public Store getById(@PathVariable Long id) {
        return storeService.getStore(id);
    }
}
