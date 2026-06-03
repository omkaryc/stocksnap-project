package com.stocksnap.backend.service;

import com.stocksnap.backend.dto.StoreRequest;
import com.stocksnap.backend.entity.Role;
import com.stocksnap.backend.entity.Store;
import com.stocksnap.backend.entity.User;
import com.stocksnap.backend.exception.BadRequestException;
import com.stocksnap.backend.exception.ResourceNotFoundException;
import com.stocksnap.backend.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;

    public Store createStore(User owner, StoreRequest request) {
        if (owner.getRole() != Role.STORE_OWNER) {
            throw new BadRequestException("Only store owners can create stores");
        }
        if (storeRepository.findByOwner(owner).isPresent()) {
            throw new BadRequestException("Store owner already has a store");
        }
        Store store = Store.builder()
                .owner(owner)
                .storeName(request.getStoreName())
                .address(request.getAddress())
                .city(request.getCity())
                .area(request.getArea())
                .pincode(request.getPincode())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .contactNumber(request.getContactNumber())
                .openingTime(request.getOpeningTime())
                .closingTime(request.getClosingTime())
                .verified(false)
                .build();
        return storeRepository.save(store);
    }

    public Store getMyStore(User owner) {
        return storeRepository.findByOwner(owner)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found for owner"));
    }

    public Store updateStore(Long id, User owner, StoreRequest request) {
        Store store = getStore(id);
        if (!store.getOwner().getId().equals(owner.getId())) {
            throw new BadRequestException("You can update only your own store");
        }
        store.setStoreName(request.getStoreName());
        store.setAddress(request.getAddress());
        store.setCity(request.getCity());
        store.setArea(request.getArea());
        store.setPincode(request.getPincode());
        store.setLatitude(request.getLatitude());
        store.setLongitude(request.getLongitude());
        store.setContactNumber(request.getContactNumber());
        store.setOpeningTime(request.getOpeningTime());
        store.setClosingTime(request.getClosingTime());
        return storeRepository.save(store);
    }

    public List<Store> getAllVerifiedStores() {
        return storeRepository.findByVerifiedTrue();
    }

    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store getStore(Long id) {
        return storeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store not found"));
    }

    public Store verifyStore(Long id) {
        Store store = getStore(id);
        store.setVerified(true);
        return storeRepository.save(store);
    }
}
