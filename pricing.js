const carModelSelect = document.getElementById("car-model");
const carVariantSelect = document.getElementById("car-variant");
const fuelTypeSelect = document.getElementById("fuel-type");
const pricingOutput = document.getElementById("pricing-output");

let pricingData = {}; // To store data loaded from pricing.json

// Car Data
const carData = {
    sonet: {
        variants: {
            petrol: ["5MT HTE", "7DCT HTX"],
            diesel: ["5MT HTE Diesel", "7DCT HTX Diesel"]
        },
        fuelTypes: ["Petrol", "Diesel"]
    },
    seltos: {
        variants: {
            petrol: ["HTE", "HTX"],
            diesel: ["HTE Diesel", "HTX Diesel"]
        },
        fuelTypes: ["Petrol", "Diesel"]
    }
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

// Update fuel type and variants dynamically based on the selected model
function updateVariants() {
    const selectedModel = carModelSelect.value.toLowerCase();
    fuelTypeSelect.innerHTML = '<option value="" disabled selected>Select Fuel Type</option>'; // Clear existing options
    carVariantSelect.innerHTML = '<option value="" disabled selected>Select Variant</option>';

    if (carData[selectedModel]) {
        // Populate the Fuel Type dropdown
        carData[selectedModel].fuelTypes.forEach(fuel => {
            const option = document.createElement("option");
            option.value = fuel.toLowerCase(); // Use lower case for consistency
            option.textContent = fuel;
            fuelTypeSelect.appendChild(option);
        });

        // Enable the Fuel Type dropdown
        fuelTypeSelect.disabled = false;

        // Clear the pricing output
        pricingOutput.innerHTML = "Select options to view the pricing.";
    }
}

// Update variants based on the selected fuel type
function updateVariantsByFuelType() {
    const selectedModel = carModelSelect.value.toLowerCase();
    const selectedFuel = fuelTypeSelect.value;

    carVariantSelect.innerHTML = '<option value="" disabled selected>Select Variant</option>'; // Clear existing options

    if (carData[selectedModel] && selectedFuel) {
        const variants = carData[selectedModel].variants[selectedFuel]; // Get variants for the selected fuel type

        // Populate the Variant dropdown
        if (variants && variants.length > 0) {
            variants.forEach(variant => {
                const option = document.createElement("option");
                option.value = variant;
                option.textContent = variant;
                carVariantSelect.appendChild(option);
            });

            // Enable the Variant dropdown
            carVariantSelect.disabled = false;
        } else {
            carVariantSelect.disabled = true;
        }

        // Clear pricing output
        pricingOutput.innerHTML = "Select options to view the pricing.";
    }
}

// Get pricing for a selected model, variant, and fuel
function getPricing(model, variant, fuel) {
    console.log("Fetching pricing for:", { model, variant, fuel }); // Log inputs

    // Normalize keys to match JSON structure
    const modelData = pricingData[model.toLowerCase()];
    if (modelData) {
        const variantData = modelData[variant]; // Variant is case-sensitive
        if (variantData) {
            const fuelData = variantData[fuel.charAt(0).toUpperCase() + fuel.slice(1).toLowerCase()]; // Capitalize fuel
            if (fuelData) {
                return fuelData;
            }
        }
    }
    console.error("Pricing data not found for:", { model, variant, fuel });
    return null;
}

// Display pricing
function displayPricing() {
    const model = carModelSelect.value;
    const variant = carVariantSelect.value;
    const fuel = fuelTypeSelect.value;

    const pricing = getPricing(model, variant, fuel);
    if (pricing) {
        pricingOutput.innerHTML = `
            <p><strong>Ex-Showroom Price:</strong> ₹${pricing.exShowroom}</p>
            <p><strong>TCS:</strong> ₹${pricing.tcs}</p>
            <p><strong>RTO:</strong> ₹${pricing.rto}</p>
            <p><strong>Insurance:</strong> ₹${pricing.insurance}</p>
            <p><strong>FASTAG:</strong> ₹${pricing.fastag}</p>
            <p><strong>ExWarranty:</strong> ₹${pricing.extendedwarranty}</p>
            <p><strong>Basic Kit:</strong> ₹${pricing.basicKit}</p>
            <p><strong>Total:</strong> ₹${pricing.total}</p>
        `;
    } else {
        pricingOutput.innerHTML = "<p>Pricing information not available.</p>";
    }
}

// Event listener setup
document.addEventListener("DOMContentLoaded", async function () {
    await loadPricingData(); // Ensure pricing data is loaded before interacting with it

    // Attach event listeners
    carModelSelect.addEventListener('change', updateVariants);
    fuelTypeSelect.addEventListener('change', updateVariantsByFuelType);
    carVariantSelect.addEventListener('change', displayPricing);
});
