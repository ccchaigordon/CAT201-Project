package com.pluckyourheartstrings.models;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

//import com.pluckyourheartstrings.models.Product;

public class Order {
    private String orderID;
    private String userName;
    private String orderDate;
    private List<String> itemsName;
    private List<String> quantity;
    private List<String> subtotal;
    private double totalPrice;
    private String shippingAddress;
    private String paymentMethod;
    private String paymentStatus;

    public Order() {
        orderID = "";
        userName = "";
        orderDate = "";
        itemsName = new ArrayList<>();
        quantity = new ArrayList<>();
        subtotal = new ArrayList<>();
        totalPrice = 0.0;
        shippingAddress = "";
        paymentMethod = "";
        paymentStatus = "";
    }

    public Order(String orderID, String userName, String orderDate, List<String> itemsName,
            List<String> quantity, List<String> subtotal, double totalPrice, String shippingAddress,
            String paymentMethod,
            String paymentStatus) {
        this.orderID = orderID;
        this.userName = userName;
        this.orderDate = orderDate;
        this.itemsName = itemsName;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.totalPrice = totalPrice;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
    }

    // Getters and Setters
    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserId(String userId) {
        this.userName = userId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public List<String> getItemsName() {
        return itemsName;
    }

    public void setItemsName(List<String> itemsName) {
        this.itemsName = itemsName;
    }

    public List<String> getQuantity() {
        return quantity;
    }

    public void setQuantity(List<String> quantity) {
        this.quantity = quantity;
    }

    public List<String> getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(List<String> subtotal) {
        this.subtotal = subtotal;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void calculateTotalPrice() {
        totalPrice = 0;
        for (String price : subtotal) {
            totalPrice += Double.parseDouble(price);
        }
        totalPrice = 1.10 * totalPrice;
    }

    public boolean checkOut(String userName, List<Product> products, String orderDate, String shippingAddress,
            String paymentMethod, String paymentStatus) {
        // List<String[]> productDataList = new ArrayList<>(); // To store product data
        // from files
        List<String> productNames = new ArrayList<>();
        List<String> productQuantity = new ArrayList<>();
        List<String> productSubtotal = new ArrayList<>();
        List<String> productFiles = Arrays.asList("GUITAR.csv", "BASS.csv", "ACCESSORIES.csv", "DEALS.csv", "DRUM.csv",
                "KEYBOARD.csv", "NEWARRIVALS.csv", "TOPSELLER.csv");

        // Map cartItems to product details
        for (Product cartItem : products) {
            String productId = cartItem.getid();
            String quantity = cartItem.getQuantity();
            String subtotal = cartItem.getPrice();

            // Read product data from files to find matching product names
            for (String filename : productFiles) {
                try (BufferedReader br = new BufferedReader(
                        new FileReader("../backend/src/main/resources/" + filename))) {
                    String line;
                    boolean isFirstLine = true;
                    while ((line = br.readLine()) != null) {
                        if (isFirstLine) {
                            isFirstLine = false; // Skip header
                            continue;
                        }

                        // System.out.println(subtotal);
                        String[] productData = line.split(","); // Assuming CSV columns are id,name,price,etc.
                        // System.out.println(productData[0]);
                        // System.out.println(productId);
                        if (productData[0].trim().equals(productId)) {
                            productNames.add(productData[1]); // Add product name
                            productQuantity.add(quantity);
                            productSubtotal.add(subtotal);
                            break;
                        }
                        // else
                        // System.out.println("Product not found");
                    }
                } catch (IOException e) {
                    System.err.println("Error reading file: " + e.getMessage());
                    return false; // Handle file read error
                }
            }
        }

        // Create Order and Payment objects
        // Order order = new Order();
        // Payment payment = new Payment();

        this.userName = userName;
        this.orderDate = orderDate;
        this.itemsName = productNames;
        this.quantity = productQuantity;
        this.subtotal = productSubtotal;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        calculateTotalPrice();

        System.out.println(shippingAddress);

        // order.setUserId(userId);
        // order.setOrderDate(orderDate);
        // order.setItemsName(productNames);
        // order.setQuantity(productQuantity);
        // order.setSubtotal(productSubtotal);
        // order.calculateTotalPrice();
        // order.setShippingAddress(shippingAddress);
        // payment.setPaymentMethod(paymentMethod);
        // payment.setPaymentStatus(paymentStatus);

        append();

        // Process and save order
        System.out.println("Order placed successfully for userName: " + userName);
        return true;
    }

    public void append() {
        String csvFile = "ORDER.csv";
        List<String[]> orders = new ArrayList<>(); // Store the rows of orders
        int newOrderIdNum = 1; // Default starting ID

        // Read existing orders from CSV file
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/" + csvFile))) {
            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] orderData = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"); // Handle commas inside quotes
                orders.add(orderData);

                // Determine the highest OrderID in the file
                String orderID = orderData[0].trim();
                if (orderID.startsWith("OR")) {
                    int currentIdNum = Integer.parseInt(orderID.substring(2)); // Extract numeric part after "OR"
                    newOrderIdNum = Math.max(newOrderIdNum, currentIdNum + 1);
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("CSV file not found. A new file will be created.");
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        // Create the new order record
        String newOrderId = String.format("OR%03d", newOrderIdNum); // Format as OR001, OR002, etc.
        String[] newOrder = {
                newOrderId,
                userName,
                "\"" + orderDate + "\"",
                "\"" + String.join("; ", itemsName) + "\"", // Join items with semicolon and wrap in quotes
                "\"" + String.join(";", quantity) + "\"", // Join quantities with semicolon and wrap in quotes
                "\"" + String.join(";", subtotal) + "\"", // Join subtotals with semicolon and wrap in quotes
                String.format("%.2f", totalPrice), // Format total price as 2 decimal places
                "\"" + shippingAddress + "\"", // Wrap in quotes
                "\"" + paymentMethod + "\"", // Wrap in quotes
                "\"" + paymentStatus + "\"" // Wrap in quotes
        };
        orders.add(newOrder);

        // Write updated order list back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/" + csvFile))) {
            if (new File("../backend/src/main/resources/" + csvFile).length() == 0) {
                bw.write(
                        "OrderID,UserID,OrderDate,ItemsName,Quantity,Subtotal,TotalPrice,ShippingAddress,PaymentMethod,PaymentStatus\n"); // Write
                                                                                                                                          // header
            }
            for (String[] order : orders) {
                bw.write(String.join(",", order));
                bw.newLine();
            }
            System.out.println("Order successfully added with ID: " + newOrderId);
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
    }

    public static Order getOrder(String csvFile) {

        InputStream inputStream = Product.class.getClassLoader().getResourceAsStream(csvFile);
        if (inputStream == null) {
            System.err.println("File not found in resources");
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                CSVReader csvReader = new CSVReader(br)) {
            List<String[]> allRows = csvReader.readAll();// Read all rows

            String[] orderData = allRows.get(allRows.size() - 1);

            return new Order(orderData[0], orderData[1], orderData[2],
                    Arrays.asList(orderData[3].split(";")), Arrays.asList(orderData[4].split(";")),
                    Arrays.asList(orderData[5].split(";")), Double.parseDouble(orderData[6]),
                    orderData[7], orderData[8], orderData[9]);

        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            return null;
        } catch (CsvException e) {
            System.err.println("Error parsing CSV file: " + e.getMessage());
            return null;
        }
    }

}
