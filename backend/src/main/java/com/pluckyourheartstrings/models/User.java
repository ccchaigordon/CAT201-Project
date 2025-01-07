package com.pluckyourheartstrings.models;

import java.io.*;
import java.util.*;

public class User {
    private String userID;
    private String name;
    private String email;
    private String password;
    private String address;
    private String phoneNum;

    //constructor
    public User(){
        this.userID = " ";
        this.name = " ";
        this.email = " ";
        this.password = " ";
        this.address = " ";
        this.phoneNum = " ";
    }

    public void setid(String id) { this.userID = id; }
    public void setpw(String pw) { this.password = pw; }
    public void setname(String name) { this.name = name; }
    public void setemail(String email) { this.email = email; }
    public void setaddress(String address) { this.address = address; }
    public void setphonenum(String phonenum) { this.password = phonenum; }

    //register
    public boolean register(String name, String email, String pw, String address, String phoneNum) {
        //String csvFile = "USER.csv";
        List<String[]> users = new ArrayList<>(); // Create an ArrayList to store the row of users
        int newUserIdNum = 1; // Default starting ID

        // Read existing users from CSV file
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/USER.csv"))) {
            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }           
            
                String[] userData = line.split(",");
                users.add(userData);

                // Determine the highest userID in the file
                String userID = userData[0].trim();
                if (userID.startsWith("C")) {
                    int currentIdNum = Integer.parseInt(userID.substring(1)); // Extract numeric part
                    newUserIdNum = Math.max(newUserIdNum, currentIdNum + 1);
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("CSV file not found. A new file will be created.");
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        // Create the new user record
        String newUserId = String.format("C%03d", newUserIdNum); // Format as C001, C002, etc.
        String[] newUser = {newUserId, name, email, pw, address, phoneNum};
        users.add(newUser);

        // Write updated user list back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/USER.csv"))) {
            if (new File("../backend/src/main/resources/USER.csv").length() == 0) {
                bw.write("ID,Name,Email,Password,Address,PhoneNumber\n"); // Write header
            }
            for (String[] user : users) {
                bw.write(String.join(",", user));
                bw.newLine();
            }
            System.out.println("User registered successfully with ID: " + newUserId);
            return true;
        } catch (IOException e) {
            System.err.println("Error writing to CSV file: " + e.getMessage());
            return false;
        }
    }

    //login
    public boolean login(String userID, String pw){
        String csvFile = "USER.csv";

        // Read existing users from CSV file
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/USER.csv"))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                } 

                String[] userData = line.split(",");
                
                // Check if userID is in the file
                String ID = userData[0].trim();
                String PW = userData[3].trim();
                if(userID.equals(ID) && pw.equals(PW)){
                    return true;
                }
            }

            return false;

        } catch (FileNotFoundException e) {
            System.out.println("CSV file not found. A new file will be created.");
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }
        return false;
    }

    //logout
    public boolean logout(String userID){
        if(userID == null)
            return true;
        else
            return false;
    }

    //update profile
    public void updateProfile(String userID, String newName, String newEmail, String newPassword, String newAddress, String newPhoneNum){
        String csvFile = "USER.csv";
        List<String[]> users = new ArrayList<>(); // List to store user data
        boolean isFirstLine = true;
        boolean userFound = false;
    
        // Read existing users from CSV file
        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String line;         

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] userData = line.split(",");
                 
                if (userData[0].trim().equals(userID)) {
                    // Update the user details
                    userData[1] = newName;        // Update name
                    userData[2] = newEmail;       // Update email
                    userData[3] = newPassword;    // Update password
                    userData[4] = newAddress;     // Update address
                    userData[5] = newPhoneNum;    // Update phone number
                    userFound = true;
                }
                users.add(userData); // Add the user to the list
            }
        } catch (FileNotFoundException e) {
            System.out.println("CSV file not found.");
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        if (userFound) {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(csvFile))) {
                if (new File(csvFile).length() == 0) {
                    bw.write("ID,Name,Email,Password,Address,PhoneNumber\n"); // Write header
                }
                for (String[] user : users) {
                    bw.write(String.join(",", user)); // Write user data
                    bw.newLine();
                }
                System.out.println("Profile updated successfully for user ID: " + userID);
            } catch (IOException e) {
                System.err.println("Error writing to CSV file: " + e.getMessage());
            }
        } else {
            System.out.println("User ID not found. Profile update failed.");
        }
    }    
}

