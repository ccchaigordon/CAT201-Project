package com.pyhs;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Products {
    static class Product {
        public String name;
        public double price;
        public int ratings;

        public Product(String name, double price, int ratings) {
            this.name = name;
            this.price = price;
            this.ratings = ratings;
        }
    }

    public static String readProductsToJson() {
        List<Product> products = new ArrayList<>();
        String line;

        try (BufferedReader br = new BufferedReader(new FileReader("backend/src/main/resources/products.csv"))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 3) {
                    Product product = new Product(data[0].trim(), Double.parseDouble(data[1].trim()),
                            Integer.parseInt(data[2].trim()));
                    products.add(product);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(products);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
