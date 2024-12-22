package com.pyhs;

public class Main {
    public static void main(String[] args) {
        String jsonOutput = Products.readProductsToJson();
        if (jsonOutput != null) {
            System.out.println(jsonOutput);
        } else {
            System.out.println("No products found or error in generating JSON.");
        }
    }
}
