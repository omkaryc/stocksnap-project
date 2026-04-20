package com.stocksnap.backend.controller;

import com.stocksnap.backend.dto.ProductRequest;
import com.stocksnap.backend.dto.ProductResponse;
import com.stocksnap.backend.entity.User;
import com.stocksnap.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<ProductResponse> all() {
        return productService.getAll();
    }

    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @GetMapping("/search")
    public List<ProductResponse> search(@RequestParam(required = false) String q,
                                        @RequestParam(required = false) String category,
                                        @RequestParam(required = false) String brand,
                                        @RequestParam(required = false) Boolean inStock,
                                        @RequestParam(required = false) String city) {
        return productService.search(q, category, brand, inStock, city);
    }

    @GetMapping("/store/{storeId}")
    public List<ProductResponse> byStore(@PathVariable Long storeId) {
        return productService.getByStore(storeId);
    }

    @PostMapping
    @PreAuthorize("hasRole('STORE_OWNER')")
    public ProductResponse create(@AuthenticationPrincipal User user, @Valid @RequestBody ProductRequest request) {
        return productService.create(user, request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STORE_OWNER')")
    public ProductResponse update(@PathVariable Long id, @AuthenticationPrincipal User user, @Valid @RequestBody ProductRequest request) {
        return productService.update(id, user, request);
    }

    @PutMapping("/{id}/stock")
    @PreAuthorize("hasRole('STORE_OWNER')")
    public ProductResponse updateStock(@PathVariable Long id, @AuthenticationPrincipal User user, @RequestBody Map<String, Integer> body) {
        return productService.updateStock(id, body.getOrDefault("stockQuantity", 0), user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('STORE_OWNER','ADMIN')")
    public void delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        productService.delete(id, user);
    }
}
