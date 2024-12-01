const carList = document.getElementById("carList");
const vinInput = document.getElementById("vin");
const variantInput = document.getElementById("variant");
const colorInput = document.getElementById("color");
const searchInput = document.getElementById("search");

let cars = [];

// Load cars from localStorage on page load
window.onload = function () {
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
        cars = JSON.parse(storedCars);
        renderCars();
    }
};

// Add a new car
function addCar() {
    const vin = vinInput.value.trim();
    const variant = variantInput.value.trim();
    const color = colorInput.value.trim();
    const dateAdded = new Date().toLocaleString();

    if (vin && variant && color && !cars.some((car) => car.vin === vin)) {
        cars.push({ vin, variant, color, dateAdded });
        saveCars();
        renderCars();
        vinInput.value = "";
        variantInput.value = "";
        colorInput.value = "";
    } else {
        alert("Invalid or duplicate VIN!");
    }
}

// Delete a car
function deleteCar(index) {
    cars.splice(index, 1);
    saveCars();
    renderCars();
}

// Save cars to localStorage
function saveCars() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

// Render the car list
function renderCars(filter = "") {
    carList.innerHTML = ""; // Clear the list
    cars
        .filter(
            (car) =>
                car.vin.toLowerCase().includes(filter.toLowerCase()) ||
                car.variant.toLowerCase().includes(filter.toLowerCase()) ||
                car.color.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((car, index) => {
            const carItem = document.createElement("div");
            carItem.className = "car-item";
            carItem.innerHTML = `
                <div>
                    <strong>VIN:</strong> ${car.vin}<br>
                    <strong>Variant:</strong> ${car.variant}<br>
                    <strong>Color:</strong> ${car.color}<br>
                    <strong>Date Added:</strong> ${car.dateAdded}
                </div>
                <button onclick="deleteCar(${index})">Delete</button>
            `;
            carList.appendChild(carItem);
        });
}

// Search cars
function searchCars() {
    const filter = searchInput.value;
    renderCars(filter);
}
