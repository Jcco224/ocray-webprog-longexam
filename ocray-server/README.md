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
