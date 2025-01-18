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
import com.pluckyourheartstrings.models.User;

@WebServlet("/getUserById")
public class GETUSERBYID extends HttpServlet {
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

        String user_csvfile = "USER.csv";
        String userID = request.getParameter("userID");
        System.out.println("ID: " + userID);

        if (userID == null || userID.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
            response.getWriter().write("{\"error\": \"ID parameter is missing or empty.\"}");
            return;
        }

        User user = User.getUserByID(userID, user_csvfile);
        
        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> responseMap = new HashMap<>();            
            
        if(user == null) {
            System.out.println("User not found");
            responseMap.put("status", "false");
            responseMap.put("message", "User not found");
            
        }
        else{
            System.out.println("User ID entered: "+ user.getid());
            System.out.println("User Name: " + user.getname());
            System.out.println("User Email: " + user.getemail());
            System.out.println("User Password: " + user.getpw());
            System.out.println("User Address: " + user.getaddress());
            System.out.println("User Phone Number: " + user.getphonenum());
            responseMap.put("status", "true");
            responseMap.put("message", "User found");
            responseMap.put("user", user); 
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
