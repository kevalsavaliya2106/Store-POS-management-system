package com.StoreManagement.pos.entity;

import com.StoreManagement.inventory.entity.Product;

import jakarta.persistence.*;

@Entity
@Table(name = "sales_transaction_items")
public class SalesTransactionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
    private double subtotal;
    private double unitPrice; // Captured at time of transaction
    private double discount;  // Future-proofing
    private double tax;       // Optional field
    private double total;     // unitPrice * quantity - discount + tax

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

	@ManyToOne
    @JoinColumn(name = "transaction_id")
    private SalesTransaction transaction;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
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

    public SalesTransaction getTransaction() {
        return transaction;
    }

    public void setTransaction(SalesTransaction transaction) {
        this.transaction = transaction;
    }
}
