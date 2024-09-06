# Furnito - Online Furniture Shop

Furnito is an online store that provides high-quality furniture for homes and offices. The platform allows customers to browse, search, and purchase a wide range of furniture products, with a seamless checkout and order management system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse and search for furniture by category or product type
- User registration and login
- Add products to cart and wishlist
- Checkout and payment processing with Stripe
- Order tracking and management
- Product reviews and ratings
- Admin panel for managing products, orders, and customers

## Tech Stack

- **Backend**:  Nest.js, MongoDB
- **Frontend**: vinilla JS
- **Payment Gateway**: Stripe
- **Deployment**: Railway

## Installation

To get started with Furnito on your local machine, follow these steps:


1. Navigate to the project directory:

    ```bash
    cd furnito
    ```

2. Install dependencies for both the backend and frontend:

    ```bash
    cd backend
    npm install
    ```

3. Start the development server:

    - **Backend**:

      ```bash
      npm run start:dev
      ```


6. Open the app in your browser at `http://localhost:3000`.

## Usage

### 1. User Registration and Login

- Users can create an account and log in to manage their orders and personal information.

### 2. Browsing Products

- Browse furniture by category, search for specific products, and filter by price, rating, and other attributes.

### 3. Cart and Checkout

- Add products to the cart and proceed to checkout with payment processing handled via Stripe.

### 4. Order Management

- Track orders from the user dashboard and view order history.

### 5. Product Reviews and Ratings

- Users can leave reviews and ratings for purchased products.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
