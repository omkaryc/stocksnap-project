package com.stocksnap.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StoreRequest {
    @NotBlank private String storeName;
    @NotBlank private String address;
    @NotBlank private String city;
    @NotBlank private String area;
    @NotBlank private String pincode;
    private Double latitude;
    private Double longitude;
    @NotBlank private String contactNumber;
    @NotBlank private String openingTime;
    @NotBlank private String closingTime;
}
