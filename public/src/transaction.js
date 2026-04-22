let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

let table = document.getElementById("table");

transactions.forEach((t) => {
    let row = table.insertRow();

    row.insertCell(0).innerText = t.merchant;
    row.insertCell(1).innerText = "₹" + t.amount;
    row.insertCell(2).innerText = t.status;
    row.insertCell(3).innerText = new Date(
        t.date
    ).toLocaleString();
});