# CTWEBPGL Web Programming - Long Exam 1

This repository contains a React frontend built with Vite, React Router, and Tailwind CSS.

It also contains the restored `ocray-server` backend, built with Express, MongoDB, and Mongoose using an MVC-oriented folder structure.

The current project is **BulldogEx Shop**, a low-fidelity e-commerce wireframe for campus products. It includes a full-width hero banner, product catalog cards, product detail pages, store information pages, shared layouts, and authentication screens.

## Tech Stack

- React 19
- Vite
- React Router DOM
- Tailwind CSS 4
- ESLint
- Node.js and Express 5
- MongoDB and Mongoose
- JSON Web Token authentication

## Backend Quick Start

From the repository root:

```bash
cd ocray-server
npm install
npm run verify
npm run demo
```

`npm run demo` provides a zero-configuration temporary MongoDB database on port 5000. In a second terminal, start the client with `cd ocray-client && npm run dev`. For persistent data, copy `ocray-server/.env.example` to `.env`, configure MongoDB, run `npm run seed`, and then use `npm run dev`.

## Main Features

- Full-width e-commerce hero section with background image overlay
- Product listing page with reusable product cards
- Product detail page with price, category, stock, description, and action buttons
- Store-focused home, about, footer, and not found pages
- Authentication pages for sign in and sign up
- Shared layout, navbar, footer, and button components

## Fork and Clone Instructions

Fork the original repository first on GitHub. This creates your own copy of the repository under your GitHub account.

After the repository is forked, clone your forked repository to your local device:

1. Go to the root folder where you want to save the project.
2. Open that folder in **VS Code**.
3. Open the **VS Code Terminal**.
4. Run `git clone` using the URL of your forked repository:

```bash
git clone <forked-repository-url>
```

Example:

```bash
git clone https://github.com/your-username/surname-long-exam.git
```

After cloning the forked repository, go inside the cloned project folder:

```bash
cd surname-long-exam
```

## Project Setup

Install dependencies inside the client app:

```bash
cd surname-client
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Push to GitHub Using Git Bash

Open **Git Bash** or **VS Code Terminal**, then go to the project root folder:

Example
```bash
cd /c/Users/ACER/Desktop/cy.dev/cy.dev.reactjs/course-material/webprog/long-exam1
```

Check the files before committing:

```bash
git status
```

If this folder is not yet a Git repository, initialize it:

```bash
git init
```

Stage, commit, and push the project:

```bash
git add .
git commit -m "initial long-exam1"
git push origin main
```

For future updates after editing files:

```bash
git status
git add .
git commit -m "enhanced long-exam1"
git push
```

## Current Routes

- `/` - Home page
- `/about` - About page
- `/products` - Product list page
- `/products/:name` - Single product page
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

## Key Files

- `src/assets/product-content.js` - product data used by the catalog and product pages
- `src/components/ProductCard.jsx` - reusable product card component
- `src/components/ProductList.jsx` - product grid component
- `src/pages/LandingPages/ProductListPage.jsx` - product catalog page
- `src/pages/LandingPages/ProductPage.jsx` - single product detail page
- `src/pages/LandingPages/HomePage.jsx` - landing page with full-width hero banner

## Current File Structure

```text
long-exam1/
├── README.md
└── robles-client/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── assets/
        │   ├── hero.png
        │   ├── product-content.js
        │   ├── react.svg
        │   ├── vite.svg
        │   ├── img/
        │   │   ├── nu_bulldogex_banner.jpg
        │   │   └── nubdexchange_logo.png
        │   └── styles/
        │       └── index.css
        ├── components/
        │   ├── Button.jsx
        │   ├── Footer.jsx
        │   ├── NavBar.jsx
        │   ├── ProductCard.jsx
        │   └── ProductList.jsx
        ├── layouts/
        │   ├── AuthLayout.jsx
        │   └── Layout.jsx
        └── pages/
            ├── NotFoundPage.jsx
            ├── AuthPages/
            │   ├── SignInPage.jsx
            │   └── SignUpPage.jsx
            └── LandingPages/
                ├── AboutPage.jsx
                ├── ProductListPage.jsx
                ├── ProductPage.jsx
                └── HomePage.jsx
```

## Notes

- `node_modules/` and `dist/` are not included in the structure above because they are generated folders.
- The application uses `Layout.jsx` for public pages and `AuthLayout.jsx` for authentication pages.
- Product routes use the product `name` value from `product-content.js` as the URL slug.

## Enhancement Instructions
- Enhancement 1: Develop an original product catalog with appropriate product names, descriptions, prices, categories, and images.
- Enhancement 2: Create a customized footer and notfoundpage that aligns with the website theme and ensure that all links function correctly.
- Enhancement 3: Provide accessible navigation links for both Sign In and Sign Up pages.
- Enhancement 4: Improve the overall visual design through consistent colors, typography, spacing, and imagery without changing the existing component order or page structure.
- Enhancement 5: Research and apply a custom font to the web application using an appropriate implementation method.


EXPLANATIONS

The pages are connected using React Router. The navbar links the user to Home, Products, Profile, Cart, Login, and Logout pages. After login, a customer is sent to the Customer Account page, while an admin is sent to the Admin Dashboard page. The customer can move from Products to Cart, then create an order. The Profile page is connected to the user account and lets the customer view and update information or change the password. The Admin Dashboard uses a sidebar to move between Products, Orders, Reviews, and Manage Users.
Each page communicates with the backend using API requests from api.js. For example, the Products page calls the Product API to show products, search keywords, filter categories, and view reviews. When a customer clicks Add to Cart, the frontend sends the selected product ID to the Cart API. The Cart API saves it under the logged-in user’s cart in MongoDB. When the customer creates an order, the Order API gets the cart items, creates an order, and clears the cart. Reviews are connected to both the user and product, so a customer can create a review while the product page can show approved reviews.
Login connects the frontend to the Authentication API. After a successful login, the backend returns a JWT token and the user role. The frontend saves the token and user data in local storage. The token is sent with protected API requests, such as cart, order, profile, review, and admin actions. The backend checks the token and role before allowing the request. Customers can only use customer features, while admins can use the Product, Orders, Reviews, and Manage Users sections. Logout removes the token and user data, then sends the user back to the Login page.


ANOTHER EXPLANATIONS


The client and server are connected using API. The client is the React website that the customer and admin can see. The server is the Express backend that gets and saves the data in MongoDB Atlas. For example, if the customer clicks Add to Cart, the client sends the product ID to the server. Then the server saves it in the customer cart. If the customer creates an order, the server gets the cart items, saves the order, then the admin can see it in the Admin Dashboard. When the admin clicks Confirm Order or Ready for Claiming, the customer can see the updated status in their profile.
For the client side, I used React to make the pages and components, like Navbar, Footer, Cart, Profile, Customer Account, and Admin Dashboard. I used React Router DOM so the pages can move from Home, Products, Login, Profile, Cart, and Admin page. I used Tailwind CSS for the design, like the colors, buttons, sidebar, forms, and responsive layout. I also used Vite to run the frontend faster. The client uses component-based design because I separated reusable parts like Button, Navbar, Footer, and Cart Modal.
For the server side, I used Express.js to make the API routes and Mongoose to connect and make schemas in MongoDB Atlas. I used bcryptjs so the user password is hashed and protected. I used jsonwebtoken or JWT for login, because after login the server gives a token to the user. This token is needed when the customer uses protected features like Cart, Order, Review, and Profile. For admin, the server checks if the role is admin before allowing them to add products, confirm orders, approve reviews, or manage users. I also used dotenv for the secret variables, cors so the frontend can connect to backend, and nodemon to restart the server when there are changes.
The project uses MVC design pattern in the server. The Models folder contains the database schemas like User, Product, Cart, Order, and Review. The Controllers folder contains the functions or logic, like create product, add to cart, create order, and login. The Routes folder contains the API links like /api/product, /api/cart, /api/order, and /api/user. In the client, the pages folder has the screens, components has reusable design parts, layouts has the common page layout, and services/api.js is where the client connects to the server.