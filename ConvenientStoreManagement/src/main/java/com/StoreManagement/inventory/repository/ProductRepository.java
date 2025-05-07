package com.StoreManagement.inventory.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StoreManagement.inventory.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findByBarcode(String barcode);
}
