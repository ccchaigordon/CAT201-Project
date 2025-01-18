package com.pluckyourheartstrings.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.pluckyourheartstrings.models.Product;

@WebServlet("/checkProductId")
public class CHECKPRODUCTID extends HttpServlet {
    //private static final long serialVersionUID = 1L;

    @Override
    public void init() throws ServletException {
        System.out.println("CHECKPRODUCTID servlet has started.");
    }

    @Override
    public void doOptions(HttpServletRequest request, HttpServletResponse
    response)
    throws ServletException, IOException {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // // Parse the incoming request to get the updated product details
        // BufferedReader reader = request.getReader();
        // Gson gson = new Gson();
        // Product updatedProduct = gson.fromJson(reader, Product.class);

        // Update the product in the CSV file
        String guitar_csv = "GUITAR.csv", bass_csv = "BASS.csv", drum_csv = "DRUM.csv", keyboard_csv = "KEYBOARD.csv",
                accessories_csv = "ACCESSORIES.csv";       

        Gson gson = new Gson();

        // Parse JSON body
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String requestBody = stringBuilder.toString();

        // Convert JSON to a map using Gson
        Map<String, String> requestMap = gson.fromJson(requestBody, new TypeToken<Map<String, String>>() {}.getType());
        Map<String, Object> responseMap = new HashMap<>();

        String id = requestMap.get("id");

        Product product = Product.getProductByID(id, guitar_csv, bass_csv, drum_csv, keyboard_csv, accessories_csv);
        boolean productFound = (product != null);

        if(productFound) {
            System.out.println("Product found.");
        }

        responseMap.put("status", productFound);      


        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

    //     Map<String, Object> responseMap = new HashMap<>();
    //     responseMap.put("status", "success");
    //     responseMap.put("message", "Product updated successfully.");
    //     response.setStatus(HttpServletResponse.SC_OK); // 200 OK
    //     response.getWriter().write(new Gson().toJson(responseMap));
        String jsonResponse = gson.toJson(responseMap);
        response.getWriter().write(jsonResponse);        
    }
}
