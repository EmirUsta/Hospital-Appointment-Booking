document.addEventListener("DOMContentLoaded", () => {
    const increaseTextButton = document.getElementById("increase-text");
    const decreaseTextButton = document.getElementById("decrease-text");
    const body = document.body;

    increaseTextButton.addEventListener("click", () => {
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
        body.style.fontSize = (currentSize + 2) + "px";
    });

    decreaseTextButton.addEventListener("click", () => {
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
        if (currentSize > 10) {
            body.style.fontSize = (currentSize - 2) + "px";
        }
    });

    const bookingForm = document.getElementById("booking-form");

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const reason = document.getElementById("reason").value;

        if (name && email && date && time && reason) {
            alert(`Appointment booked successfully!\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nReason: ${reason}`);
            bookingForm.reset();
        } else {
            alert("Please fill out all fields before submitting.");
        }
    });
});
