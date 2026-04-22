function makePayment() {
    let merchant = document.getElementById("merchant").value;
    let amount = parseInt(document.getElementById("amount").value);

    let paymentStatus = document.getElementById("payment-status");

    let faceVerified = sessionStorage.getItem("faceVerified");

    if (faceVerified === "false") {
        paymentStatus.innerHTML =
            "<h3 style='color:red'>Face Verification Failed. Payment Denied.</h3>";
        return;
    }

    if (!merchant || !amount) {
        alert("Please fill all fields");
        return;
    }

    // Fraud Detection
    if (amount > 50000) {
        alert("Fraud Alert: High transaction detected.");
        return;
    }

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    let today = new Date().toLocaleDateString();

    let todayTotal = 0;

    transactions.forEach((transaction) => {
        let transactionDate =
            new Date(transaction.date).toLocaleDateString();

        if (transactionDate === today) {
            todayTotal += transaction.amount;
        }
    });

    let totalAfterPayment = todayTotal + amount;

    // OTP trigger
    if (totalAfterPayment > 6000) {
        localStorage.setItem("pendingAmount", amount);
        localStorage.setItem("pendingMerchant", merchant);

        alert(
            "Daily transaction exceeded ₹6000. OTP verification required."
        );

        window.location.href = "./otp.html";
        return;
    }

    saveTransaction(merchant, amount, "Success");
}

function saveTransaction(merchant, amount, status) {
    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push({
        merchant: merchant,
        amount: amount,
        status: status,
        date: new Date().toISOString()
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    document.getElementById("payment-status").innerHTML =
        "<h3 style='color:green'>Payment Successful!</h3>";

    setTimeout(() => {
        window.location.href = "./transaction.html";
    }, 2000);
}