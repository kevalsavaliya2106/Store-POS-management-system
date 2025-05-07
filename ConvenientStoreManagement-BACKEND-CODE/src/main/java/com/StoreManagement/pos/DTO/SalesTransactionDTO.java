package com.StoreManagement.pos.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.StoreManagement.loyalty.entity.CustomerDTO;
import com.StoreManagement.pos.entity.SalesTransaction;
import com.StoreManagement.pos.entity.SalesTransactionItem;

public class SalesTransactionDTO {
	 private Long id;
	    private LocalDateTime transactionTime;
	    private double subtotal;
	    private double totalAmount;
	    private double totalTax;
	    private double redeemedAmount;
	    private String paymentMethod;
	    private CustomerDTO customer;
	    private List<SalesTransactionItemDTO> products;

	    public SalesTransactionDTO(SalesTransaction transaction) {
	        this.id = transaction.getId();
	        this.transactionTime = transaction.getTransactionTime();
	        this.subtotal = transaction.getSubtotal();
	        this.totalAmount = transaction.getTotalAmount();
	        this.totalTax = transaction.getTotalTax();
	        this.redeemedAmount = transaction.getRedeemedAmount();
	        this.paymentMethod = transaction.getPaymentMethod();
	        this.customer = transaction.getCustomer() != null ? new CustomerDTO(transaction.getCustomer()) : null;
	        this.products = transaction.getProducts().stream()
	                            .map(SalesTransactionItemDTO::new)
	                            .collect(Collectors.toList());
	    }

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

		public double getSubtotal() {
			return subtotal;
		}

		public void setSubtotal(double subtotal) {
			this.subtotal = subtotal;
		}

		public double getTotalAmount() {
			return totalAmount;
		}

		public void setTotalAmount(double totalAmount) {
			this.totalAmount = totalAmount;
		}

		public double getTotalTax() {
			return totalTax;
		}

		public void setTotalTax(double totalTax) {
			this.totalTax = totalTax;
		}

		public double getRedeemedAmount() {
			return redeemedAmount;
		}

		public void setRedeemedAmount(double redeemedAmount) {
			this.redeemedAmount = redeemedAmount;
		}

		public String getPaymentMethod() {
			return paymentMethod;
		}

		public void setPaymentMethod(String paymentMethod) {
			this.paymentMethod = paymentMethod;
		}

		public CustomerDTO getCustomer() {
			return customer;
		}

		public void setCustomer(CustomerDTO customer) {
			this.customer = customer;
		}

		public List<SalesTransactionItemDTO> getProducts() {
			return products;
		}

		public void setProducts(List<SalesTransactionItemDTO> products) {
			this.products = products;
		}

	    // Getters and setters
	    

}
