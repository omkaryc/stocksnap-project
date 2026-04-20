package com.stocksnap.backend.service;

import com.stocksnap.backend.dto.ProductResponse;
import com.stocksnap.backend.entity.Favorite;
import com.stocksnap.backend.entity.Product;
import com.stocksnap.backend.entity.User;
import com.stocksnap.backend.exception.BadRequestException;
import com.stocksnap.backend.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final ProductService productService;

    public void add(User user, Long productId) {
        if (favoriteRepository.findByUserIdAndProductId(user.getId(), productId).isPresent()) {
            throw new BadRequestException("Product already in favorites");
        }
        Product product = productService.getEntity(productId);
        favoriteRepository.save(Favorite.builder().user(user).product(product).build());
    }

    public List<ProductResponse> list(User user) {
        return favoriteRepository.findByUserId(user.getId()).stream()
                .map(Favorite::getProduct)
                .map(product -> productService.getById(product.getId()))
                .toList();
    }

    public void remove(User user, Long productId) {
        favoriteRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }
}
