
# MERN E-Commerce Platform

A full-stack e-commerce application built with the **MERN stack** (MongoDB, Express.js, React.js, and Node.js).

The project provides customer authentication, product browsing, collections, shopping cart management, checkout, order history, reviews, location-based shipping, and online payment integration.

---

## 🚀 Features

### 👤 Authentication & User Management
- User registration and login
- OTP verification
- Forgot password
- Reset password
- Protected routes
- Access-token / refresh-token authentication
- Axios authentication interceptor
- Automatic access-token refresh

### 🛍️ Product Management
- Browse all products
- Product details page
- Product collections
- Product image gallery
- Product sizes and quantity selection
- Best-selling products
- Product search
- Product reviews and star ratings

### 🛒 Shopping Cart
- Add products to cart
- Size-based cart variants
- Increase/decrease product quantity
- Remove products
- Automatically calculate cart quantity and price
- Persist cart state

### 📦 Checkout & Orders
- Shipping/billing address
- Location selection using a map
- Shipping charge calculation
- Order price calculation
- Cash on Delivery
- Online payment
- Order creation
- Order history

### 💳 Payment
- eSewa payment integration
- Payment response handling
- Payment verification
- Payment status management

### ⭐ Reviews
- Add product reviews
- Star rating
- Display reviews
- Sort reviews by latest

---

## 🧰 Technologies Used

### Frontend
- React.js
- React Router
- Redux Toolkit
- React Hook Form
- Axios
- Tailwind CSS
- React Icons
- React Leaflet / Leaflet

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Multer
- Cloudinary
- bcrypt
- CORS

### Payment
- eSewa

---

## 📁 Project Structure

```text
MERN-E-Commerce/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   │
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   ├── History/
│   │   │   ├── Payment/
│   │   │   ├── BillingDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Collection.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Shop.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── checkoutSlice.js
│   │   │   │   ├── collectionSlice.js
│   │   │   │   ├── historySlice.js
│   │   │   │   ├── paymentSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   ├── registerSlice.js
│   │   │   │   ├── reviewSlice.js
│   │   │   │   └── searchSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── styles/
│   │   ├── utils/
│   │   │   ├── cart.js
│   │   │   └── esewa.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── button.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

---

## 🔧 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory.

Example:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_app_password

ESEWA_PRODUCT_CODE=your_esewa_product_code
ESEWA_SECRET_KEY=your_esewa_secret_key
ESEWA_BASE_URL=your_esewa_url
```

> Never commit `.env` files or secret keys to GitHub.

Start the backend in development mode:

```bash
npm run dev
```

---

## 💻 Frontend Setup

Open another terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔐 Authentication Flow

The application uses access and refresh tokens.

```text
User Login
    ↓
Backend validates credentials
    ↓
Access Token + Refresh Token
    ↓
Access Token used for API requests
    ↓
Access Token expires
    ↓
Axios Response Interceptor detects 401
    ↓
Refresh Token request
    ↓
New Access Token
    ↓
Original request is retried
```

The Axios interceptor also handles multiple failed requests by placing them in a queue while token refresh is in progress.

---

## 🛒 Cart Logic

Each cart item is uniquely identified using:

```text
productId + selectedSize
```

For example:

```text
product123-M
product123-L
```

The same product can therefore exist in the cart with different sizes.

If the same product and size are added again, its quantity is increased instead of creating a duplicate cart item.

---

## 📍 Location & Shipping

The checkout page supports selecting a delivery location using a map.

The selected location can be submitted together with the shipping address.

Shipping charges are calculated based on the order subtotal and delivery location.

Example logic:

```text
Subtotal >= Rs. 10,000
        ↓
Free shipping

Subtotal < Rs. 10,000
        ↓
Bharatpur → Rs. 100
Other locations → Rs. 200
```

---

## 💳 eSewa Payment Flow

The online payment process follows this general flow:

```text
Checkout
   ↓
Create/prepare payment
   ↓
Redirect user to eSewa
   ↓
User completes payment
   ↓
eSewa redirects to frontend
   ↓
Frontend reads payment response
   ↓
Backend verifies transaction
   ↓
Payment status updated
   ↓
Order confirmed
```

Payment verification should always be performed on the backend rather than trusting only the frontend response.

---

## 📦 Order Flow

```text
Cart
  ↓
Checkout
  ↓
Validate products
  ↓
Calculate subtotal
  ↓
Calculate discount
  ↓
Calculate shipping
  ↓
Calculate total
  ↓
Select payment method
  ↓
Create / process order
  ↓
Update product stock
  ↓
Store order
  ↓
Show order history
```

---

## 🗄️ Main Backend Modules

### Controllers

Controllers contain the main business logic for:

- Products
- Collections
- Users
- Orders
- Reviews
- Payments

### Models

MongoDB/Mongoose models include:

- User
- Product
- Collection
- Order
- Review
- OTP
- Pending User

### Routes

API routes are separated according to functionality:

```text
/auth
/collections
/orders
/payment
/products
/reviews
/users
```

### Middleware

Middleware is used for:

- Authentication
- Error handling
- File upload handling

### Services

External or reusable services such as OTP/email/payment processing are separated into the service layer.

---

## 🧪 Development

Run frontend and backend separately.

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
npm run dev
```

---

## 🌱 Database Seeding

The backend contains seed scripts for initial data.

Example:

```bash
node src/scripts/seedCollections.js
node src/scripts/seedProducts.js
```

Run the collection seed before the product seed when products depend on collection IDs.

---

## 🔒 Security Considerations

- Store secrets in environment variables.
- Do not expose MongoDB credentials.
- Do not expose Cloudinary API secrets.
- Do not expose JWT secrets.
- Do not expose eSewa secret keys.
- Validate user input on the backend.
- Verify online payments on the server.
- Protect private API routes with authentication middleware.
- Use secure cookies when storing refresh tokens.

---

## 🚀 Production Deployment

Before deployment:

1. Set production environment variables.
2. Configure the production frontend URL in `CORS_ORIGIN`.
3. Configure the frontend `VITE_API_URL`.
4. Configure MongoDB for production access.
5. Configure Cloudinary.
6. Configure email/SMTP.
7. Configure eSewa production credentials.
8. Test authentication and refresh-token flow.
9. Test payment verification.
10. Build and deploy the frontend and backend.

### Frontend Build

```bash
npm run build
```

The production build will be generated in:

```text
frontend/dist/
```

---

## 📝 Environment Variables

Do not commit these files:

```text
.env
.env.local
.env.production
```

Add them to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
dist/
build/
```

---

## 🛠️ Future Improvements

- Admin dashboard
- Product management dashboard
- Order management dashboard
- Wishlist
- Coupon system
- Product filtering
- Pagination
- Advanced search
- Email order confirmation
- Better payment failure handling
- Inventory management
- User profile management
- Sales analytics
- Product recommendations

---

## 👨‍💻 Author

**Smaran Khanal**

BSc CSIT Student

---

## 📄 License

This project is developed for educational and portfolio purposes.

You can modify and extend it according to your requirements.
