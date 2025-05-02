document.addEventListener("DOMContentLoaded", () => {
    const payBtn = document.getElementById("payBtn");
    const confirmBtn = document.getElementById("confirmPaymentBtn");

    payBtn.addEventListener("click", () => {
        const form = document.getElementById("bookingForm");
        const data = new FormData(form);
        const formData = {};

        for (const [key, value] of data.entries()) {
            if (!value) {
                alert("Пожалуйста, заполните все поля.");
                return;
            }
            formData[key] = value;
        }

        if (formData.age < 7 || formData.age > 14) {
            alert("Возраст ребёнка должен быть от 7 до 14 лет.");
            return;
        }

        if (!formData.date) {
            alert("Выберите дату поездки.");
            return;
        }

        formData.amount = 5;

        localStorage.setItem("bookingData", JSON.stringify(formData));

        document.getElementById("payment").style.display = "block";
    });

    confirmBtn.addEventListener("click", async () => {
        const booking = JSON.parse(localStorage.getItem("bookingData"));

        const res = await fetch("/send_ticket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        });

        const text = await res.text();
        alert(text);
    });
});
