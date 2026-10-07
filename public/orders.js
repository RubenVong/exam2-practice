async function orderListController() {
    let response = await fetch('http://localhost:3000/api/orders');
    let orders = await response.json();
    orderListView(orders.data);
    return orders;
}

function orderListView(orders) {
    let table = document.getElementById("orderTable");
    let view = `<thead><tr><th>order ID</th>` +
        `<th>Item Name</th>` +
        `<th>Quantity</th>` +
        `<th>Item Cost</th>` +
        `<th>Date Created</th></tr></thead>`;

    orders.forEach(order => {
        view = view + `<tr><td>${order['orderID']}</td>` +
            `<td>${order['orderDesc']}</td>` +
            `<td>${order['quantity']}</td>` +
            `<td>${order['unitCost']}</td>` +
            `<td>${order['created']}</td></tr>`;
    });

    table.innerHTML = view;
}

const orderForm = document.getElementById('orderForm');

orderListController();

orderForm.addEventListener('submit', async (e) => { e.preventDefault();
    const orderDesc = document.getElementById('orderDesc').value;
    const quantity = document.getElementById('quantity').value;
    const unitCost = document.getElementById('unitCost').value;

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({orderDesc, quantity, unitCost})
        });
        
        // Show the success or error message from the backend
        alert("Order has been Submitted!");
        orderForm.reset();
        orderListController();
    } catch (error) {
        console.error('Error:', error);
    }
});