const carModelSelect = document.getElementById("car-model");
const carVariantSelect = document.getElementById("car-variant");
const fuelTypeSelect = document.getElementById("fuel-type");
const transmissionTypeSelect = document.getElementById("transmission-type");
const pricingOutput = document.getElementById("pricing-output");

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

// Event listener setup
document.addEventListener("DOMContentLoaded", async function () {
    await loadPricingData(); // Ensure pricing data is loaded before interacting with it
    
    // Attach event listener to model selection to trigger variant update
    carModelSelect.addEventListener('change', updateVariants);
    carVariantSelect.addEventListener('change', displayPricing);
    fuelTypeSelect.addEventListener('change', displayPricing);
    transmissionTypeSelect.addEventListener('change', displayPricing);
});

// Update variants dynamically based on the selected model
function updateVariants() {
    const selectedModel = carModelSelect.value.toLowerCase();
    carVariantSelect.innerHTML = '<option value="" disabled selected>Select Variant</option>'; // Clear existing options
    fuelTypeSelect.innerHTML = '<option value="" disabled selected>Select Fuel Type</option>';
    transmissionTypeSelect.innerHTML = '<option value="" disabled selected>Select Transmission</option>';
    
    if (carData[selectedModel]) {
        // Enable and populate the Variant dropdown
        carData[selectedModel].variants.forEach(variant => {
            const option = document.createElement("option");
            option.value = variant;
            option.textContent = variant;
            carVariantSelect.appendChild(option);
        });

        // Enable and populate the Fuel Type dropdown
        carData[selectedModel].fuelTypes.forEach(fuel => {
            const option = document.createElement("option");
            option.value = fuel;
            option.textContent = fuel;
            fuelTypeSelect.appendChild(option);
        });

        // Enable and populate the Transmission Type dropdown
        carData[selectedModel].transmission.forEach(transmission => {
            const option = document.createElement("option");
            option.value = transmission;
            option.textContent = transmission;
            transmissionTypeSelect.appendChild(option);
        });
    }

    // Enable the Variant, Fuel Type, and Transmission dropdowns
    carVariantSelect.disabled = false;
    fuelTypeSelect.disabled = false;
    transmissionTypeSelect.disabled = false;

    // Clear pricing output
    pricingOutput.innerHTML = "Select options to view the pricing.";
}

// Get pricing for a selected model, variant, fuel, and transmission
function getPricing(model, variant, fuel, transmission) {
    const modelData = pricingData[model.toLowerCase()];
    if (modelData && modelData[variant] && modelData[variant][fuel]) {
        return modelData[variant][fuel][transmission] || null;
    }
    return null;
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
