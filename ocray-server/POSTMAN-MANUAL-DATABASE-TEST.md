# Manual Database Testing with Postman and MongoDB Atlas

## 1. Start the persistent API

Add an administrator seed password to `.env` without sharing it:

```env
SEED_ADMIN_PASSWORD=ChooseYourOwnStrongPassword123
```

Then run:

```powershell
npm run seed
npm run dev
```

Keep the server terminal open. It should report `MongoDB connected` and the API URL.

## 2. Create a Postman environment

Create an environment named `Bulldogs Exchange Local` with these variables:

| Variable | Initial value |
|---|---|
| `baseUrl` | `http://localhost:5000/api` |
| `adminToken` | empty |
| `user1Token`, `user2Token`, `user3Token` | empty |
| `category1Id`, `category2Id`, `category3Id` | empty |
| `product1Id`, `product2Id`, `product3Id` | empty |

For JSON requests, select **Body → raw → JSON**.

## 3. Obtain the administrator token

Send `POST {{baseUrl}}/auth/login`:

```json
{
  "login": "admin@bulldogex.local",
  "password": "YOUR_SEED_ADMIN_PASSWORD"
}
```

In **Scripts → Post-response**, add:

```javascript
pm.environment.set('adminToken', pm.response.json().token);
```

Administrator requests use **Authorization → Bearer Token → `{{adminToken}}`**.

## 4. Insert three User documents

Send `POST {{baseUrl}}/auth/register` three times using the following bodies.

### User 1

```json
{
  "username": "sample.one",
  "email": "sample.one@example.com",
  "password": "Bulldog123",
  "firstName": "Ana",
  "lastName": "Santos"
}
```

### User 2

```json
{
  "username": "sample.two",
  "email": "sample.two@example.com",
  "password": "Bulldog123",
  "firstName": "Ben",
  "lastName": "Reyes"
}
```

### User 3

```json
{
  "username": "sample.three",
  "email": "sample.three@example.com",
  "password": "Bulldog123",
  "firstName": "Cara",
  "lastName": "Cruz"
}
```

After each request, copy the returned token into `user1Token`, `user2Token`, or `user3Token`.

## 5. Insert three Category documents

Send `POST {{baseUrl}}/category` with the admin Bearer token. Send once for each object:

```json
{
  "name": "Tech Accessories",
  "slug": "tech-accessories",
  "description": "Technology accessories for NU students.",
  "imageKey": "tech-accessories.jpg"
}
```

```json
{
  "name": "Student Essentials",
  "slug": "student-essentials",
  "description": "Useful everyday products for campus life.",
  "imageKey": "student-essentials.jpg"
}
```

```json
{
  "name": "Limited Edition",
  "slug": "limited-edition",
  "description": "Limited Bulldogs Exchange merchandise.",
  "imageKey": "limited-edition.jpg"
}
```

Copy each response's `category._id` into `category1Id`, `category2Id`, and `category3Id` in the same order.

## 6. Insert three Product documents

Send `POST {{baseUrl}}/product` with the admin Bearer token.

```json
{
  "slug": "bulldog-wireless-mouse",
  "title": "Bulldog Wireless Mouse",
  "descriptions": ["A compact wireless mouse for student workstations."],
  "category": "{{category1Id}}",
  "price": 799,
  "stockQuantity": 20,
  "availability": "in_stock",
  "imageKey": "wireless-mouse.jpg",
  "isFeatured": true
}
```

```json
{
  "slug": "student-study-planner",
  "title": "Student Study Planner",
  "descriptions": ["A structured planner for classes, deadlines, and examinations."],
  "category": "{{category2Id}}",
  "price": 299,
  "stockQuantity": 40,
  "availability": "in_stock",
  "imageKey": "study-planner.jpg"
}
```

```json
{
  "slug": "limited-bulldog-jacket",
  "title": "Limited Bulldog Jacket",
  "descriptions": ["A limited-edition jacket for Bulldogs supporters."],
  "category": "{{category3Id}}",
  "price": 1899,
  "stockQuantity": 10,
  "availability": "low_stock",
  "imageKey": "limited-jacket.jpg",
  "isFeatured": true
}
```

Copy each response's `product._id` into `product1Id`, `product2Id`, and `product3Id`.

## 7. Insert three Cart documents

Send `POST {{baseUrl}}/cart/items` three times. Use a different user Bearer token and product ID for each request:

```json
{ "productId": "{{product1Id}}", "quantity": 1 }
```

```json
{ "productId": "{{product2Id}}", "quantity": 2 }
```

```json
{ "productId": "{{product3Id}}", "quantity": 1 }
```

Use `user1Token` for the first, `user2Token` for the second, and `user3Token` for the third. The controller creates one cart per user and embeds its items.

## 8. Insert three Review documents

Send `POST {{baseUrl}}/review` once with each user token:

```json
{ "productId": "{{product1Id}}", "rating": 5, "comment": "The mouse works well for school projects." }
```

```json
{ "productId": "{{product2Id}}", "rating": 4, "comment": "The planner is useful and easy to organize." }
```

```json
{ "productId": "{{product3Id}}", "rating": 5, "comment": "The jacket quality and design are excellent." }
```

New reviews have `isApproved: false` until an administrator approves them.

## 9. Insert three Order documents

Each user already has a cart. Send `POST {{baseUrl}}/order` with the matching user token.

### Order 1

```json
{
  "paymentMethod": "cash_on_delivery",
  "shippingAddress": {
    "recipientName": "Ana Santos",
    "phone": "09171234567",
    "line1": "551 M. F. Jhocson Street",
    "city": "Manila",
    "province": "Metro Manila",
    "postalCode": "1008"
  }
}
```

### Order 2

```json
{
  "paymentMethod": "gcash",
  "shippingAddress": {
    "recipientName": "Ben Reyes",
    "phone": "09181234567",
    "line1": "123 Sampaloc Street",
    "city": "Manila",
    "province": "Metro Manila",
    "postalCode": "1008"
  }
}
```

### Order 3

```json
{
  "paymentMethod": "cash_on_delivery",
  "shippingAddress": {
    "recipientName": "Cara Cruz",
    "phone": "09191234567",
    "line1": "456 University Avenue",
    "city": "Quezon City",
    "province": "Metro Manila",
    "postalCode": "1100"
  }
}
```

Creating an order embeds product snapshots and the shipping address, references the user/product ObjectIds, and clears that user's cart items.

## 10. Prove validation rules

Send these intentionally invalid requests and capture their `400` responses.

### Missing required User email

`POST {{baseUrl}}/auth/register`

```json
{
  "username": "invalid.user",
  "password": "Bulldog123",
  "firstName": "Invalid",
  "lastName": "User"
}
```

### Product with invalid negative values

`POST {{baseUrl}}/product` using the admin token:

```json
{
  "slug": "invalid-product",
  "title": "Invalid Product",
  "descriptions": ["This request must be rejected."],
  "category": "{{category1Id}}",
  "price": -10,
  "stockQuantity": -1,
  "imageKey": "invalid.jpg"
}
```

### Invalid Cart quantity

`POST {{baseUrl}}/cart/items` using a user token:

```json
{ "productId": "{{product1Id}}", "quantity": 0 }
```

### Invalid Review rating

`POST {{baseUrl}}/review` using a user token that has not reviewed product 2:

```json
{ "productId": "{{product2Id}}", "rating": 6, "comment": "Invalid rating test." }
```

## 11. Verify relationships in Atlas

Open **Atlas → Data Explorer**, choose the database reported by the server, and inspect these fields:

- `products.category` is an ObjectId matching a document in `categories`.
- `carts.user` and `carts.items.product` are ObjectIds; `items` is embedded.
- `orders.user` and `orders.items.product` are ObjectIds; `items` and `shippingAddress` are embedded snapshots.
- `reviews.user` and `reviews.product` are ObjectIds.

## 12. Required screenshots

Capture readable screenshots of:

1. Server terminal showing MongoDB connected and API running.
2. Atlas Data Explorer showing the six collection names and document counts.
3. Three User documents.
4. Three Category documents.
5. Three Product documents with `category` ObjectIds.
6. Three Cart documents with embedded items and ObjectId references.
7. Three Order documents with embedded items/address and ObjectId references.
8. Three Review documents with User/Product ObjectIds.
9. A successful Postman request (`201 Created`).
10. The missing-required-field `400` response.
11. The negative-price/stock `400` response.
12. The invalid-reference or invalid-rating `400` response.

Do not expose your Atlas password, connection string, JWT secret, or bearer tokens in screenshots.
