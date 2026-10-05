# BE Backend

Express 5 and Mongoose backend for the Bulldogs Exchange storefront. The source follows MVC separation: models define MongoDB data, controllers implement business rules, routes expose the API, and middleware handles authentication/errors.

## Collections

- `users`: account, role, active status, and an embedded default address.
- `categories`: reusable product group information referenced by products.
- `products`: catalog information, a category reference, numeric prices/inventory, availability, and searchable fields.
- `carts`: one referenced user with embedded line items that reference products.
- `orders`: referenced user/products plus embedded product and address snapshots so historical orders do not change when catalog records change.
- `reviews`: ratings and comments that reference both their author and product.

Frequently queried usernames, emails, slugs, categories, status fields, ownership/date combinations, prices, and text-search fields are indexed in their Mongoose schemas.

## Setup

1. Install packages with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and a long `JWT_SECRET`.
3. Run `npm run seed` to insert/update the ten catalog products.
4. Run `npm run dev` and open `http://localhost:5000/api/health`.

Use `npm run verify` to launch a temporary MongoDB instance, insert sample documents, exercise validation and relationships, inspect indexes, and remove the temporary database afterward.

For a zero-configuration classroom demonstration, run `npm run demo`. It starts a temporary MongoDB database, loads all ten products, and serves the API on port 5000. Demo data is removed when the process stops; use the normal setup above for persistent data.

## API

- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/product`, `GET /api/product/:slug`
- `POST /api/product`, `PATCH /api/product/:id` (admin)
- `GET /api/cart`, `POST /api/cart/items`, `PATCH/DELETE /api/cart/items/:productId`
- `GET /api/order`, `GET /api/order/:id`, `POST /api/order`


EXPLANATIONS

The pages are connected using React Router. The navbar links the user to Home, Products, Profile, Cart, Login, and Logout pages. After login, a customer is sent to the Customer Account page, while an admin is sent to the Admin Dashboard page. The customer can move from Products to Cart, then create an order. The Profile page is connected to the user account and lets the customer view and update information or change the password. The Admin Dashboard uses a sidebar to move between Products, Orders, Reviews, and Manage Users.
Each page communicates with the backend using API requests from api.js. For example, the Products page calls the Product API to show products, search keywords, filter categories, and view reviews. When a customer clicks Add to Cart, the frontend sends the selected product ID to the Cart API. The Cart API saves it under the logged-in user’s cart in MongoDB. When the customer creates an order, the Order API gets the cart items, creates an order, and clears the cart. Reviews are connected to both the user and product, so a customer can create a review while the product page can show approved reviews.
Login connects the frontend to the Authentication API. After a successful login, the backend returns a JWT token and the user role. The frontend saves the token and user data in local storage. The token is sent with protected API requests, such as cart, order, profile, review, and admin actions. The backend checks the token and role before allowing the request. Customers can only use customer features, while admins can use the Product, Orders, Reviews, and Manage Users sections. Logout removes the token and user data, then sends the user back to the Login page.


ANOTHER EXPLANATIONS 


The client and server are connected using API. The client is the React website that the customer and admin can see. The server is the Express backend that gets and saves the data in MongoDB Atlas. For example, if the customer clicks Add to Cart, the client sends the product ID to the server. Then the server saves it in the customer cart. If the customer creates an order, the server gets the cart items, saves the order, then the admin can see it in the Admin Dashboard. When the admin clicks Confirm Order or Ready for Claiming, the customer can see the updated status in their profile.
For the client side, I used React to make the pages and components, like Navbar, Footer, Cart, Profile, Customer Account, and Admin Dashboard. I used React Router DOM so the pages can move from Home, Products, Login, Profile, Cart, and Admin page. I used Tailwind CSS for the design, like the colors, buttons, sidebar, forms, and responsive layout. I also used Vite to run the frontend faster. The client uses component-based design because I separated reusable parts like Button, Navbar, Footer, and Cart Modal.
For the server side, I used Express.js to make the API routes and Mongoose to connect and make schemas in MongoDB Atlas. I used bcryptjs so the user password is hashed and protected. I used jsonwebtoken or JWT for login, because after login the server gives a token to the user. This token is needed when the customer uses protected features like Cart, Order, Review, and Profile. For admin, the server checks if the role is admin before allowing them to add products, confirm orders, approve reviews, or manage users. I also used dotenv for the secret variables, cors so the frontend can connect to backend, and nodemon to restart the server when there are changes.
The project uses MVC design pattern in the server. The Models folder contains the database schemas like User, Product, Cart, Order, and Review. The Controllers folder contains the functions or logic, like create product, add to cart, create order, and login. The Routes folder contains the API links like /api/product, /api/cart, /api/order, and /api/user. In the client, the pages folder has the screens, components has reusable design parts, layouts has the common page layout, and services/api.js is where the client connects to the server.