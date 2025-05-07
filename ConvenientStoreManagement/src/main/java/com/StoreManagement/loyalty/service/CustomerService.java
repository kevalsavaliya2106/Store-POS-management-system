package com.StoreManagement.loyalty.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.StoreManagement.loyalty.entity.Customer;
import com.StoreManagement.loyalty.entity.CustomerDTO;
import com.StoreManagement.loyalty.repository.CustomerRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Register a new customer
    public Customer registerCustomer(Customer customer) {
    	
    	customer.setCreatedAt(LocalDateTime.now());
        customer.setRewardPoints(0);
        customer.setTotalSpent(0.0);
        customer.setVisitCount(0);
        customer.setTierLevel("Bronze"); // Default tier
        customer.setActive(true);
        return customerRepository.save(customer);
    }

    // Get customer by phone number
    public Optional<Customer> getCustomerByPhoneNumber(String phoneNumber) {
        return customerRepository.findByPhoneNumber(phoneNumber);
    }

    // Update reward points
    public Customer updateCustomerDetails(Long id, Customer updated) {
        Customer customer = customerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setName(updated.getName());
        customer.setEmail(updated.getEmail());
        customer.setBirthDate(updated.getBirthDate());
        customer.setAddress(updated.getAddress());
        customer.setNotes(updated.getNotes());
        customer.setActive(updated.isActive());
        customer.setRewardPoints(updated.getRewardPoints());

        return customerRepository.save(customer);
    }
    
    public void updateCustomerAfterTransaction(Customer customer, double finalTotal, int redeemedPoints) {
        // Update totals and visit history
        customer.setTotalSpent(customer.getTotalSpent() + finalTotal);
        customer.setVisitCount(customer.getVisitCount() + 1);
        customer.setLastVisit(LocalDateTime.now());

        // Tier logic - you can adjust thresholds as needed
        customer.setTierLevel(calculateTier(customer.getTotalSpent()));

        // Points already updated during transaction logic
        customerRepository.save(customer);
    }

    private String calculateTier(double totalSpent) {
        if (totalSpent >= 1000) return "Gold";
        else if (totalSpent >= 500) return "Silver";
        else return "Bronze";
    }

	public List<Customer> getAllCustomers() {
		// TODO Auto-generated method stub
		return customerRepository.findAll();
	}

}
