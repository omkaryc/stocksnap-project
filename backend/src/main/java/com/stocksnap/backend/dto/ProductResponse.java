package com.stocksnap.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String productName;
    private String brand;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private boolean available;
    private String imageUrl;
    private String categoryName;
    private Long storeId;
    private String storeName;
    private String area;
    private String city;
    private Double rating;
    private boolean storeVerified;

    // ✅ NEW FIELDS
    private String contactNumber;
    private String whatsappNumber;
    private Double latitude;
    private Double longitude;
    private String address;
    private String openingTime;
    private String closingTime;
}