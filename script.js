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
        variants: ["HTE", "HTE(O)", "HTK", "HTK(O)", "HTK+", "Gravity", "HTX", "HTX+", "GTX", "GTX+", "XLine"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
        pricing: {
            HTE: {
                Petrol: {
                    Manual: { exShowroom: 799900, tcs: 6600, insurance: 38645, basicKit: 25000, total: 945145 },
                    Automatic: { exShowroom: 849900, tcs: 7100, insurance: 40000, basicKit: 25000, total: 1026900 }
                },
                Diesel: {
                    Manual: { exShowroom: 859900, tcs: 7300, insurance: 41500, basicKit: 25000, total: 1046700 },
                    Automatic: { exShowroom: 909900, tcs: 7600, insurance: 43000, basicKit: 25000, total: 1099500 }
                }
            },
            "HTE(O)": {
                Petrol: {
                    Manual: { exShowroom: 825900, tcs: 6800, insurance: 39500, basicKit: 25000, total: 966200 },
                    Automatic: { exShowroom: 875900, tcs: 7100, insurance: 41000, basicKit: 25000, total: 1038600 }
                },
                Diesel: {
                    Manual: { exShowroom: 885900, tcs: 7500, insurance: 42500, basicKit: 25000, total: 1063400 },
                    Automatic: { exShowroom: 935900, tcs: 7800, insurance: 44000, basicKit: 25000, total: 1117100 }
                }
            },
            HTK: {
                Petrol: {
                    Manual: { exShowroom: 902900, tcs: 9026, insurance: 41555, basicKit: 25000, total: 1066481 },
                    Automatic: { exShowroom: 952900, tcs: 9529, insurance: 43000, basicKit: 25000, total: 1113929 }
                },
                Diesel: {
                    Manual: { exShowroom: 962900, tcs: 9630, insurance: 44000, basicKit: 25000, total: 1132530 },
                    Automatic: { exShowroom: 1012900, tcs: 10130, insurance: 45500, basicKit: 25000, total: 1181530 }
                }
            },
            "HTK(O)": {
                Petrol: {
                    Manual: { exShowroom: 949900, tcs: 9500, insurance: 42000, basicKit: 25000, total: 1101399 },
                    Automatic: { exShowroom: 999900, tcs: 10000, insurance: 43500, basicKit: 25000, total: 1149399 }
                },
                Diesel: {
                    Manual: { exShowroom: 1019900, tcs: 10200, insurance: 44500, basicKit: 25000, total: 1181599 },
                    Automatic: { exShowroom: 1069900, tcs: 10700, insurance: 46000, basicKit: 25000, total: 1239599 }
                }
            },
            "HTK+": {
                Petrol: {
                    Manual: { exShowroom: 999900, tcs: 10000, insurance: 43000, basicKit: 25000, total: 1157899 },
                    Automatic: { exShowroom: 1049900, tcs: 10500, insurance: 44500, basicKit: 25000, total: 1206900 }
                },
                Diesel: {
                    Manual: { exShowroom: 1099900, tcs: 11000, insurance: 45500, basicKit: 25000, total: 1270400 },
                    Automatic: { exShowroom: 1149900, tcs: 11500, insurance: 47000, basicKit: 25000, total: 1319900 }
                }
            },
            Gravity: {
                Petrol: {
                    Manual: { exShowroom: 1109900, tcs: 11100, insurance: 45000, basicKit: 25000, total: 1291000 },
                    Automatic: { exShowroom: 1159900, tcs: 11600, insurance: 47000, basicKit: 25000, total: 1343500 }
                },
                Diesel: {
                    Manual: { exShowroom: 1209900, tcs: 12100, insurance: 48500, basicKit: 25000, total: 1395500 },
                    Automatic: { exShowroom: 1259900, tcs: 12600, insurance: 50000, basicKit: 25000, total: 1447500 }
                }
            },
            HTX: {
                Petrol: {
                    Manual: { exShowroom: 1209900, tcs: 12100, insurance: 46500, basicKit: 25000, total: 1412500 },
                    Automatic: { exShowroom: 1259900, tcs: 12600, insurance: 48000, basicKit: 25000, total: 1466500 }
                },
                Diesel: {
                    Manual: { exShowroom: 1309900, tcs: 13100, insurance: 49500, basicKit: 25000, total: 1531500 },
                    Automatic: { exShowroom: 1359900, tcs: 13600, insurance: 51000, basicKit: 25000, total: 1585600 }
                }
            },
           
        }, 
    
    },
    seltos: {
        variants: ["HTE", "HTK", "HTK+", "HTX", "Gravity", "HTX+", "GTX", "GTX+", "XLine"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
        pricing: {
            HTE: {
                Petrol: {
                    Manual: { exShowroom: 799900, tcs: 6600, insurance: 38645, basicKit: 25000, total: 945145 },
                    Automatic: { exShowroom: 849900, tcs: 7100, insurance: 40000, basicKit: 25000, total: 1026900 }
                },
                Diesel: {
                    Manual: { exShowroom: 859900, tcs: 7300, insurance: 41500, basicKit: 25000, total: 1046700 },
                    Automatic: { exShowroom: 909900, tcs: 7600, insurance: 43000, basicKit: 25000, total: 1099500 }
                }
            },
            "HTE(O)": {
                Petrol: {
                    Manual: { exShowroom: 825900, tcs: 6800, insurance: 39500, basicKit: 25000, total: 966200 },
                    Automatic: { exShowroom: 875900, tcs: 7100, insurance: 41000, basicKit: 25000, total: 1038600 }
                },
                Diesel: {
                    Manual: { exShowroom: 885900, tcs: 7500, insurance: 42500, basicKit: 25000, total: 1063400 },
                    Automatic: { exShowroom: 935900, tcs: 7800, insurance: 44000, basicKit: 25000, total: 1117100 }
                }
            },
            HTK: {
                Petrol: {
                    Manual: { exShowroom: 902900, tcs: 9026, insurance: 41555, basicKit: 25000, total: 1066481 },
                    Automatic: { exShowroom: 952900, tcs: 9529, insurance: 43000, basicKit: 25000, total: 1113929 }
                },
                Diesel: {
                    Manual: { exShowroom: 962900, tcs: 9630, insurance: 44000, basicKit: 25000, total: 1132530 },
                    Automatic: { exShowroom: 1012900, tcs: 10130, insurance: 45500, basicKit: 25000, total: 1181530 }
                }
            },
            "HTK(O)": {
                Petrol: {
                    Manual: { exShowroom: 949900, tcs: 9500, insurance: 42000, basicKit: 25000, total: 1101399 },
                    Automatic: { exShowroom: 999900, tcs: 10000, insurance: 43500, basicKit: 25000, total: 1149399 }
                },
                Diesel: {
                    Manual: { exShowroom: 1019900, tcs: 10200, insurance: 44500, basicKit: 25000, total: 1181599 },
                    Automatic: { exShowroom: 1069900, tcs: 10700, insurance: 46000, basicKit: 25000, total: 1239599 }
                }
            },
            "HTK+": {
                Petrol: {
                    Manual: { exShowroom: 999900, tcs: 10000, insurance: 43000, basicKit: 25000, total: 1157899 },
                    Automatic: { exShowroom: 1049900, tcs: 10500, insurance: 44500, basicKit: 25000, total: 1206900 }
                },
                Diesel: {
                    Manual: { exShowroom: 1099900, tcs: 11000, insurance: 45500, basicKit: 25000, total: 1270400 },
                    Automatic: { exShowroom: 1149900, tcs: 11500, insurance: 47000, basicKit: 25000, total: 1319900 }
                }
            },
            Gravity: {
                Petrol: {
                    Manual: { exShowroom: 1109900, tcs: 11100, insurance: 45000, basicKit: 25000, total: 1291000 },
                    Automatic: { exShowroom: 1159900, tcs: 11600, insurance: 47000, basicKit: 25000, total: 1343500 }
                },
                Diesel: {
                    Manual: { exShowroom: 1209900, tcs: 12100, insurance: 48500, basicKit: 25000, total: 1395500 },
                    Automatic: { exShowroom: 1259900, tcs: 12600, insurance: 50000, basicKit: 25000, total: 1447500 }
                }
            },
            HTX: {
                Petrol: {
                    Manual: { exShowroom: 1209900, tcs: 12100, insurance: 46500, basicKit: 25000, total: 1412500 },
                    Automatic: { exShowroom: 1259900, tcs: 12600, insurance: 48000, basicKit: 25000, total: 1466500 }
                },
                Diesel: {
                    Manual: { exShowroom: 1309900, tcs: 13100, insurance: 49500, basicKit: 25000, total: 1531500 },
                    Automatic: { exShowroom: 1359900, tcs: 13600, insurance: 51000, basicKit: 25000, total: 1585600 }
                }
            },
           
        }, 
    
    },
    carens: {
        variants: ["Premium", "Premium (O)", "Gravity", "Prestige", "Prestige (O)", "Prestige Plus", "Prestige Plus (O)", "Luxury", "Luxury Plus", "XLine"],
        fuelTypes: ["Petrol", "Diesel"],
        transmission: ["Manual", "Automatic"],
        pricing: {
            HTE: {
                Petrol: {
                    Manual: { exShowroom: 799900, tcs: 6600, insurance: 38645, basicKit: 25000, total: 945145 },
                    Automatic: { exShowroom: 849900, tcs: 7100, insurance: 40000, basicKit: 25000, total: 1026900 }
                },
                Diesel: {
                    Manual: { exShowroom: 859900, tcs: 7300, insurance: 41500, basicKit: 25000, total: 1046700 },
                    Automatic: { exShowroom: 909900, tcs: 7600, insurance: 43000, basicKit: 25000, total: 1099500 }
                }
            },
            "HTE(O)": {
                Petrol: {
                    Manual: { exShowroom: 825900, tcs: 6800, insurance: 39500, basicKit: 25000, total: 966200 },
                    Automatic: { exShowroom: 875900, tcs: 7100, insurance: 41000, basicKit: 25000, total: 1038600 }
                },
                Diesel: {
                    Manual: { exShowroom: 885900, tcs: 7500, insurance: 42500, basicKit: 25000, total: 1063400 },
                    Automatic: { exShowroom: 935900, tcs: 7800, insurance: 44000, basicKit: 25000, total: 1117100 }
                }
            },
            HTK: {
                Petrol: {
                    Manual: { exShowroom: 902900, tcs: 9026, insurance: 41555, basicKit: 25000, total: 1066481 },
                    Automatic: { exShowroom: 952900, tcs: 9529, insurance: 43000, basicKit: 25000, total: 1113929 }
                },
                Diesel: {
                    Manual: { exShowroom: 962900, tcs: 9630, insurance: 44000, basicKit: 25000, total: 1132530 },
                    Automatic: { exShowroom: 1012900, tcs: 10130, insurance: 45500, basicKit: 25000, total: 1181530 }
                }
            },
            "HTK(O)": {
                Petrol: {
                    Manual: { exShowroom: 949900, tcs: 9500, insurance: 42000, basicKit: 25000, total: 1101399 },
                    Automatic: { exShowroom: 999900, tcs: 10000, insurance: 43500, basicKit: 25000, total: 1149399 }
                },
                Diesel: {
                    Manual: { exShowroom: 1019900, tcs: 10200, insurance: 44500, basicKit: 25000, total: 1181599 },
                    Automatic: { exShowroom: 1069900, tcs: 10700, insurance: 46000, basicKit: 25000, total: 1239599 }
                }
            },
            "HTK+": {
                Petrol: {
                    Manual: { exShowroom: 999900, tcs: 10000, insurance: 43000, basicKit: 25000, total: 1157899 },
                    Automatic: { exShowroom: 1049900, tcs: 10500, insurance: 44500, basicKit: 25000, total: 1206900 }
                },
                Diesel: {
                    Manual: { exShowroom: 1099900, tcs: 11000, insurance: 45500, basicKit: 25000, total: 1270400 },
                    Automatic: { exShowroom: 1149900, tcs: 11500, insurance: 47000, basicKit: 25000, total: 1319900 }
                }
            },
            Gravity: {
                Petrol: {
                    Manual: { exShowroom: 1109900, tcs: 11100, insurance: 45000, basicKit: 25000, total: 1291000 },
                    Automatic: { exShowroom: 1159900, tcs: 11600, insurance: 47000, basicKit: 25000, total: 1343500 }
                },
                Diesel: {
                    Manual: { exShowroom: 1209900, tcs: 12100, insurance: 48500, basicKit: 25000, total: 1395500 },
                    Automatic: { exShowroom: 1259900, tcs: 12600, insurance: 50000, basicKit: 25000, total: 1447500 }
                }
            },
            HTX: {
                Petrol: {
                    Manual: { exShowroom: 1209900, tcs: 12100, insurance: 46500, basicKit: 25000, total: 1412500 },
                    Automatic: { exShowroom: 1259900, tcs: 12600, insurance: 48000, basicKit: 25000, total: 1466500 }
                },
                Diesel: {
                    Manual: { exShowroom: 1309900, tcs: 13100, insurance: 49500, basicKit: 25000, total: 1531500 },
                    Automatic: { exShowroom: 1359900, tcs: 13600, insurance: 51000, basicKit: 25000, total: 1585600 }
                }
            },
           
        }, 
    
    },
    EV6: {
        variants: ["GT", "GT (AWD)"],
        fuelTypes: ["Electric"],
        transmission: ["Automatic"],
        pricing: {
           
        }
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
