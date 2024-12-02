Here’s a detailed `README.md` file for your Kia Showroom Inventory project:

---

# Kia Showroom Inventory Management

A modern, mobile-friendly web application designed to manage and search the inventory of Kia cars in a showroom. This tool helps track car details such as VIN (Vehicle Identification Number), car model, variant, color, and fuel type. It allows users to add, delete, and search for cars in the inventory and also includes an additional car info page for detailed car specifications.

---

## **Features**

- **Dynamic Form Inputs**:
  - Dropdown menus for car model, variant, and fuel type.
  - Variants are dynamically updated based on the selected car model.
- **Add/Delete/Search Functionality**:
  - Add cars to the inventory with details like VIN, model, variant, color, and fuel type.
  - Delete cars from the inventory with a single click.
  - Search by any field (VIN, model, variant, color, or fuel type).
- **Mobile-Responsive Design**:
  - Optimized for all screen sizes, including mobile, tablet, and desktop.
  - Modern and colorful UI for an enhanced user experience.
- **Persistent Data Storage**:
  - Inventory data is stored in the browser's localStorage, so the data remains even after a page refresh.
- **Car Info Page**:
  - A dedicated page to view detailed information about a specific car.
  - Hyperlinked car names on the car info page lead to a new page for each car with detailed specs.

---

## **Technologies Used**

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Styling**: Responsive design using CSS with modern gradients, animations, and hover effects.
- **Data Storage**: Browser localStorage for persisting data.

---

## **How to Use**

### **1. Clone the Repository**
```bash
git clone https://github.com/Krymorsk/CarModelSorter.git
cd CarModelSorter
```

### **2. Open the Application**
- Open `index.html` in a web browser to start using the application.

### **3. Add a Car**
- Fill in the form:
  - **Car Model**: Select one of the six available models (Sonet, Seltos, Syros, Carens, Carnival, EV6).
  - **Variant**: Choose from dynamically updated options based on the selected model.
  - **Color**: Enter the car's color (e.g., Black, White).
  - **Fuel Type**: Select `Petrol` or `Turbo`.
  - **VIN**: Enter a valid Vehicle Identification Number.
- Click the **Add Car** button to save the car to the inventory.

### **4. Search for a Car**
- Use the search bar to find cars by any detail (VIN, model, variant, color, or fuel type).

### **5. View Car Details**
- Visit the **Car Info Page** (`car-info.html`) to see all cars.
- Click on any car's name to view its detailed specifications.

### **6. Delete a Car**
- Click the **Delete** button next to a car in the inventory list to remove it.

---

## **Car Models and Variants**

| Model       | Variants                                                                                       |
|-------------|-----------------------------------------------------------------------------------------------|
| **Sonet**   | HTE, HTE(O), HTK, HTK(O), HTK+, Gravity, HTX, HTX+, GTX, GTX+, XLine                          |
| **Seltos**  | HTE, HTK, HTK+, HTX, Gravity, HTX+, GTX, GTX+, XLine                                          |
| **Carens**  | Premium, Premium (O), Gravity, Prestige, Prestige (O), Prestige Plus, Luxury, Luxury Plus, XLine |
| **EV6**     | GT, GT(AWD)                                                                                   |
| **Carnival**| Prestige, Prestige Plus, Limousine, Limousine Plus                                            |

---

## **Project File Structure**

```
CarModelSorter/
│
├── index.html          # Main page to add and search inventory
├── car-info.html       # Page to view all cars in inventory
├── car-details.html    # Template page for individual car details
├── styles.css          # CSS file for styling all pages
├── script.js           # JavaScript file for functionality
└── README.md           # Project documentation
```

---

## **Screenshots**

### **Main Inventory Page**
![Main Page](https://github.com/Krymorsk/CarModelSorter/main/screenshots/main-page.png)

### **Car Info Page**
![Car Info Page](https://github.com/Krymorsk/CarModelSorter/main/screenshots/car-info-page.png)

---

## **Future Enhancements**

- Add an admin panel for user authentication.
- Export inventory data as CSV or Excel files.
- Implement a database for larger-scale data storage.
- Add detailed car specifications dynamically to car detail pages.

---

## **Credits**

- **Developed by:** Arish Ahmad(https://github.com/Krymorsk)
- **Design Inspiration:** Kia Motors Showroom Inventory Needs

---

