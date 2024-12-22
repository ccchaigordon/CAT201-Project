package com.pyhs;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class ProductServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        // Just an example to serve JSON directly
        out.println("[{\"name\": \"Fender Player II Series\", \"price\": 4599, \"ratings\": 5}]");
        out.flush();
    }
}
