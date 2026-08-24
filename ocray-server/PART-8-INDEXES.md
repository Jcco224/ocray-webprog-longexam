# Part 8: Database Optimization

| Collection | Indexed fields | Query supported |
|---|---|---|
| User | `username` (unique), `email` (unique) | Login and duplicate-account checks |
| User | `role`, `isActive` | Active customer/admin filtering |
| User | `lastName`, `firstName` | Alphabetical user searches |
| Category | `name` (unique), `slug` (unique) | Category lookup |
| Category | text: `name`, `description` | Keyword search |
| Category | `isActive`, `name` | Active category list |
| Product | `slug` (unique) | Product detail lookup |
| Product | text: `title`, `descriptions` | Catalog keyword search |
| Product | `category`, `isActive`, `createdAt` | Products within a category |
| Product | `isActive`, `isFeatured`, `createdAt` | Featured catalog listing |
| Product | `isActive`, `price` | Active products sorted/filtered by price |
| Product | `availability`, `isActive` | Inventory and availability filtering |
| Cart | `user` (unique) | Retrieve one cart for a user |
| Orders | `orderNumber` (unique) | Direct order lookup |
| Orders | `user`, `createdAt` | Customer order history |
| Orders | `status`, `createdAt` | Fulfillment queue |
| Orders | `paymentStatus`, `createdAt` | Payment queue |
| Orders | `items.product`, `createdAt` | Orders containing a product |
| Reviews | `user`, `product` (unique) | Prevent duplicate reviews |
| Reviews | `product`, `isApproved`, `createdAt` | Approved reviews for a product |
| Reviews | `isApproved`, `createdAt` | Review moderation queue |

Compound indexes place equality-filter fields first and date/sort fields last. This lets MongoDB use one index for both filtering and the expected result order while avoiding redundant single-field indexes.
