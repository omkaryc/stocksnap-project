package com.stocksnap.backend.repository;

import com.stocksnap.backend.entity.Store;
import com.stocksnap.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByOwner(User owner);
    List<Store> findByVerifiedTrue();
    List<Store> findByOwnerId(Long ownerId);
}
