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

@WebServlet("/user")
public class USER_SERVLET extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String category = request.getParameter("category"); // Get the type from frontend (e.g., "login")
        // String userId = request.getParameter("userId"); // Get the userId from frontend
        // String password = request.getParameter("password"); // Get the password from frontend

        Gson gson = new Gson();

        if (category == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameter: category");
            return;
        }        

        Map<String, Object> responseMap = new HashMap<>();

        //for login
        if(category.equals("login")) {
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

            String userEmail = requestMap.get("userEmail");
            String password = requestMap.get("password");

            if (userEmail == null) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameter: userEmail");
                return;
            }
            if (password == null) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameter: password");
                return;
            }

            boolean isAuthenticated = false;

            User users = new User();
            users.setemail(userEmail);
            users.setpw(password);

            String[] userDetails = users.login(userEmail, password);

            if(userDetails != null) {
                responseMap.put("userId", userDetails[0]);
                responseMap.put("role", userDetails[1]);
                isAuthenticated = true;
            }
            
            //Prepare the response JSON            
            responseMap.put("success", isAuthenticated);
        }
        else if(category.equals("signup")) {
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

            String name = requestMap.get("name");
            String email = requestMap.get("email");
            String password = requestMap.get("password");
            String address = requestMap.get("address");
            String phoneNum = requestMap.get("phoneNum");
            String role = requestMap.get("role");

            // if (userId == null) {
            //     response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameter: userId");
            //     return;
            // }
            // if (password == null) {
            //     response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameter: password");
            //     return;
            // }

            User users = new User();
            users.setname(name);
            users.setemail(email);
            users.setpw(password);
            users.setaddress(address);
            users.setphonenum(phoneNum);
            users.setrole(role);

            boolean isAuthenticated = users.register(name, email, password, address, phoneNum, role);

            //Prepare the response JSON            
            responseMap.put("success", isAuthenticated);
        }
        else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid category");
        }               

        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Convert the list to JSON and send it to the frontend
        //Gson gson = new Gson();
        String json = gson.toJson(responseMap);
        response.getWriter().write(json);

        // System.out.println("Received POST request at /user");
        // response.setStatus(HttpServletResponse.SC_OK);
        // response.getWriter().write("POST request received");
    }
}
