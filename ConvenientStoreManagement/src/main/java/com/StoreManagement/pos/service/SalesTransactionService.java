package com.StoreManagement.pos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.StoreManagement.inventory.entity.Product;
import com.StoreManagement.inventory.repository.ProductRepository;
import com.StoreManagement.loyalty.entity.Customer;
import com.StoreManagement.loyalty.repository.CustomerRepository;
import com.StoreManagement.loyalty.service.CustomerService;
import com.StoreManagement.pos.DTO.SalesTransactionDTO;
import com.StoreManagement.pos.DTO.SalesTransactionRequest;
import com.StoreManagement.pos.DTO.SalesTransactionRequest.TransactionItemRequest;
import com.StoreManagement.pos.entity.SalesTransaction;
import com.StoreManagement.pos.entity.SalesTransactionItem;
import com.StoreManagement.pos.repository.SalesTransactionRepository;

import jakarta.transaction.Transactional;

import java.io.Console;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SalesTransactionService {

    @Autowired
    private SalesTransactionRepository transactionRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private CustomerService customerService;


    // Get all transactions
    public List<SalesTransaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Get transaction by ID
    public Optional<SalesTransaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

 // Process a new sale and update customer reward points
    public SalesTransaction processSale(
            List<SalesTransactionRequest.TransactionItemRequest> itemRequests,
            String paymentMethod,
            String phoneNumber,
            int redeemPoints) {

        Map<Long, Integer> quantityMap = new HashMap<>();
        for (SalesTransactionRequest.TransactionItemRequest item : itemRequests) {
            quantityMap.put(item.getProductId(),
                    quantityMap.getOrDefault(item.getProductId(), 0) + item.getQuantity());
        }

        List<Product> products = productRepository.findAllById(quantityMap.keySet());

        double subtotal = 0.0;
        double subtaxtotal = 0.0;
        List<SalesTransactionItem> transactionItems = new ArrayList<>();

        for (Product product : products) {
            int quantity = quantityMap.getOrDefault(product.getId(), 0);
            if (quantity <= 0) continue;

            if (product.getStockQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            double unitPrice = product.getPrice();
            double tax = unitPrice * quantity * 0.10;
            double itemSubtotal = (unitPrice * quantity);

            subtotal += itemSubtotal;
            subtaxtotal += tax;

            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);

            SalesTransactionItem item = new SalesTransactionItem();
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setUnitPrice(unitPrice);
            item.setDiscount(0); // Extend later
            item.setTax(tax);      // Extend later
            item.setTotal(itemSubtotal);
            item.setTransaction(null); // will set later

            transactionItems.add(item);
        }

        SalesTransaction transaction = new SalesTransaction();
        transaction.setTransactionTime(LocalDateTime.now());
        transaction.setPaymentMethod(paymentMethod);
        transaction.setSubtotal(subtotal);
        transaction.setTotalTax(subtaxtotal);

        double finalTotal = subtotal + subtaxtotal;

        Customer customer = null;
        int pointsToRedeem = 0;
        if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
            Optional<Customer> optionalCustomer = customerRepository.findByPhoneNumber(phoneNumber.trim());
            if (optionalCustomer.isPresent()) {
                customer = optionalCustomer.get();

                int availablePoints = customer.getRewardPoints();
                pointsToRedeem = Math.min(redeemPoints, availablePoints);

                finalTotal -= pointsToRedeem;
                finalTotal = Math.max(0, finalTotal);  // avoid negative total

                int pointsEarned = (int) (finalTotal / 10);
                customer.setRewardPoints(availablePoints - pointsToRedeem + pointsEarned);
                
                customerService.updateCustomerAfterTransaction(customer, finalTotal, pointsToRedeem);

                customerRepository.save(customer);

                transaction.setCustomer(customer);
                transaction.setRedeemedAmount(pointsToRedeem);
            } else {
                System.out.println("Customer not found for phone number: " + phoneNumber);
            }
        }

        transaction.setTotalAmount(finalTotal);
        transaction.setProducts(transactionItems);

        for (SalesTransactionItem item : transactionItems) {
            item.setTransaction(transaction);
        }

        return transactionRepository.save(transaction);
    }

    public SalesTransaction processSimpleSale(
            List<SalesTransactionRequest.TransactionItemRequest> itemRequests,
            String paymentMethod) {

        Map<Long, Integer> quantityMap = new HashMap<>();
        for (SalesTransactionRequest.TransactionItemRequest item : itemRequests) {
            quantityMap.put(item.getProductId(),
                    quantityMap.getOrDefault(item.getProductId(), 0) + item.getQuantity());
        }

        List<Product> products = productRepository.findAllById(quantityMap.keySet());

        double subtotal = 0.0;
        double subtaxtotal = 0.0;
        List<SalesTransactionItem> transactionItems = new ArrayList<>();

        for (Product product : products) {
            int quantity = quantityMap.getOrDefault(product.getId(), 0);
            if (quantity <= 0) continue;

            if (product.getStockQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            double unitPrice = product.getPrice();
            double tax = unitPrice * quantity * 0.10;
            double itemSubtotal = (unitPrice * quantity);

            subtotal += itemSubtotal;
            subtaxtotal += tax;

            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);

            SalesTransactionItem item = new SalesTransactionItem();
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setUnitPrice(unitPrice);
            item.setDiscount(0);
            item.setTax(tax);
            item.setTotal(itemSubtotal);
            item.setTransaction(null);

            transactionItems.add(item);
        }

        SalesTransaction transaction = new SalesTransaction();
        transaction.setTransactionTime(LocalDateTime.now());
        transaction.setPaymentMethod(paymentMethod);
        transaction.setSubtotal(subtotal);
        transaction.setTotalTax(subtaxtotal);
        transaction.setTotalAmount(subtotal + subtaxtotal);
        transaction.setProducts(transactionItems);
        transaction.setRedeemedAmount(0);
        System.out.println("xxxxsimple");
        for (SalesTransactionItem item : transactionItems) {
            item.setTransaction(transaction);
        }

        return transactionRepository.save(transaction);
    }

	public List<SalesTransactionDTO> getLast10Transactions() {
		// TODO Auto-generated method stub
		List<SalesTransaction> transactions = transactionRepository
		        .findTop10ByOrderByTransactionTimeDesc();

		    return transactions.stream()
		        .map(SalesTransactionDTO::new)
		        .collect(Collectors.toList());
	}
}
