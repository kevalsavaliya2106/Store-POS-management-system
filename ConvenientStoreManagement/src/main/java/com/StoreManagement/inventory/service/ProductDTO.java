package com.StoreManagement.inventory.service;

import com.StoreManagement.inventory.entity.Product;

public class ProductDTO {
    private Long id;
    private String barcode;
    private String name;
    private String itemSize;
    private double cost;
    private double price;
    private String department;
    private double tax;
    private Integer minimumAge;
    private int stockQuantity;
    private Long supplierId;
    
    

    public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getBarcode() {
		return barcode;
	}



	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getItemSize() {
		return itemSize;
	}



	public void setItemSize(String itemSize) {
		this.itemSize = itemSize;
	}



	public double getCost() {
		return cost;
	}



	public void setCost(double cost) {
		this.cost = cost;
	}



	public double getPrice() {
		return price;
	}



	public void setPrice(double price) {
		this.price = price;
	}



	public String getDepartment() {
		return department;
	}



	public void setDepartment(String department) {
		this.department = department;
	}



	public double getTax() {
		return tax;
	}



	public void setTax(double tax) {
		this.tax = tax;
	}



	public Integer getMinimumAge() {
		return minimumAge;
	}



	public void setMinimumAge(Integer minimumAge) {
		this.minimumAge = minimumAge;
	}



	public int getStockQuantity() {
		return stockQuantity;
	}



	public void setStockQuantity(int stockQuantity) {
		this.stockQuantity = stockQuantity;
	}



	public Long getSupplierId() {
		return supplierId;
	}



	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}



	// Constructor
    public ProductDTO(Product p) {
        this.id = p.getId();
        this.barcode = p.getBarcode();
        this.name = p.getName();
        this.itemSize = p.getItemSize();
        this.cost = p.getCost();
        this.price = p.getPrice();
        this.department = p.getDepartment();
        this.tax = p.getTax();
        this.minimumAge = p.getMinimumAge();
        this.stockQuantity = p.getStockQuantity();
        this.supplierId = p.getSupplier() != null ? p.getSupplier().getId() : null;
    }

    // Getters and setters (or use Lombok)
}

