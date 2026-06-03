package com.stocksnap.backend.service;

import com.stocksnap.backend.dto.ProductRequest;
import com.stocksnap.backend.dto.ProductResponse;
import com.stocksnap.backend.entity.*;
import com.stocksnap.backend.exception.BadRequestException;
import com.stocksnap.backend.exception.ResourceNotFoundException;
import com.stocksnap.backend.repository.CategoryRepository;
import com.stocksnap.backend.repository.ProductRepository;
import com.stocksnap.backend.repository.StoreRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;

    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ProductResponse getById(Long id) {
        return toResponse(getEntity(id));
    }

    public List<ProductResponse> search(
            String q,
            String category,
            String brand,
            Boolean inStock,
            String city,
            Double latitude,
            Double longitude,
            Double radiusKm
    ) {
        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (q != null && !q.isBlank()) {
                String like = "%" + q.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("productName")), like),
                        cb.like(cb.lower(root.get("brand")), like),
                        cb.like(cb.lower(root.get("description")), like)
                ));
            }

            if (category != null && !category.isBlank()) {
                predicates.add(cb.equal(
                        cb.lower(root.get("category").get("categoryName")),
                        category.toLowerCase()
                ));
            }

            if (brand != null && !brand.isBlank()) {
                predicates.add(cb.like(
                        cb.lower(root.get("brand")),
                        "%" + brand.toLowerCase() + "%"
                ));
            }

            if (inStock != null && inStock) {
                predicates.add(cb.greaterThan(root.get("stockQuantity"), 0));
            }

            if (city != null && !city.isBlank()) {
                predicates.add(cb.equal(
                        cb.lower(root.get("store").get("city")),
                        city.toLowerCase()
                ));
            }

            predicates.add(cb.equal(root.get("store").get("verified"), true));

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return productRepository.findAll(spec).stream()
                .filter(product -> isWithinRadius(product, latitude, longitude, radiusKm))
                .map(this::toResponse)
                .toList();
    }

    private boolean isWithinRadius(Product product, Double userLat, Double userLng, Double radiusKm) {
        if (userLat == null || userLng == null || radiusKm == null) {
            return true;
        }

        Store store = product.getStore();

        if (store.getLatitude() == null || store.getLongitude() == null) {
            return false;
        }

        double distance = calculateDistance(
                userLat,
                userLng,
                store.getLatitude(),
                store.getLongitude()
        );

        return distance <= radiusKm;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS_KM = 6371;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2)
                * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_KM * c;
    }

    public List<ProductResponse> getByStore(Long storeId) {
        return productRepository.findByStoreId(storeId).stream().map(this::toResponse).toList();
    }

    public ProductResponse create(User owner, ProductRequest request) {
        Store store = storeRepository.findByOwner(owner)
                .orElseThrow(() -> new ResourceNotFoundException("Create store first"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .store(store)
                .category(category)
                .productName(request.getProductName())
                .brand(request.getBrand())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .imageUrl(request.getImageUrl())
                .build();

        return toResponse(productRepository.save(product));
    }

    public ProductResponse update(Long id, User owner, ProductRequest request) {
        Product product = getEntity(id);

        if (!product.getStore().getOwner().getId().equals(owner.getId())) {
            throw new BadRequestException("You can update only your own store products");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        product.setCategory(category);
        product.setProductName(request.getProductName());
        product.setBrand(request.getBrand());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());

        return toResponse(productRepository.save(product));
    }

    public ProductResponse updateStock(Long id, Integer stockQuantity, User owner) {
        Product product = getEntity(id);

        if (!product.getStore().getOwner().getId().equals(owner.getId())) {
            throw new BadRequestException("You can update only your own store products");
        }

        product.setStockQuantity(stockQuantity);

        return toResponse(productRepository.save(product));
    }

    public void delete(Long id, User actor) {
        Product product = getEntity(id);

        boolean isOwner = product.getStore().getOwner().getId().equals(actor.getId());
        boolean isAdmin = actor.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new BadRequestException("Not allowed to delete this product");
        }

        productRepository.delete(product);
    }

    public Product getEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .productName(p.getProductName())
                .brand(p.getBrand())
                .description(p.getDescription())
                .price(p.getPrice())
                .stockQuantity(p.getStockQuantity())
                .available(p.isAvailable())
                .imageUrl(p.getImageUrl())
                .categoryName(p.getCategory().getCategoryName())
                .storeId(p.getStore().getId())
                .storeName(p.getStore().getStoreName())
                .area(p.getStore().getArea())
                .city(p.getStore().getCity())
                .rating(p.getStore().getRating())
                .storeVerified(p.getStore().isVerified())
                // ✅ NEW — contact & map fields
                .contactNumber(p.getStore().getContactNumber())
                .whatsappNumber(p.getStore().getContactNumber())
                .latitude(p.getStore().getLatitude())
                .longitude(p.getStore().getLongitude())
                .address(p.getStore().getAddress())
                .openingTime(p.getStore().getOpeningTime())
                .closingTime(p.getStore().getClosingTime())
                .build();
    }
}