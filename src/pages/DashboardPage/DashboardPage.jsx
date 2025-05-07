import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // 👈 Import Bar chart
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './DashboardPage.module.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/transactions/recent');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const lowStockProducts = products.filter(p => p.stockQuantity <= 5);
  const topCustomers = [...customers].sort((a, b) => b.rewardPoints - a.rewardPoints).slice(0, 5);

  // Chart data
  const barChartData = {
    labels: topCustomers.map(c => c.name),
    datasets: [
      {
        label: 'Reward Points',
        data: topCustomers.map(c => c.rewardPoints),
        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Nice blue color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Top Customers by Reward Points' }
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      <div className={styles.cards}>
        {/* Sales (Dummy) */}
        <div className={`${styles.card} ${styles.blueCard}`}>
          <h2>Sales Today</h2>
          <p>🚀 Coming soon - Live Sales Data</p>
        </div>

        {/* Low Stock */}
        <div className={`${styles.card} ${styles.redCard}`}>
          <h2>Low Stock Alerts</h2>
          {lowStockProducts.length > 0 ? (
            <ul>
              {lowStockProducts.map((item) => (
                <li key={item.id}>{item.name} (Stock: {item.stockQuantity})</li>
              ))}
            </ul>
          ) : (
            <p>All stock levels healthy ✅</p>
          )}
        </div>

        {/* Top Customers */}
        <div className={`${styles.card} ${styles.greenCard}`}>
          <h2>Top Customers</h2>
          {topCustomers.length > 0 ? (
            <ul>
              {topCustomers.map((cust) => (
                <li key={cust.id}>{cust.name} ({cust.rewardPoints} pts)</li>
              ))}
            </ul>
          ) : (
            <p>No customers yet 🧍‍♂️</p>
          )}
        </div>

        {/* Top Customers Chart */}
        <div className={`${styles.card} ${styles.chartCard}`}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        <div className={`${styles.card} ${styles.transactionsCard}`}>
            <h2>Recent Transactions</h2>
            {transactions.length > 0 ? (
                <table className={styles.table}>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Payment</th>
                    <th>Total ($)</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.slice(0, 5).map(tx => (
                    <tr key={tx.id}>
                        <td>{tx.id}</td>
                        <td>{tx.paymentMethod}</td>
                        <td>{tx.totalAmount.toFixed(2)}</td>
                        <td>{new Date(tx.createdAt).toLocaleString()}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p>No recent transactions found.</p>
            )}
            </div>
      </div>
    </div>
  );
};

export default DashboardPage;
