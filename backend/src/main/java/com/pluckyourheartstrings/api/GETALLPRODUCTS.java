package com.pluckyourheartstrings.api;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.pluckyourheartstrings.models.Product;

@WebServlet("/getAllProducts")
public class GETALLPRODUCTS extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        //String category = request.getParameter("category"); // Get the type from frontend (e.g., "guitars")
        String guitar_csvfile = "GUITAR.csv", bass_csvfile = "BASS.csv", drum_csvfile = "DRUM.csv", keyboard_csvfile = "KEYBOARD.csv", accessories_csvfile = "ACCESSORIES.csv";

        // if (category == null) {
        //     response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameter: type");
        //     return;
        // }

        // // Determine which CSV file to read
        // switch (category) {
        //     case "guitars":
        //         csvFile = "GUITAR.csv";
        //         break;
        //     case "bass":
        //         csvFile = "path/to/bass.csv";
        //         break;
        //     case "amplifiers":
        //         csvFile = "path/to/amplifiers.csv";
        //         break;
        //     default:
        //         response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid product type");
        //         return;
        // }

        // Use the Product class to read the CSV file
        
        List<Product> products = Product.readProductsFromCSV(guitar_csvfile, bass_csvfile, drum_csvfile, keyboard_csvfile, accessories_csvfile);

        // Set the response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Convert the list to JSON and send it to the frontend
        Gson gson = new Gson();
        String json = gson.toJson(products);
        response.getWriter().write(json);
    }
}
