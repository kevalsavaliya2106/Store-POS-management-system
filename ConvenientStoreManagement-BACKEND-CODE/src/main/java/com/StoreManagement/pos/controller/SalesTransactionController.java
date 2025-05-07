package com.StoreManagement.pos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.StoreManagement.pos.DTO.SalesTransactionDTO;
import com.StoreManagement.pos.DTO.SalesTransactionRequest;
import com.StoreManagement.pos.entity.SalesTransaction;
import com.StoreManagement.pos.service.SalesTransactionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class SalesTransactionController {

    @Autowired
    private SalesTransactionService transactionService;

    // Process a sale
    @PostMapping("/redeem")
    public SalesTransaction createTransaction(@RequestBody SalesTransactionRequest request) {
        return transactionService.processSale(
                request.getItems(),
                request.getPaymentMethod(),
                request.getPhoneNumber(),
                request.getRedeemPoints()
        );
    }
    
    @PostMapping
    public SalesTransaction createSimpleTransaction(@RequestBody SalesTransactionRequest request) {
    	return transactionService.processSimpleSale(request.getItems(), request.getPaymentMethod());
    }


    // Get all transactions
    @GetMapping
    public List<SalesTransaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // Get transaction by ID
    @GetMapping("/{id}")
    public Optional<SalesTransaction> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }
    
    @GetMapping("/recent")
    public List<SalesTransactionDTO> getRecentTransactions() {
        return transactionService.getLast10Transactions();
    }
    
}