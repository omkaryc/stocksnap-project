package com.stocksnap.backend.service;

import com.stocksnap.backend.entity.*;
import com.stocksnap.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedCategories();
        seedUsersAndProducts();
    }

    private void seedCategories() {
        List<String> names = List.of("Groceries", "Electronics", "Fashion", "Daily Essentials");
        for (String name : names) {
            categoryRepository.findByCategoryNameIgnoreCase(name)
                    .orElseGet(() -> categoryRepository.save(Category.builder().categoryName(name).build()));
        }
    }

    private void seedUsersAndProducts() {
        if (!userRepository.existsByEmail("admin@stocksnap.com")) {
            userRepository.save(User.builder()
                    .name("Admin User")
                    .email("admin@stocksnap.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .phone("9999999999")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build());
        }

        User owner = userRepository.findByEmail("owner@stocksnap.com").orElseGet(() -> userRepository.save(User.builder()
                .name("Rahul Store Owner")
                .email("owner@stocksnap.com")
                .password(passwordEncoder.encode("Owner@123"))
                .phone("9898989898")
                .role(Role.STORE_OWNER)
                .enabled(true)
                .build()));

        userRepository.findByEmail("customer@stocksnap.com").orElseGet(() -> userRepository.save(User.builder()
                .name("Asha Customer")
                .email("customer@stocksnap.com")
                .password(passwordEncoder.encode("Customer@123"))
                .phone("9797979797")
                .role(Role.CUSTOMER)
                .enabled(true)
                .build()));

        Store store = storeRepository.findByOwner(owner).orElseGet(() -> storeRepository.save(Store.builder()
                .owner(owner)
                .storeName("Wakad Smart Mart")
                .address("Wakad Main Road")
                .city("Pune")
                .area("Wakad")
                .pincode("411057")
                .contactNumber("9022862060")
                .openingTime("09:00 AM")
                .closingTime("10:00 PM")
                .verified(true)
                .rating(4.4)
                .build()));

        if (productRepository.count() == 0) {
            Category groceries = categoryRepository.findByCategoryNameIgnoreCase("Groceries").orElseThrow();
            Category electronics = categoryRepository.findByCategoryNameIgnoreCase("Electronics").orElseThrow();
            productRepository.save(Product.builder()
                    .store(store).category(groceries).productName("Aashirvaad Atta 5kg")
                    .brand("Aashirvaad").description("Whole wheat flour pack")
                    .price(new BigDecimal("285")).stockQuantity(12)
                    .imageUrl("https://images.unsplash.com/photo-1586444248902-2f64eddc13df")
                    .build());
            productRepository.save(Product.builder()
                    .store(store).category(groceries).productName("Amul Milk 1L")
                    .brand("Amul").description("Fresh toned milk")
                    .price(new BigDecimal("32")).stockQuantity(20)
                    .imageUrl("https://images.unsplash.com/photo-1550583724-b2692b85b150")
                    .build());
            productRepository.save(Product.builder()
                    .store(store).category(electronics).productName("iPhone Charger 20W")
                    .brand("Apple Compatible").description("Fast charging adapter")
                    .price(new BigDecimal("999")).stockQuantity(5)
                    .imageUrl("https://images.unsplash.com/photo-1583863788434-e58a36330cf0")
                    .build());
        }
    }
}
