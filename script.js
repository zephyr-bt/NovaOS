let balance = 5000;

function openModal() {
    document.getElementById('payment-sheet').style.display = 'flex';
}

function closeModal() {
    document.getElementById('payment-sheet').style.display = 'none';
}

function processPayment() {
    const amt = parseFloat(document.getElementById('amount').value);
    const user = document.getElementById('recipient').value;

    if (amt > 0 && amt <= balance) {
        balance -= amt;
        document.getElementById('balance-display').innerText = `🔥 ${balance.toLocaleString()}.00`;
        
        // Success feedback (Simulating a real app)
        const btn = document.querySelector('.pay-btn');
        btn.innerText = "Payment Successful ✅";
        btn.style.background = "#34a853";
        
        setTimeout(() => {
            closeModal();
            btn.innerText = "Pay Securely";
            btn.style.background = "#1a73e8";
            document.getElementById('amount').value = '';
        }, 1500);
    } else {
        alert("Insufficient balance!");
    }
}
