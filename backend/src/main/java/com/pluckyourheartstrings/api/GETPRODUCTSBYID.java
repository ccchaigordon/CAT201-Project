package com.pluckyourheartstrings.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pluckyourheartstrings.models.Product;

@WebServlet("/getProductsById")
public class GETPRODUCTSBYID extends HttpServlet {
    @Override
    public void init() throws ServletException {
        System.out.println("GETPRODUCTSBYID servlet has started.");
    }

    @Override
    public void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        // response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String guitar_csvfile = "GUITAR.csv", bass_csvfile = "BASS.csv", drum_csvfile = "DRUM.csv",
                keyboard_csvfile = "KEYBOARD.csv", accessories_csvfile = "ACCESSORIES.csv";
        String id = request.getParameter("productID");
        System.out.println("ID: " + id);

        if (id == null || id.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
            response.getWriter().write("{\"error\": \"ID parameter is missing or empty.\"}");
            return;
        }

        Product product = Product.getProductByID(id, guitar_csvfile, bass_csvfile, drum_csvfile, keyboard_csvfile,
                accessories_csvfile);
        
        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> responseMap = new HashMap<>();            
            
        if(product == null) {
            System.out.println("Product not found");
            responseMap.put("status", false);
            responseMap.put("message", "Product not found");
            
        }
        else{
            System.out.println("Product ID entered: "+ product.getid());
            System.out.println("Product Name: " + product.getName());
            System.out.println("Product brand: " + product.getBrand());
            responseMap.put("status", true);
            responseMap.put("message", "Product found");
            responseMap.put("product", product); 
        }
        
        String jsonResponse = new Gson().toJson(responseMap);
        response.getWriter().write(jsonResponse);

        //JsonObject jsonResponse2 = new JsonObject();

        // response.setContentType("application/json");
        // response.setCharacterEncoding("UTF-8");

        // Check if the product is null
        // Product not found check removed as it is unnecessary
        // if(product == null) {
        //     jsonResponse2.addProperty("status", "not found");
        // }
        // else{
        //     System.out.println("Product: " + product.getid());
        //     System.out.println("Name: " + product.getName());

        //     System.out.println("Product found.");
        // // Convert the product to JSON and send it to the frontend
        //     JsonObject jsonResponse = new JsonObject();
        //     jsonResponse.addProperty("id", product.getid());
        //     jsonResponse.addProperty("name", product.getName());
        //     jsonResponse.addProperty("category", product.getCategory());
        //     jsonResponse.addProperty("brand", product.getBrand());
        //     jsonResponse.addProperty("description", product.getDescription());
        //     jsonResponse.addProperty("price", product.getPrice());
        //     jsonResponse.addProperty("rating", product.getRating());
        //     jsonResponse.addProperty("quantity", product.getQuantity());
        //     jsonResponse.addProperty("imgSrc", product.getImgSrc());
        //     jsonResponse.addProperty("specs", product.getspecs());
        //     jsonResponse2.addProperty("product", jsonResponse.toString());
        //     jsonResponse2.addProperty("status", "found");
        // }
        

        // response.getWriter().write(new Gson().toJson(jsonResponse2));
        // // response.getWriter().flush();

    }
}
