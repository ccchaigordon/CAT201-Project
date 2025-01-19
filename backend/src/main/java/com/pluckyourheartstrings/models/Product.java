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
        this.imgSrc = "";
        this.name = "";
        this.category = "";
        this.brand = "";
        this.description = "";
        this.price = "";
        this.rating = "";
        this.quantity = "";
        this.specs = "";
    }

    // Constructor
    public Product(String id, String imgSrc, String category, String brand, String description,
            String price, String rating, String quantity, String name, String specs) {
        this.id = id;
        this.imgSrc = imgSrc;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.quantity = quantity;
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

            try (BufferedReader br = new BufferedReader(
                        new FileReader("../backend/src/main/resources/" + csvFile))) {
                    String line;
                    boolean isFirstLine = true;
                    while ((line = br.readLine()) != null) {
                        if (isFirstLine) {
                            isFirstLine = false; // Skip header
                            continue;
                        }

                    // System.out.println(subtotal);
                    String[] productData = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"); // Assuming CSV columns are id,name,price,etc.
                    for (int i = 0; i < productData.length; i++) {
                        productData[i] = productData[i].replaceAll("^\"|\"$", "");
                    }
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
            }
        }
        return null;
    }

    public static boolean updateProductInCSV(String id, String name, String productCategory,
            String brand,
            String description, String price, String rating, String quantity, String imgSrc, String specs, String ...csvFile) {        
        boolean productFound = false;
        boolean success = false;

        for (String csv_File : csvFile) {
            List<String[]> products = new ArrayList<>();
            try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/" + csv_File))) {
                String line;
                boolean isFirstLine = true;
                while ((line = br.readLine()) != null) {
                    if (isFirstLine) {
                        isFirstLine = false; // Add header to the list
                        products.add(line.split(","));
                        continue;
                    }
                    String[] productData = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"); // Handle commas inside quotes
                    // for (int i = 0; i < productData.length; i++) {
                    //     productData[i] = productData[i].replaceAll("^\"|\"$", "");
                    // }

                    System.out.println(productData[2]);
                    if (productData[0].trim().equals(id)) {
                        productData = new String[] {
                                id,
                                "\"" + name + "\"",
                                "\"" + productCategory + "\"",
                                "\"" + brand + "\"",
                                "\"" + description + "\"",
                                price, rating, quantity,
                                "\"" + imgSrc + "\"",
                                "\"" + specs + "\""
                        };
                        productFound = true;
                    }
                    products.add(productData);
                }
            } catch (IOException e) {
                System.err.println("Error reading CSV file: " + e.getMessage());
            }

            if (productFound) {
                try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/" + csv_File))) {
                    for (String[] productData : products) {
                        //System.out.println("productData: " + productData[3]);
                        bw.write(String.join(",", productData));
                        bw.newLine();
                    }
                    success = true;
                } catch (IOException e) {
                    System.err.println("Error writing to CSV file: " + e.getMessage());
                    success = false;
                }
            }
        }         
        return success;
    }

    // new method: add new product to CSV
    public static boolean addNewProductToCsv(String csvFile, String id, String name, String productCategory,
            String brand,
            String description, String price, String rating, String quantity, String imgSrc, String specs) {
        List<String[]> products = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/" + csvFile))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Add header to the list
                    products.add(line.split(","));
                    continue;
                }
                String[] productData = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"); // Handle commas inside quotes

                products.add(productData);
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        String[] newProduct = new String[] {
                id,
                "\"" + name + "\"",
                "\"" + productCategory + "\"",
                "\"" + brand + "\"",
                "\"" + description + "\"",
                price, rating, quantity,
                "\"" + imgSrc + "\"",
                "\"" + specs + "\""
        };

        products.add(newProduct);

        // Write updated user list back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/" + csvFile))) {

            for (String[] product : products) {
                bw.write(String.join(",", product));
                bw.newLine();
            }
            System.out.println("Product successfully added with ID: " + id);
            return true;
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
            return false;
        }
    }

    public static List<Product> getProductByName_Brand(String query, String... csvFiles) {

        query = query.toLowerCase();
        List<Product> matches = new ArrayList<>();

        for (String csvFile : csvFiles) {
            InputStream inputStream = Product.class.getClassLoader().getResourceAsStream(csvFile);
            if (inputStream == null) {
                System.err.println("File not found in resources");
                continue;
            }

            try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                    CSVReader csvReader = new CSVReader(br)) {
                List<String[]> allRows = csvReader.readAll();// Read all rows

                for (int i = 1; i < allRows.size(); i++) { // Skip the header
                    String[] productData = allRows.get(i);
                    String name = productData[1].toLowerCase();
                    String brand = productData[3].toLowerCase();
                    if (name.contains(query) || brand.contains(query)) {
                        matches.add(new Product(
                                productData[0], productData[8], productData[2], productData[3],
                                productData[4], productData[5],
                                productData[6], productData[7],
                                productData[1], productData[9]));                        
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
        
        if(matches.isEmpty()) {
            return null;
        }
        else {
            return matches;
        }
    }

}
