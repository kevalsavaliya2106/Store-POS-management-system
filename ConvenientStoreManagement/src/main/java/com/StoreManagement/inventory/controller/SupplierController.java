package com.StoreManagement.inventory.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StoreManagement.inventory.entity.Supplier;
import com.StoreManagement.inventory.service.SupplierService;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
	
	@Autowired
	private SupplierService supplierService;
	
	//add
	@PostMapping
	public Supplier addSupplier(@RequestBody Supplier supplier) {
		return supplierService.addSupplier(supplier);
	}
	
	//get all
	@GetMapping
	public List<Supplier> getSuppliers() {
		return supplierService.getAllSuppliers();
		
	}
	
	@GetMapping("/{id}")
    public Optional<Supplier> getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

	
	//update
	@PutMapping("/{id}")
	public Supplier updateSupplier(@PathVariable Long id, @RequestBody Supplier updatedSupplier) {
		return supplierService.updateSupplier(id, updatedSupplier);
		
	}
	
	//delete
	@DeleteMapping("/{id}")
	public void deletSupplier(@PathVariable Long id) {
		supplierService.deleteSupplier(id);
	}
	
	

}

