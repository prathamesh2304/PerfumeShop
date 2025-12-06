Got it!
You want the **README content wrapped inside a Markdown code block**, exactly like your example.

Here is your **entire README rewritten in the same *code format block*** 👇
Just **copy–paste directly** into GitHub.

---

```markdown
# 🌸 Perfume Shop – Full Stack Web Application

A full-stack perfume store built using **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend.  
The project demonstrates clean UI design, API integration, responsive layouts, database usage, and CRUD operations for reviews.

This application was developed as part of an internship assignment to showcase full-stack skills.

---

## 🚀 Features

### 🏠 Homepage
- Responsive navbar  
- Hero section with background image  
- Featured products grid  
- Product cards with hover effects  
- Clicking a card opens the detailed product page  

### 📦 Product Details Page
- Large product image  
- Description, price, available sizes  
- Add to cart (UI only)  
- Social share button  
- Review section (read + add new reviews)  
- Image gallery support  

### 🗄️ Backend Features
- REST API using Express  
- MongoDB database with Mongoose ORM  
- Product model with fields:
  - name, price, description  
  - slug, images, reviews, sizes  
- Review structure with:
  - name, rating, comment  
- Routes:
  - `/api/products`
  - `/api/products/:id`
- Seed script to populate products  
- Script to update product images dynamically  

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Axios  
- Custom UI components (Hero, ProductCard)

### **Backend**
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  
- CORS  
- Nodemon  

---

## 📂 Folder Structure

````
Perfume-Shop-FullStack/
│
├── Backend/
│   ├── config/db.js
│   ├── models/Product.js
│   ├── routes/products.js
│   ├── seed/seed.js
│   ├── scripts/update-product-images.js
│   ├── server.js
│   └── .env  (ignored in git)
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ProductPage.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── images/
│   └── vite.config.js
│
└── README.md
````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the project

```bash
git clone <your-repo-url>
cd Perfume-Shop-FullStack
````

---

## 🔧 Backend Setup

### 2️⃣ Install backend dependencies

```bash
cd Backend
npm install
```

### 3️⃣ Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4️⃣ Seed the database

```bash
npm run seed
```

### 5️⃣ Start backend server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

### 6️⃣ Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 7️⃣ Start frontend dev server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/api/products`             | Fetch all products   |
| GET    | `/api/products/:id`         | Fetch single product |
| POST   | `/api/products/:id/reviews` | Add a review         |

---



Database:

* MongoDB Atlas

---

## 📘 Conclusion

This project demonstrates:

* Frontend + backend integration
* REST API usage
* MongoDB database handling
* Clean UI design
* Reusable React components
* Real-world app structure

Future enhancements:

* Cart & checkout
* User authentication
* Admin dashboard

---

## 👤 Developer

**Prathamesh Thakur**
Frontend + Backend Developer

```

---

