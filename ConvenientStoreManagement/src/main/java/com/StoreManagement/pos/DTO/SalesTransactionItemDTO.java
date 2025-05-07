package com.StoreManagement.pos.DTO;

import com.StoreManagement.inventory.service.ProductDTO;
import com.StoreManagement.pos.entity.SalesTransactionItem;

public class SalesTransactionItemDTO {
    private Long id;
    private ProductDTO product;
    private int quantity;
    private double subtotal;
    private double unitPrice;
    private double discount;
    private double tax;
    private double total;

    public SalesTransactionItemDTO(SalesTransactionItem item) {
        this.id = item.getId();
        this.product = new ProductDTO(item.getProduct());
        this.quantity = item.getQuantity();
        this.subtotal = item.getSubtotal();
        this.unitPrice = item.getUnitPrice();
        this.discount = item.getDiscount();
        this.tax = item.getTax();
        this.total = item.getTotal();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProductDTO getProduct() {
		return product;
	}

	public void setProduct(ProductDTO product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getTax() {
		return tax;
	}

	public void setTax(double tax) {
		this.tax = tax;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

    // Getters and setters
    
}
