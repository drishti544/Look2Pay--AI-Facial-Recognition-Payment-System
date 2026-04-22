function verifyOTP() {
    let otp = document.getElementById("otp").value;

    if (otp !== "1234") {
        alert("Invalid OTP");
        return;
    }

    let amount = parseInt(
        localStorage.getItem("pendingAmount")
    );

    let merchant =
        localStorage.getItem("pendingMerchant");

    let transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    transactions.push({
        merchant: merchant,
        amount: amount,
        status: "Success (OTP Verified)",
        date: new Date().toISOString()
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    localStorage.removeItem("pendingAmount");
    localStorage.removeItem("pendingMerchant");

    alert("OTP Verified Successfully!");

    window.location.href = "./transaction.html";
}