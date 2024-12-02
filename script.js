const carList = document.getElementById("carList");
const vinInput = document.getElementById("vin");
const colorInput = document.getElementById("color");
const fuelInput = document.getElementById("fuel");
const modelInput = document.getElementById("model");
const variantInput = document.getElementById("variant");
const searchInput = document.getElementById("search");

let cars = [];

// Variants by model
const modelVariants = {
    Sonet: ["HTE", "HTE(O)", "HTK", "HTK(O)", "HTK+", "Gravity", "HTX", "HTX+", "GTX", "GTX+", "XLine"],
    Seltos: ["HTE", "HTK", "HTK+", "HTX", "Gravity", "HTX+", "GTX", "GTX+", "XLine"],
    Carens: ["Premium", "Premium (O)", "Gravity", "Prestige", "Prestige (O)", "Prestige Plus", "Prestige Plus (O)", "Luxury", "Luxury Plus", "XLine"],
    EV6: ["GT", "GT (AWD)"],
    Carnival: ["Prestige", "Prestige Plus", "Limousine", "Limousine Plus"],
};

// Load cars from localStorage on page load
window.onload = function () {
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
        cars = JSON.parse(storedCars);
        renderCars();
    }
};

// Update variants based on the selected model
function updateVariants() {
    const selectedModel = modelInput.value;
    variantInput.innerHTML = '<option value="">Select Variant</option>'; // Clear existing options
    if (modelVariants[selectedModel]) {
        modelVariants[selectedModel].forEach(variant => {
            const option = document.createElement("option");
            option.value = variant;
            option.textContent = variant;
            variantInput.appendChild(option);
        });
    }
}

// Add a new car
function addCar() {
    const vin = vinInput.value.trim();
    const color = colorInput.value.trim();
    const fuel = fuelInput.value;
    const model = modelInput.value;
    const variant = variantInput.value;
    const dateAdded = new Date().toLocaleString();

    if (vin && color && fuel && model && variant && !cars.some((car) => car.vin === vin)) {
        cars.push({ vin, model, variant, color, fuel, dateAdded });
        saveCars();
        renderCars();
        vinInput.value = "";
        colorInput.value = "";
        fuelInput.value = "";
        modelInput.value = "";
        variantInput.innerHTML = '<option value="">Select Variant</option>';
    } else {
        alert("Invalid input or duplicate VIN!");
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
                car.model.toLowerCase().includes(filter.toLowerCase()) ||
                car.variant.toLowerCase().includes(filter.toLowerCase()) ||
                car.color.toLowerCase().includes(filter.toLowerCase()) ||
                car.fuel.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((car, index) => {
            const carItem = document.createElement("div");
            carItem.className = "car-item";
            carItem.innerHTML = `
                <div>
                    <strong>VIN:</strong> ${car.vin}<br>
                    <strong>Model:</strong> ${car.model}<br>
                    <strong>Variant:</strong> ${car.variant}<br>
                    <strong>Color:</strong> ${car.color}<br>
                    <strong>Fuel Type:</strong> ${car.fuel}<br>
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
