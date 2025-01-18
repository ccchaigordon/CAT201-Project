package com.pluckyourheartstrings.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.pluckyourheartstrings.models.Product;
import java.lang.reflect.Type;
import com.pluckyourheartstrings.models.Order;

@WebServlet("/checkout")
public class CHECKOUT extends HttpServlet {
    // private static final long serialVersionUID = 1L;

    @Override
    public void init() throws ServletException {
        System.out.println("CHECKOUT servlet has started.");
    }

    @Override
    public void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            response.setHeader("Access-Control-Allow-Credentials", "true");

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
            // Log the incoming request body
            System.out.println("Request Body: " + requestBody);

            // Convert JSON to a map using Gson
            // Convert the JSON to a Map<String, Object> to support various data types
            Map<String, Object> requestMap = gson.fromJson(requestBody, new TypeToken<Map<String, Object>>() {}.getType());
            Map<String, Object> responseMap = new HashMap<>();

            // Extract fields that are strings
            String userName = (String) requestMap.get("fullName");
            String orderDate = (String) requestMap.get("orderDate");
            String address = (String) requestMap.get("address");
            String country = (String) requestMap.get("country");
            String city = (String) requestMap.get("city");
            String postCode = (String) requestMap.get("postcode"); // corrected field name
            String paymentMethod = (String) requestMap.get("paymentMethod");
            String paymentStatus = (String) requestMap.get("paymentStatus");

            // Extract cartItems as a list of Product objects
            Type productListType = new TypeToken<List<Product>>() {}.getType();
            List<Product> cartItems = gson.fromJson(gson.toJson(requestMap.get("cartItems")), productListType);

            // Combine shipping address components
            String shippingAddress = address + ", " + country + ", " + city + ", " + postCode;
            //System.out.println("Shipping Address: " + shippingAddress);

            Order order = new Order();
            boolean checkoutSuccess = order.checkOut(userName, cartItems, orderDate, shippingAddress, paymentMethod, paymentStatus);

            System.out.println("checkoutSuccess: " + checkoutSuccess);

            if(checkoutSuccess) {
                System.out.println("Checked out successfully.");
            }

            responseMap.put("status", checkoutSuccess);

            


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

        } catch (JsonSyntaxException e) {
            // Handle invalid JSON format
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Invalid JSON format: " + e.getMessage());
        } catch (Exception e) {
            // Catch any other exceptions and return a 500 error
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Internal server error: " + e.getMessage());
        }
        
    }

}
