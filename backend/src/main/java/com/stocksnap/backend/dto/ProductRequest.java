package com.stocksnap.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank private String productName;
    private String brand;
    private String description;
    @NotNull private Long categoryId;
    @DecimalMin(value = "0.1")
    @NotNull private BigDecimal price;
    @Min(0)
    @NotNull private Integer stockQuantity;
    private String imageUrl;
}
