# API Documentation

Base URL: `/api/v1`

Authentication uses JWT via the `Authorization: Bearer <token>` header.

## Health

### GET /health
- **Description**: Health check.
- **Response**:
  ```json
  {
    "status": "ok",
    "db": "postgres"
  }
  ```

## Authentication

### POST /auth/register
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "user_name",
    "firstName": "First",
    "lastName": "Last",
    "email": "user@example.com",
    "password": "password",
    "phoneNumber": "+212...",
    "city": "Casablanca",
    "address": "optional_address",
    "userType": "customer"
  }
  ```
- **Response**:
  - **201 Created**: User created successfully.
  - **409 Conflict**: User already exists.

### POST /auth/login
- **Description**: Log in a user and create a session.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "user_password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "JWT_token_here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "user",
      "userType": "customer"
    }
  }
  ```
  - **Success Response**: HTTP Status 200 OK
  - **Error Response**: HTTP Status 401 Unauthorized

## Users (Auth Required)

### GET /users/profile
- **Description**: Retrieve the authenticated user profile.
- **Response**: User object.

### PUT /users/profile
- **Description**: Update the authenticated user profile.
- **Request Body**:
  ```json
  {
    "firstName": "Updated",
    "lastName": "Name",
    "phoneNumber": "+212...",
    "city": "Casablanca"
  }
  ```
- **Response**:
  - **200 OK**: User updated successfully.
  - **400 Bad Request**: If required fields are invalid.

## Services

### GET /services
- **Description**: Get a list of all services.
- **Response**: Array of service objects.

### GET /services/{id}
- **Description**: Retrieve a service by ID.
- **Response**: Service object.

### POST /services
- **Description**: Create a new service listing.
- **Notes**: Intended for professional accounts (`userType: professional`).
- **Auth**: Required.
- **Request Body**:
  ```json
  {
    "title": "Electrical Repair",
    "description": "Professional electrical repair services.",
    "priceAmount": 150,
    "priceCurrency": "MAD",
    "priceUnit": "job",
    "category": "Electrical",
    "city": "Marrakech"
  }
  ```
- **Response**:
  - **201 Created**: Service created successfully.
  - **400 Bad Request**: If required fields are missing or invalid.

### PUT /services/{id}
- **Description**: Update a service listing.
- **Auth**: Required.

### DELETE /services/{id}
- **Description**: Delete a service listing.
- **Auth**: Required.

## Bookings (Auth Required)

### POST /bookings
- **Description**: Create a booking for a service (customers only).
- **Request Body**:
  ```json
  {
    "serviceId": 1,
    "scheduledAt": "2026-02-16T10:00:00Z",
    "notes": "Please call before arrival."
  }
  ```
- **Response**:
  - **201 Created**: Booking created successfully.
  - **400 Bad Request**: Invalid input or service unavailable.

### GET /bookings
- **Description**: List bookings for the authenticated user.
  - Customers see their bookings.
  - Professionals/companies see bookings for their services.

### GET /bookings/{id}
- **Description**: Retrieve a booking by ID (owner or provider only).

## Reviews

### POST /reviews
- **Description**: Submit a review for a service (customers only).
- **Auth**: Required.
- **Request Body**:
  ```json
  {
    "serviceId": 1,
    "rating": 5,
    "comment": "Excellent service!"
  }
  ```
- **Response**:
  - **201 Created**: Review submitted successfully.
  - **400 Bad Request**: Invalid input.

### GET /reviews/{serviceId}
- **Description**: Get all reviews for a specific service.

## Error Codes

- **400 Bad Request**: Invalid input data.
- **401 Unauthorized**: Authentication required or failed.
- **403 Forbidden**: Not allowed for the current user.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server error, please try again later.

## Planned (Not Implemented Yet)
- Notifications/WebSockets
- Posts and comments
