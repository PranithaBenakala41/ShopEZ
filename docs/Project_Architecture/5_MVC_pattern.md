## MVC Pattern

The ShopEZ backend follows the Model–View–Controller (MVC) architectural pattern. MVC is a software design approach that separates an application into three interconnected layers: Model, Controller, and View (Routes in REST APIs). This separation improves modularity, scalability, maintainability, and testability of the system.

---

## Model Layer (Data Layer)

The Model layer is responsible for handling all data-related logic and database operations.

It includes:
- Schema definition using Mongoose
- Database operations (CRUD)
- Data validation and structure enforcement

In ShopEZ, models represent key entities such as:
- Users
- Products
- Orders
- Cart

MongoDB is used as the database with Mongoose as the ODM.

---

## Controller Layer (Business Logic Layer)

The Controller layer acts as an intermediary between the Model and Routes.

It is responsible for:
- Handling incoming client requests
- Processing business logic
- Validating input data
- Calling model functions
- Sending responses back to the client

Example:
When a user adds a product to the cart, the controller processes the request and updates the database using the model.

---

## View Layer (Routes Layer)

In REST API-based applications like ShopEZ, the View layer is implemented using Express Routes.

It is responsible for:
- Defining API endpoints (GET, POST, PUT, DELETE)
- Receiving HTTP requests from the frontend
- Forwarding requests to controllers
- Returning responses to the frontend

Example routes:
- /api/products
- /api/cart
- /api/orders

---

## Advantages of MVC in ShopEZ

- Separation of Concerns → Each layer has a clear responsibility
- Scalability → Easy to add new features
- Reusability → Code in models and controllers can be reused
- Maintainability → Easier debugging and updates
- Testability → Each layer can be tested independently
- Collaboration-Friendly → Developers can work on different layers simultaneously
![alt text](image-3.png)