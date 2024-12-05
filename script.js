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
let pricingData = {}; // To store data loaded from pricing.json

// Car Data
const carData = {
    sonet: {
        variants: ["HTE", "HTE(O)", "HTK", "HTK(O)", "HTK+", "Gravity", "HTX", "HTX+", "GTX", "GTX+", "XLine"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
    },
    seltos: {
        variants: ["HTE", "HTK", "HTK+", "HTX", "Gravity", "HTX+", "GTX", "GTX+", "XLine"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
    },
    carens: {
        variants: ["Premium", "Premium (O)", "Gravity", "Prestige", "Prestige (O)", "Prestige Plus", "Prestige Plus (O)", "Luxury", "Luxury Plus", "XLine"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
    },
    EV6: {
        variants: ["GT", "GT (AWD)"],
        fuelTypes: ["Electric"],
        transmission: ["Automatic"],
    },
};

// Load pricing data from pricing.json
async function loadPricingData() {
    try {
        const response = await fetch('pricing.json'); // Adjust path if needed
        pricingData = await response.json();
        console.log("Pricing data loaded successfully:", pricingData);
    } catch (error) {
        console.error("Failed to load pricing data:", error);
    }
}
window.onload = async function () {
    await loadPricingData(); // Ensure pricing data is loaded before interacting with it
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
        cars = JSON.parse(storedCars);
        renderCars();
    }
    
    // Attach event listener to model selection to trigger variant update
    carModelSelect.addEventListener('change', updateVariants);
    carVariantSelect.addEventListener('change', displayPricing);
    fuelTypeSelect.addEventListener('change', displayPricing);
    transmissionTypeSelect.addEventListener('change', displayPricing);
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
// Display pricing
function displayPricing() {
    const model = carModelSelect.value;
    const variant = carVariantSelect.value;
    const fuel = fuelTypeSelect.value;
    const transmission = transmissionTypeSelect.value;

    const pricing = getPricing(model, variant, fuel, transmission);
    if (pricing) {
        pricingOutput.innerHTML = `
            <p><strong>Ex-Showroom Price:</strong> ₹${pricing.exShowroom}</p>
            <p><strong>TCS:</strong> ₹${pricing.tcs}</p>
            <p><strong>Insurance:</strong> ₹${pricing.insurance}</p>
            <p><strong>Basic Kit:</strong> ₹${pricing.basicKit}</p>
            <p><strong>Total:</strong> ₹${pricing.total}</p>
        `;
    } else {
        pricingOutput.innerHTML = "<p>Pricing information not available.</p>";
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

// Get pricing for a selected model, variant, fuel, and transmission
function getPricing(model, variant, fuel, transmission) {
    const modelData = pricingData[model.toLowerCase()];
    if (modelData && modelData[variant] && modelData[variant][fuel]) {
        return modelData[variant][fuel][transmission] || null;
    }
    return null;
}

