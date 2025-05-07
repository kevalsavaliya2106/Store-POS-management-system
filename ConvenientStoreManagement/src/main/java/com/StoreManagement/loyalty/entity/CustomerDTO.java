package com.StoreManagement.loyalty.entity;

public class CustomerDTO {
    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private String birthDate; // ISO string
    private String address;
    private String notes;
    private int rewardPoints;
    private String tierLevel;
    
    

    public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getPhoneNumber() {
		return phoneNumber;
	}



	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getBirthDate() {
		return birthDate;
	}



	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getNotes() {
		return notes;
	}



	public void setNotes(String notes) {
		this.notes = notes;
	}



	public int getRewardPoints() {
		return rewardPoints;
	}



	public void setRewardPoints(int rewardPoints) {
		this.rewardPoints = rewardPoints;
	}



	public String getTierLevel() {
		return tierLevel;
	}



	public void setTierLevel(String tierLevel) {
		this.tierLevel = tierLevel;
	}



	public CustomerDTO(Customer c) {
        this.id = c.getId();
        this.name = c.getName();
        this.phoneNumber = c.getPhoneNumber();
        this.email = c.getEmail();
        this.birthDate = c.getBirthDate() != null ? c.getBirthDate().toString() : null;
        this.address = c.getAddress();
        this.notes = c.getNotes();
        this.rewardPoints = c.getRewardPoints();
        this.tierLevel = c.getTierLevel();
    }
}
