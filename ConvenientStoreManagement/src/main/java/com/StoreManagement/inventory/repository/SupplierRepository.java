package com.StoreManagement.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StoreManagement.inventory.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}