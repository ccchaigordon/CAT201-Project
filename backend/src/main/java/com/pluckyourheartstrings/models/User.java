package com.pluckyourheartstrings.models;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

public class User {
    private String userID;
    private String name;
    private String email;
    private String password;
    private String address;
    private String phoneNum;
    private String role;

    // constructor
    public User() {
        this.userID = " ";
        this.name = " ";
        this.email = " ";
        this.password = " ";
        this.address = " ";
        this.phoneNum = " ";
        this.role = " ";
    }

    public User(String id, String name, String email, String pw, String address, String phoneNum, String role) {
        this.userID = id;
        this.name = name;
        this.email = email;
        this.password = pw;
        this.address = address;
        this.phoneNum = phoneNum;
        this.role = role;
    }

    public void setid(String id) {
        this.userID = id;
    }

    public void setpw(String pw) {
        this.password = pw;
    }

    public void setname(String name) {
        this.name = name;
    }

    public void setemail(String email) {
        this.email = email;
    }

    public void setaddress(String address) {
        this.address = address;
    }

    public void setphonenum(String phonenum) {
        this.phoneNum = phonenum;
    }

    public void setrole(String role) {
        this.role = role;
    }

    // getter
    public String getid() {
        return this.userID;
    }

    public String getpw() {
        return this.password;
    }

    public String getname() {
        return this.name;
    }

    public String getemail() {
        return this.email;
    }

    public String getaddress() {
        return this.address;
    }

    public String getphonenum() {
        return this.phoneNum;
    }

    public String getrole() {
        return this.role;
    }

    // register
    public boolean register(String name, String email, String pw, String address, String phoneNum, String role) {
        {
            // String csvFile = "USER.csv";
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
            String[] newUser = { newUserId, name, email, pw, address, phoneNum, role };
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
    }

    // login
    public String[] login(String userEmail, String pw) {
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
                String email = userData[2].trim();
                String PW = userData[3].trim();
                if (userEmail.equals(email) && pw.equals(PW)) {
                    return new String[] { userData[0], userData[1], userData[2], userData[3], userData[4], userData[5], userData[6]};
                }
            }

            return null;

        } catch (FileNotFoundException e) {
            System.out.println("CSV file not found. A new file will be created.");
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }
        return null;
    }

    // logout
    public boolean logout(String userID) {
        if (userID == null)
            return true;
        else
            return false;
    }

    // update profile
    public static boolean updateProfile(String userID, String newName, String newEmail, String newPassword,
            String newAddress, String newPhoneNum) {
        String csvFile = "USER.csv";
        List<String[]> users = new ArrayList<>(); // List to store user data
        boolean isFirstLine = true;
        boolean userFound = false;

        // Read existing users from CSV file
        try (BufferedReader br = new BufferedReader(new FileReader("../backend/src/main/resources/" + csvFile))) {
            String line;

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] userData = line.split(",");

                if (userData[0].trim().equals(userID)) {
                    // Update the user details
                    userData[1] = newName; // Update name
                    userData[2] = newEmail; // Update email
                    userData[3] = newPassword; // Update password
                    userData[4] = newAddress; // Update address
                    userData[5] = newPhoneNum; // Update phone number
                    userFound = true;
                }
                users.add(userData); // Add the user to the list
            }
        } catch (FileNotFoundException e) {
            System.out.println("CSV file not found.");
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        System.out.println("User found: " + userFound);
        System.out.println("User ID: " + userID);

        if (userFound) {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter("../backend/src/main/resources/" + csvFile))) {
                if (new File(csvFile).length() == 0) {
                    bw.write("ID,Name,Email,Password,Address,PhoneNumber\n"); // Write header
                }
                for (String[] user : users) {
                    bw.write(String.join(",", user)); // Write user data
                    bw.newLine();
                }
                System.out.println("Profile updated successfully for user ID: " + userID);
                return true;
            } catch (IOException e) {
                System.err.println("Error writing to CSV file: " + e.getMessage());
            }
        } else {
            System.out.println("User ID not found. Profile update failed.");
        }
        return false;
    }

    public static User getUserByID(String id, String csvFile) {
        System.out.println("csvFiles: " + csvFile);

        InputStream inputStream = Product.class.getClassLoader().getResourceAsStream(csvFile);
        if (inputStream == null) {
            System.err.println("File not found in resources");
            return null;
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                CSVReader csvReader = new CSVReader(br)) {
            List<String[]> allRows = csvReader.readAll();// Read all rows

            for (int i = 1; i < allRows.size(); i++) { // Skip the header
                String[] userData = allRows.get(i);
                if (userData[0].trim().equals(id)) {
                    return new User(userData[0], userData[1], userData[2], userData[3], userData[4], userData[5],
                            userData[6]);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            return null;
        } catch (CsvException e) {
            System.err.println("Error parsing CSV file: " + e.getMessage());
            return null;
        }

        return null;
    }

}
