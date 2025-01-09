package com.pluckyourheartstrings.models;

public class Test {
    public static void main(String[] args) throws Exception {
        User user = new User();
        // Example of registering a new user
        user.register("John Doe", "johndoe@example.com", "password666", "123 Main St", "1234567890");

        /*String id = "C001";
        String pw = "newPassword";

        if(user.login(id, pw)){
            System.out.println("Yeahhh");
        }
        else{
            System.out.println("No record found");
        }*/

        /*if(user.logout(id)){
            System.out.println("Log out successfully!");
        }
        else{
            System.out.println("Log out fail!");
        }*/

        //user.updateProfile("C001", "New Name", "newemail@example.com", "newPassword", "New Address", "1234567890");

        Cart cart = new Cart();

        //cart.addToCart("PRSG-001", "C003", "3", "1233");

        // List<String> productIds = new ArrayList<>();
        // productIds.add("FNDG-001");
        // productIds.add("FNDG-003");

        // cart.checkOut("C001", productIds);  
        

    }

    
}
