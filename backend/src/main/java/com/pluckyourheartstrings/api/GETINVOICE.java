package com.pluckyourheartstrings.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pluckyourheartstrings.models.Order;

@WebServlet("/getInvoice")
public class GETINVOICE extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        //String category = request.getParameter("category"); // Get the type from frontend (e.g., "guitars")
        String order_csvfile = "ORDER.csv";
        
        Order order = Order.getOrder(order_csvfile);

        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Convert the list to JSON and send it to the frontend
        Gson gson = new Gson();
        String json = gson.toJson(order);
        response.getWriter().write(json);
    }
}
