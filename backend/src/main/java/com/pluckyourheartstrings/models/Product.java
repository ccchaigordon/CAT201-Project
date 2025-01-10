package com.pluckyourheartstrings.models;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class Product {
    private String id;
    private String imgSrc;
    private String name;
    private String category;
    private String brand;
    private String description;
    private String price;
    private String rating;
    private String quantity;
    private String specs;

    // Constructor
    public Product() {
        this.id = "";
        this.name = "";
        this.category = "";
        this.brand = "";
        this.description = "";
        this.price = "";
        this.rating = "";
        this.quantity = "";
        this.imgSrc = "";
        this.specs = "";
    }

    // Constructor
    public Product(String id, String imgSrc, String category, String brand, String description,
            String price, String rating, String quantity, String name, String specs) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.quantity = quantity;
        this.imgSrc = imgSrc;
        this.specs = specs;
    }

    public String getid() {
        return id;
    }

    public void setid(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public String getspecs() {
        return specs;
    }

    public void setspecs(String specs) {
        this.specs = specs;
    }

    // Edit a specific field of a product
    public boolean editField(String field, String newValue) {
        switch (field.toLowerCase()) {
            case "name":
                setName(newValue);
                break;
            // case "category":
            // setCategory(newValue);
            // break;
            case "brand":
                setBrand(newValue);
                break;
            case "description":
                setDescription(newValue);
                break;
            case "price":
                setPrice(newValue);
                break;
            case "rating":
                setRating(newValue);
                break;
            case "quantity":
                setQuantity(newValue);
                break;
            case "imgsrc":
                setImgSrc(newValue);
                break;
            case "specs":
                setspecs(newValue);
                break;
            default:
                System.out.println("Invalid field: " + field);
                return false;
        }
        return true;
    }

    public static List<Product> readProductsFromCSV(String... csvfiles) {

        List<Product> products = new ArrayList<>();

        for (String csvFile : csvfiles) {
            InputStream inputStream = Product.class.getClassLoader().getResourceAsStream(csvFile);
            if (inputStream == null) {
                System.err.println("File not found in resources");
                return new ArrayList<>();
            }

            try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                    CSVReader csvReader = new CSVReader(br)) {
                List<String[]> allRows = csvReader.readAll();// Read all rows

                for (int i = 1; i < allRows.size(); i++) { // Skip the header
                    String[] productData = allRows.get(i);
                    products.add(new Product(
                            productData[0], productData[8], productData[2], productData[3],
                            productData[4], productData[5],
                            productData[6], productData[7],
                            productData[1], productData[9]));
                }
            } catch (IOException e) {
                System.err.println("Error reading CSV file: " + e.getMessage());
                return new ArrayList<>();
            } catch (CsvException e) {
                System.err.println("Error parsing CSV file: " + e.getMessage());
                return new ArrayList<>();
            }
        }

        return products;
    }

    
    public static Product getProductByID(String id, String... csvFiles) {
        System.out.println("csvFiles: " + csvFiles[0]);

        
        for (String csvFile : csvFiles) {
            InputStream inputStream = Product.class.getClassLoader().getResourceAsStream(csvFile);
            if (inputStream == null) {
                System.err.println("File not found in resources");
                continue;
            }
            // try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            //     String line;
            //     boolean isFirstLine = true;
            //     while ((line = br.readLine()) != null) {
            //         if (isFirstLine) {
            //             isFirstLine = false; // Skip header
            //             continue;
            //         }
            //         String[] productData = line.split(",");
            //         if (productData[0].trim().equals(id)) {
            //             return new Product(productData[0], productData[1], productData[2], productData[3],
            //                     productData[4], productData[5], productData[6], productData[7],
            //                     productData[8], productData[9]);
            //         }
            //     }
            // } catch (IOException e) {
            //     System.err.println("Error reading CSV file: " + e.getMessage());
            // }

            try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                    CSVReader csvReader = new CSVReader(br)) {
                List<String[]> allRows = csvReader.readAll();// Read all rows

                for (int i = 1; i < allRows.size(); i++) { // Skip the header
                    String[] productData = allRows.get(i);
                    if (productData[0].trim().equals(id)) {
                        return new Product(
                            productData[0], productData[8], productData[2], productData[3],
                            productData[4], productData[5],
                            productData[6], productData[7],
                            productData[1], productData[9]);
                    }
                }
            } catch (IOException e) {
                System.err.println("Error reading CSV file: " + e.getMessage());
                return null;
            } catch (CsvException e) {
                System.err.println("Error parsing CSV file: " + e.getMessage());
                return null;
            }
        }
        return null;
    }

    public static boolean updateProductInCSV(String csvFile, Product updatedProduct) {
        List<String[]> products = new ArrayList<>();
        boolean productFound = false;

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Add header to the list
                    products.add(line.split(","));
                    continue;
                }
                String[] productData = line.split(",");
                if (productData[0].trim().equals(updatedProduct.getid())) {
                    productData = new String[] {
                            updatedProduct.getid(), updatedProduct.getName(), updatedProduct.getCategory(),
                            updatedProduct.getBrand(), updatedProduct.getDescription(), updatedProduct.getPrice(),
                            updatedProduct.getRating(), updatedProduct.getQuantity(), updatedProduct.getImgSrc(),
                            updatedProduct.getspecs()
                    };
                    productFound = true;
                }
                products.add(productData);
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        if (productFound) {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(csvFile))) {
                for (String[] productData : products) {
                    bw.write(String.join(",", productData));
                    bw.newLine();
                }
                return true;
            } catch (IOException e) {
                System.err.println("Error writing to CSV file: " + e.getMessage());
            }
        }
        return false;
    }

}
