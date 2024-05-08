# E-Commerce Backend

This is the backend component of an E-Commerce application. It provides RESTful APIs for managing products, users, and orders.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Retrieve a list of products
- Add a new product
- Retrieve a list of users
- Add a new user
- Create an order
- Retrieve a list of orders
- Retrieve order details

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize (optional, if using an ORM)
- Other dependencies (listed in `package.json`)

## Getting Started

### Prerequisites

- Node.js (version Latest)
- MySQL (version Latest)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NdegwaJulius/ecommerce-backend.git

   cd ecommerce-backend

   npm install

   npm start

### Usage
- Once the server is running, you can send HTTP requests to the provided API endpoints to manage products, users, and orders.
- Use tools like Postman or curl to interact with the APIs.

### API Endpoints
## Products
- GET /products: Retrieve all products
- POST /products: Add a new product
## Users
- GET /users: Retrieve all users
- POST /users: Add a new user
## Orders
- POST /orders: Create a new order
- GET /orders: Retrieve all orders
- GET /orders/:id: Retrieve order details by ID
For detailed API documentation, refer to the API documentation or Swagger documentation (if available).

### Contributing
Contributions are welcome! Please follow the Contributing Guidelines for more information.

### License
This project is licensed under the MIT License - see the LICENSE file for details