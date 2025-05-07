package com.StoreManagement.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.StoreManagement.inventory.entity.Supplier;
import com.StoreManagement.inventory.repository.SupplierRepository;

@Service
public class SupplierService {
	
	@Autowired
	private SupplierRepository supplierRepository;
	
	public Supplier addSupplier(Supplier supplier) {
		return supplierRepository.save(supplier);
	}
	
	public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    // Get supplier by ID
    public Optional<Supplier> getSupplierById(Long id) {
        return supplierRepository.findById(id);
    }

    // Update supplier
    public Supplier updateSupplier(Long id, Supplier updatedSupplier) {
        return supplierRepository.findById(id).map(supplier -> {
            supplier.setName(updatedSupplier.getName());
            supplier.setContact(updatedSupplier.getContact());
            return supplierRepository.save(supplier);
        }).orElse(null);
    }

    // Delete supplier
    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }
	
	

}
