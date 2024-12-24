document.addEventListener("DOMContentLoaded", () => {
    const clinicDoctors = {
        dermatology: ["Dr. Skin Specialist", "Dr. Derm Expert"],
        pediatrics: ["Dr. Child Care", "Dr. Kids Health"],
        ent: ["Dr. Ear Specialist", "Dr. Nose Specialist"],
    };

    const clinicSelect = document.getElementById("clinic");
    const doctorSelect = document.getElementById("doctor");
    const bookingForm = document.getElementById("booking-form");

    const getAppointments = () => JSON.parse(localStorage.getItem("appointments")) || [];

    const saveAppointments = (appointments) => {
        localStorage.setItem("appointments", JSON.stringify(appointments));
    };

    const isAppointmentConflict = (newAppointment) => {
        const appointments = getAppointments();
        return appointments.some((appointment) => {
            return (
                appointment.clinic === newAppointment.clinic &&
                appointment.doctor === newAppointment.doctor &&
                appointment.appointment_date === newAppointment.appointment_date &&
                appointment.appointment_time === newAppointment.appointment_time
            );
        });
    };

    clinicSelect.addEventListener("change", () => {
        const selectedClinic = clinicSelect.value;
        doctorSelect.innerHTML = '<option value="">-- Select a Doctor --</option>';
        if (clinicDoctors[selectedClinic]) {
            clinicDoctors[selectedClinic].forEach((doctor) => {
                const option = document.createElement("option");
                option.value = doctor;
                option.textContent = doctor;
                doctorSelect.appendChild(option);
            });
        }
    });

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newAppointment = {
            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            clinic: clinicSelect.value,
            doctor: doctorSelect.value,
            appointment_date: document.getElementById("date").value,
            appointment_time: document.getElementById("time").value,
            reason: document.getElementById("reason").value,
        };

        if (!newAppointment.clinic || !newAppointment.doctor) {
            alert("Please select both a clinic and a doctor.");
            return;
        }

        if (isAppointmentConflict(newAppointment)) {
            alert("This appointment conflicts with an existing one. Please choose another time or doctor.");
        } else {
            const appointments = getAppointments();
            appointments.push(newAppointment);
            saveAppointments(appointments);

            alert("Appointment saved successfully!");
            bookingForm.reset();
        }
    });
});
