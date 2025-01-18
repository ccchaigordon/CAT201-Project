import React, { useEffect, useState } from "react";
import NavBar from "../global/NavBar";
import Footer from "../global/Footer";

type InvoiceItem = {
    name: string;
    quantity: number;
    subtotal: number;
  };
  
type InvoiceData = {
    orderID: string;
    userName: string;
    orderDate: string;
    items: InvoiceItem[];
    totalPrice: number;
    shippingAddress: string;
    paymentMethod: string;
    paymentStatus: string;
};


const Invoice: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the JSON file from the backend.
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8083/backend/getInvoice");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Transform the JSON data to fit the type definitions
        const transformedData: InvoiceData = {
          orderID: jsonData.orderID,
          userName: jsonData.userName,
          orderDate: jsonData.orderDate,
          items: jsonData.itemsName.map((name: string, index: number) => ({
            name,
            quantity: parseFloat(jsonData.quantity[index]),
            subtotal: parseFloat(jsonData.subtotal[index]),
          })),
          totalPrice: jsonData.totalPrice,
          shippingAddress: jsonData.shippingAddress,
          paymentMethod: jsonData.paymentMethod,
          paymentStatus: jsonData.paymentStatus,
        };

        setInvoice(transformedData);
      } catch (err) {
        setError("Failed to fetch invoice data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div> <NavBar />
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>Invoice</h1>
      <hr />
      <div style={{ marginBottom: "1rem" }}>
        <p><strong>Order ID:</strong> {invoice?.orderID}</p>
        <p><strong>Customer Name:</strong> {invoice?.userName}</p>
        <p><strong>Order Date:</strong> {invoice?.orderDate}</p>
        <p><strong>Payment Method:</strong> {invoice?.paymentMethod}</p>
        <p><strong>Payment Status:</strong> {invoice?.paymentStatus}</p>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ddd", padding: "0.5rem", textAlign: "left" }}>Item Name</th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "0.5rem", textAlign: "right" }}>Quantity</th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "0.5rem", textAlign: "right" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoice?.items.map((item, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}>{item.name}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem", textAlign: "right" }}>{item.quantity}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: "0.5rem", textAlign: "right" }}>RM {item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <h3>Total: RM {invoice?.totalPrice.toFixed(2)}</h3>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h3>Shipping Address</h3>
        <p>{invoice?.shippingAddress}</p>
      </div>
    </div>
    </div>
  );
};

export default Invoice;
