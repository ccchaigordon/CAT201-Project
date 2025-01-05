package com.musical.backend.model;

public class Product {
    private String productID;
    private String name;
    private String description;
    private double price;
    private int stockQuantity;
    private String category;
    private String brand;
    private double rating;

    // Constructor
    public Product(String productID, String name, String description, double price, int stockQuantity, String category, String brand, double rating) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.brand = brand;
        this.rating = rating;
    }

    // Getters and Setters
    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    // Methods
    public void updateStock(int quantity) {
        this.stockQuantity += quantity;
    }

    public String getProductDetails() {
        return "Product ID: " + productID + "\n" +
               "Name: " + name + "\n" +
               "Description: " + description + "\n" +
               "Price: " + price + "\n" +
               "Stock Quantity: " + stockQuantity + "\n" +
               "Category: " + category + "\n" +
               "Brand: " + brand + "\n" +
               "Rating: " + rating;
    }
}