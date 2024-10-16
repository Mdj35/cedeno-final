import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            try {
                const response = await axios.get('http://localhost:5000/user/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data); // Set fetched orders to state
            } catch (err) {
                setError(err.response ? err.response.data : 'Error fetching orders');
            }
        };

        fetchOrders();
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Your Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total_price}</td>
                            <td>{order.order_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;

