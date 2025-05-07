package com.StoreManagement.loyalty.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.StoreManagement.loyalty.entity.Customer;
import com.StoreManagement.loyalty.entity.CustomerDTO;
import com.StoreManagement.loyalty.service.CustomerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Register a new customer
    @PostMapping
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody Customer customer) {
        Customer saved = customerService.registerCustomer(customer);
        return new ResponseEntity<>(new CustomerDTO(saved), HttpStatus.CREATED);
    }
    
    @GetMapping
    public List<Customer> getAllCustomers(){
    	return customerService.getAllCustomers();
    }


    // Get customer by phone number
    @GetMapping("/{phoneNumber}")
    public ResponseEntity<CustomerDTO> getCustomerByPhone(@PathVariable String phoneNumber) {
        return customerService.getCustomerByPhoneNumber(phoneNumber)
            .map(customer -> ResponseEntity.ok(new CustomerDTO(customer)))
            .orElse(ResponseEntity.notFound().build());
    }


    // Update reward points
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody Customer updated) {
        Customer saved = customerService.updateCustomerDetails(id, updated);
        return ResponseEntity.ok(new CustomerDTO(saved));
    }

}
