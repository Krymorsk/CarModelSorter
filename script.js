const carList = document.getElementById("carList");
const vinInput = document.getElementById("vin");
const colorInput = document.getElementById("color");
const fuelInput = document.getElementById("fuel");
const modelInput = document.getElementById("model");
const variantInput = document.getElementById("variant");
const searchInput = document.getElementById("search");
const carModelSelect = document.getElementById("car-model");
const carVariantSelect = document.getElementById("car-variant");
const fuelTypeSelect = document.getElementById("fuel-type");
const transmissionTypeSelect = document.getElementById("transmission-type");
const pricingOutput = document.getElementById("pricing-output");

let cars = [];

// Car Data
const carData = {
    sonet: {
        variants: ["HTE", "HTK", "HTX", "GTX"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
        pricing: {
            HTE: { Petrol: { Manual: { exShowroom: 799900, tcs: 6600, insurance: 38645, total: 945002 } } },
            HTK: { Petrol: { Manual: { exShowroom: 902900, tcs: 9026, insurance: 41555, total: 1059152 } } }
        }
    },
    seltos: {
        // Add Seltos details
    },
    carens: {
        // Add Carens details
    }
};

// Load cars from localStorage on page load
window.onload = function () {
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
        cars = JSON.parse(storedCars);
        renderCars();
    }
};

// Update variants dynamically based on the selected model
function updateVariants() {
    const selectedModel = modelInput.value.toLowerCase();
    variantInput.innerHTML = '<option value="">Select Variant</option>'; // Clear existing options
    if (carData[selectedModel]) {
        carData[selectedModel].variants.forEach(variant => {
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

// Populate pricing dropdowns dynamically
carModelSelect.addEventListener("change", () => {
    const model = carModelSelect.value.toLowerCase();
    if (carData[model]) {
        const { variants, fuelTypes, transmission } = carData[model];

        carVariantSelect.innerHTML = `<option value="" disabled selected>Select Variant</option>`;
        variants.forEach(variant => {
            carVariantSelect.innerHTML += `<option value="${variant}">${variant}</option>`;
        });

        fuelTypeSelect.innerHTML = `<option value="" disabled selected>Select Fuel Type</option>`;
        fuelTypes.forEach(fuel => {
            fuelTypeSelect.innerHTML += `<option value="${fuel}">${fuel}</option>`;
        });

        transmissionTypeSelect.innerHTML = `<option value="" disabled selected>Select Transmission</option>`;
        transmission.forEach(trans => {
            transmissionTypeSelect.innerHTML += `<option value="${trans}">${trans}</option>`;
        });

        carVariantSelect.disabled = false;
        fuelTypeSelect.disabled = false;
        transmissionTypeSelect.disabled = false;
    }
});

// Display pricing details
const displayPricing = () => {
    const model = carModelSelect.value.toLowerCase();
    const variant = carVariantSelect.value;
    const fuel = fuelTypeSelect.value;
    const transmission = transmissionTypeSelect.value;

    if (model && variant && fuel && transmission) {
        const pricing = carData[model]?.pricing[variant]?.[fuel]?.[transmission];
        if (pricing) {
            pricingOutput.innerHTML = `
                <p><strong>Ex-Showroom:</strong> ₹${pricing.exShowroom}</p>
                <p><strong>TCS:</strong> ₹${pricing.tcs}</p>
                <p><strong>Insurance:</strong> ₹${pricing.insurance}</p>
                <p><strong>Total Price:</strong> ₹${pricing.total}</p>
            `;
        } else {
            pricingOutput.innerHTML = `<p>Pricing details not available for the selected options.</p>`;
        }
    } else {
        pricingOutput.innerHTML = `<p>Please select all options to view pricing.</p>`;
    }
};

carVariantSelect.addEventListener("change", displayPricing);
fuelTypeSelect.addEventListener("change", displayPricing);
transmissionTypeSelect.addEventListener("change", displayPricing);
