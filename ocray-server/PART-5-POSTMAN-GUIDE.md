# Part 5 Postman Testing

Import `postman/BE-Backend-Part-5.postman_collection.json` into Postman.

1. Start the API with `npm run dev`.
2. Open the imported collection's **Variables** tab.
3. Replace `CHANGE_ME` in `adminPassword` with the `SEED_ADMIN_PASSWORD` value from `.env`.
4. Save the collection. Never include the password or token in screenshots.
5. Send `00 - Login` first.
6. Open each folder in numerical order and send each request from top to bottom.

The collection automatically saves the token and the `_id`/slug of each created document. Do not replace `{{categoryId}}`, `{{productId}}`, or `{{supplierId}}` manually.

For every submission screenshot, show the request name, method, URL, status, response body, and Test Results. GET requests need no request body.

The delete folder must be run last. Run `00 - Login` again before repeating the entire test set; it generates unique names, slugs, and supplier email addresses for a new run.
