package com.stocksnap.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stores")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User owner;

    @Column(nullable = false)
    private String storeName;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String area;
    @Column(nullable = false)
    private String pincode;
    private Double latitude;
    private Double longitude;
    @Column(nullable = false)
    private String contactNumber;
    @Column(nullable = false)
    private String openingTime;
    @Column(nullable = false)
    private String closingTime;
    @Builder.Default
    private boolean verified = false;
    @Builder.Default
    private Double rating = 0.0;
}
