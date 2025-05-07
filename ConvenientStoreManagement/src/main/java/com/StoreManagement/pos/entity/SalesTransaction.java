package com.StoreManagement.pos.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.StoreManagement.loyalty.entity.Customer;

@Entity
@Table(name = "sales_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SalesTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime transactionTime;
    
    private double subtotal; 
    private double totalAmount;
    private double totalTax;
    public double getTotalTax() {
		return totalTax;
	}

	public void setTotalTax(double totalTax) {
		this.totalTax = totalTax;
	}

	private double redeemedAmount = 0;

    public double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}

	public double getRedeemedAmount() {
		return redeemedAmount;
	}

	public void setRedeemedAmount(double redeemedAmount) {
		this.redeemedAmount = redeemedAmount;
	}

	private String paymentMethod; // e.g., "Cash", "Card"

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SalesTransactionItem> products;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = true)
    private Customer customer;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(LocalDateTime transactionTime) {
		this.transactionTime = transactionTime;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public List<SalesTransactionItem> getProducts() {
		return products;
	}

	public void setProducts(List<SalesTransactionItem> products) {
		this.products = products;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
    
	
    
}
