 package com.StoreManagement.loyalty.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StoreManagement.loyalty.entity.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByPhoneNumber(String phoneNumber);
    Optional<Customer> findByEmail(String email);
}
