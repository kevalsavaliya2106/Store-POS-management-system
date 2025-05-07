package com.StoreManagement.inventory.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String barcode;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String itemSize; // e.g., "500ml", "1kg"

    @Column(nullable = false)
    private double cost; // wholesale or acquisition cost

    @Column(nullable = false)
    private double price; // unit retail price

    @Column(nullable = false)
    private String department; // e.g., Beverages, Snacks

    @Column(nullable = false)
    private double tax; // as a decimal, e.g., 0.10 for 10%

    @Column
    private Integer minimumAge; // nullable for non-restricted items

    @Column(nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    @JsonBackReference
    private Supplier supplier;

    // --- Getters & Setters ---

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

    public Supplier getSupplier() {
        return supplier;
    }
    
    @JsonProperty("supplierId")
    public Long getSupplierId() {
        return this.supplier != null ? this.supplier.getId() : null;
    }


    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}