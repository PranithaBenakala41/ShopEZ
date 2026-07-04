## ER DIAGRAM

The Entity Relationship (ER) Diagram represents the database structure of the ShopEZ application. It illustrates the relationships between the main entities involved in the system, including Users, Products, Categories, Cart, Orders, and Payments. The ER diagram serves as a blueprint for designing the database and ensures efficient storage, retrieval, and management of data.

# Entities

- User – Stores customer and administrator information such as name, email, password, phone number, address, and role.
- Product – Contains product details such as product name, description, price, stock, image, and category.
- Category – Groups products into different categories for easy navigation.
- Cart – Stores the products selected by a user before checkout.
- Order – Contains order details including ordered products, quantity, total amount, order status, and delivery information.
- Payment – Stores payment details such as payment method, transaction ID, payment status, and payment date.

# Relationships

- One User can place multiple Orders.
- One User has one Shopping Cart.
- One Cart can contain multiple Products.
- One Category can contain multiple Products.
- One Order can include multiple Products.
- Each Order is associated with one Payment.
![alt text](image_1.png)
![alt text](image-2.png)