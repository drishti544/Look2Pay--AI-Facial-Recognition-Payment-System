// Home redirect
function clickHomeBtn() {
    window.location.href = "../index.html";
}

// Check face verification
let faceVerified = sessionStorage.getItem("faceVerified");

if (faceVerified === "false") {
    document.getElementById("payment-status").innerHTML =
        "<h3 style='color:red'>Face Verification Failed. Payment Denied.</h3>";
}

// Main payment function
function processPayment() {
    let merchant =
        document.getElementById("merchant").value;

    let amount = parseInt(
        document.getElementById("amount").value
    );

    if (!merchant || !amount) {
        alert("Please fill all fields");
        return;
    }

    // Get previous transactions
    let transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    let today = new Date().toLocaleDateString();

    let todayTotal = 0;

    transactions.forEach((transaction) => {
        let transactionDate =
            new Date(
                transaction.date
            ).toLocaleDateString();

        if (transactionDate === today) {
            todayTotal += transaction.amount;
        }
    });

    let totalAfterPayment = todayTotal + amount;

    // Fraud detection
    if (amount > 50000) {
        alert(
            "Fraud Alert: High transaction detected!"
        );
        return;
    }

    // OTP condition
    if (totalAfterPayment > 6000) {
        localStorage.setItem(
            "pendingAmount",
            amount
        );

        localStorage.setItem(
            "pendingMerchant",
            merchant
        );

        alert(
            "Daily transaction exceeded ₹6000. OTP verification required."
        );

        window.location.href = "otp.html";
        return;
    }

    saveTransaction(
        merchant,
        amount,
        "Success"
    );
}

// Save transaction
function saveTransaction(
    merchant,
    amount,
    status
) {
    let transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

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

    document.getElementById(
        "payment-status"
    ).innerHTML =
        "<h3 style='color:green'>Payment Successful!</h3>";
}