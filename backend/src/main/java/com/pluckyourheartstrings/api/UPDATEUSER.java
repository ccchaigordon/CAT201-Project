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
import com.pluckyourheartstrings.models.User;

@WebServlet("/updateUser")
public class UPDATEUSER extends HttpServlet {
    // private static final long serialVersionUID = 1L;

    @Override
    public void init() throws ServletException {
        System.out.println("UPDATEUSER servlet has started.");
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

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        // // Parse the incoming request to get the updated product details
        // BufferedReader reader = request.getReader();
        // Gson gson = new Gson();
        // Product updatedProduct = gson.fromJson(reader, Product.class);

        // Update the product in the CSV file
        String user_csv = "USER.csv";

        // String category = request.getParameter("category"); // Get the type from
        // frontend (e.g., "guitars")
        // String action = request.getParameter("action"); // Get the action from
        // frontend (e.g., "update")

        // if(category == null) {
        // System.out.println("Category parameter missing");
        // response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Category parameter is
        // missing.");
        // return;
        // }

        // if(action == null) {
        // System.out.println("Action parameter missing");
        // response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Action parameter is
        // missing.");
        // return;
        // }

        // Determine which CSV file to update based on the product category
        // String csvFile = null;
        // switch (category) {
        // case "Guitar":
        // csvFile = guitar_csv;
        // break;
        // case "Bass":
        // csvFile = bass_csv;
        // break;
        // case "Drum":
        // csvFile = drum_csv;
        // break;
        // case "Keyboard":
        // csvFile = keyboard_csv;
        // break;
        // case "Accessories":
        // csvFile = accessories_csv;
        // break;
        // default:
        // response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
        // response.getWriter().write("{\"error\": \"Invalid product category.\"}");
        // return;
        // }

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
        Map<String, String> requestMap = gson.fromJson(requestBody, new TypeToken<Map<String, String>>() {
        }.getType());
        Map<String, Object> responseMap = new HashMap<>();

        String id = requestMap.get("id");
        // System.out.println("ID: " + id);
        String name = requestMap.get("name");
        String email = requestMap.get("email");
        String password = requestMap.get("password");
        String address = requestMap.get("address");
        String phoneNum = requestMap.get("phoneNum");

        boolean userFound = User.updateProfile(id, name, email, password, address, phoneNum);

        if (userFound) {
            System.out.println("User updated successfully.");
        }

        responseMap.put("status", userFound);

        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Map<String, Object> responseMap = new HashMap<>();
        // responseMap.put("status", "success");
        // responseMap.put("message", "Product updated successfully.");
        // response.setStatus(HttpServletResponse.SC_OK); // 200 OK
        // response.getWriter().write(new Gson().toJson(responseMap));
        String jsonResponse = gson.toJson(responseMap);
        response.getWriter().write(jsonResponse);

    }
}
