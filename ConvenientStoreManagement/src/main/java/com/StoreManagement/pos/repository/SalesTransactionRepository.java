package com.StoreManagement.pos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.StoreManagement.pos.entity.SalesTransaction;

public interface SalesTransactionRepository extends JpaRepository<SalesTransaction, Long> {
	List<SalesTransaction> findTop10ByOrderByTransactionTimeDesc();
}
