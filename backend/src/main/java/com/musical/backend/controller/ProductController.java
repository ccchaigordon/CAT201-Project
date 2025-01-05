package com.musical.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.musical.backend.model.Product;

@RestController
@RequestMapping("/products")
public class ProductController {
    private List<Product> products = new ArrayList<>();

    // Constructor to add some products
    public ProductController() {
        products.add(new Product("G001", "Guitar X", "A musical instrument", 100.0, 10, "guitar", "yamaha", 4.5));
        products.add(new Product("P001", "Classic Piano", "A musical instrument", 500.0, 5, "piano", "yamaha", 4.0));
        products.add(new Product("V001", "Spark Violin", "A musical instrument", 200.0, 20, "violin", "yamaha", 4.2));
    }

    // Get all products with optional filters
    @GetMapping
    public List<Product> all(@RequestParam(required = false) String productID,
            @RequestParam(required = false) String category, @RequestParam(required = false) String brand) {
        List<Product> temp = products;

        if (productID != null) {
            temp = temp.stream()
                    .filter(product -> product.getProductID().equals(productID))
                    .collect(Collectors.toList());
        }

        if (category != null) {
            temp = temp.stream()
                    .filter(product -> product.getCategory().equals(category))
                    .collect(Collectors.toList());
        }

        if (brand != null) {
            temp = temp.stream()
                    .filter(product -> product.getBrand().equals(brand))
                    .collect(Collectors.toList());
        }

        return temp;
    }

    // Get products by brand 
    @GetMapping("/brand/{brand}")
    public List<Product> allByBrand(@PathVariable String brand) {
        return products.stream()
                .filter(product -> product.getBrand().equalsIgnoreCase(brand))
                .collect(Collectors.toList());
    }

    // Get products by category 
    @GetMapping("/category/{category}")
    public List<Product> allByCategory(@PathVariable String category) {
        return products.stream()
                .filter(product -> product.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    // Add a product
    @PostMapping("/add")
    public String addProduct(@RequestBody Product product) {
        boolean exists = products.stream().anyMatch(p -> p.getProductID().equals(product.getProductID()));

        if (exists) {
            return "Product with ID " + product.getProductID() + " already exists.";
        } else {
            products.add(product);
            return "Product with ID " + product.getProductID() + " added successfully.";
        }
    }

    // Update a product by ID 
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        Product existingProduct = products.stream()
            .filter(p -> p.getProductID().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Product not found!"));
    
        existingProduct.setProductID(product.getProductID());
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStockQuantity(product.getStockQuantity());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setRating(product.getRating());
    
        return existingProduct;
    }
}