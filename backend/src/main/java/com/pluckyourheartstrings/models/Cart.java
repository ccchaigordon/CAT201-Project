package com.pluckyourheartstrings.models;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Cart {
    private String UserID;
    private String ProductID;
    private String Quantity;
    private String TotalPrice;

    public Cart() {
        this.UserID = "";
        this.ProductID = "";
        this.Quantity = "";
        this.TotalPrice = "";
    }

    public void addToCart(String ProductID, String UserID, String Quantity, String TotalPrice) {
        List<String[]> cart = new ArrayList<>();
    
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/CART.csv"))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Add header to the list
                    cart.add(line.split(","));
                    continue;
                }
                String[] cartData = line.split(",");
                
                cart.add(cartData);
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        String[] newItem = {UserID, ProductID, Quantity, TotalPrice};
        cart.add(newItem);

        // Write updated user list back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/CART.csv"))) {
            for (String[] item : cart) {
                bw.write(String.join(",", item));
                bw.newLine();
            }
            System.out.println("Item added successfully!");
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
    }

    public void updateItemQuantity(String ProductID, String UserID, String Quantity, String TotalPrice) {
        List<String[]> cart = new ArrayList<>();
    
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/CART.csv"))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Add header to the list
                    cart.add(line.split(","));
                    continue;
                }
                String[] cartData = line.split(",");

                if(cartData[0].trim().equals(UserID) && cartData[1].trim().equals(ProductID)) {
                    cartData[2] = Quantity;
                    cartData[3] = TotalPrice;
                }
                
                cart.add(cartData);
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        // Write updated user list back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/CART.csv"))) {
            for (String[] item : cart) {
                bw.write(String.join(",", item));
                bw.newLine();
            }
            System.out.println("Updated added successfully!");
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
        }
    }

    boolean removeItem(String ProductID, String UserID) {
        List<String[]> cart = new ArrayList<>();
    
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/CART.csv"))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Add header to the list
                    cart.add(line.split(","));
                    continue;
                }
                String[] cartData = line.split(",");

                if(cartData[0].trim().equals(UserID) && cartData[1].trim().equals(ProductID)){
                    continue;
                }
                
                cart.add(cartData);
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        // Write updated user list back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("CART.csv"))) {
            for (String[] item : cart) {
                bw.write(String.join(",", item));
                bw.newLine();
            }
            System.out.println("Item deleted successfully!");
            return true;
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
            return false;
        }
    }

    public boolean checkOut(String userId,List<String> productIds) {
        List<String[]> cart = new ArrayList<>();
    
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/CART.csv"))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Add header to the list
                    cart.add(line.split(","));
                    continue;
                }
                String[] cartData = line.split(",");
                
                if(userId.trim().equals(cartData[0]) && productIds.contains(cartData[1].trim()))
                    cart.add(cartData);
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            //System.out.println("Current working directory: " + new File(".").getAbsolutePath());

            return false;
        }

        // Process the cart (e.g., proceed with checkout logic)
        if (!cart.isEmpty()) {
            System.out.println("Products ready for checkout:");
            for (String[] item : cart) {
                System.out.println("UserId: " + item[0] + ", ProductId: " + item[1]);
            }
            return true; // Checkout successful
        } else {
            System.out.println("No matching products found for checkout.");
            return false; // No matching products found
        }        

        //removeItem(productId, userId);
    }



    


}

