
# API Documentation

## Authentication

### POST /login
- **Description**: Log in a user and create a session.
- **Request Body**:
  ```json
  {
    "username": "user_name",
    "password": "user_password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_token_here"
  }
  ```
  - **Success Response**: HTTP Status 200 OK
  - **Error Response**: HTTP Status 401 Unauthorized

### POST /register
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "new_user",
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Response**:
  - **201 Created**: User created successfully.
  - **400 Bad Request**: If required fields are missing or invalid.

## Users

### GET /users/{id}
- **Description**: Retrieve user details by ID.
- **URL Parameters**:
  - `id`: User's unique ID.
- **Response**:
  ```json
  {
    "id": "12345",
    "username": "user_name",
    "email": "user@example.com"
  }
  ```
  - **Success Response**: HTTP Status 200 OK
  - **Error Response**: HTTP Status 404 Not Found

### PUT /users/{id}
- **Description**: Update user details.
- **URL Parameters**:
  - `id`: User's unique ID.
- **Request Body**:
  ```json
  {
    "username": "new_user_name",
    "email": "new_email@example.com"
  }
  ```
- **Response**:
  - **200 OK**: User details updated successfully.
  - **400 Bad Request**: If required fields are invalid.

## Services

### GET /services
- **Description**: Get a list of all available services.
- **Query Parameters**:
  - `category`: Filter by service category (optional).
  - `location`: Filter by location (optional).
- **Response**:
  ```json
  [
    {
      "id": "1",
      "name": "Plumbing",
      "description": "Expert plumbing services.",
      "price": "100",
      "location": "Casablanca"
    },
    {
      "id": "2",
      "name": "Cleaning",
      "description": "House and office cleaning services.",
      "price": "50",
      "location": "Rabat"
    }
  ]
  ```
  - **Success Response**: HTTP Status 200 OK
  - **Error Response**: HTTP Status 500 Internal Server Error

### POST /services
- **Description**: Create a new service listing (admin only).
- **Request Body**:
  ```json
  {
    "name": "Electrical Repair",
    "description": "Professional electrical repair services.",
    "price": "150",
    "location": "Marrakech",
    "category": "Repair"
  }
  ```
- **Response**:
  - **201 Created**: Service created successfully.
  - **400 Bad Request**: If required fields are missing or invalid.

## Posts & Comments

### GET /posts
- **Description**: Retrieve a list of all posts.
- **Query Parameters**:
  - `filter`: Filter posts by category or user ID (optional).
  - `limit`: Limit the number of posts returned (optional).
- **Response**:
  ```json
  [
    {
      "id": "1",
      "title": "Need a plumber",
      "body": "Looking for a plumber in Casablanca.",
      "author": "user_name",
      "created_at": "2025-02-01T12:00:00"
    },
    {
      "id": "2",
      "title": "Office cleaning request",
      "body": "Looking for office cleaning services in Rabat.",
      "author": "user_name2",
      "created_at": "2025-02-02T14:30:00"
    }
  ]
  ```
  - **Success Response**: HTTP Status 200 OK
  - **Error Response**: HTTP Status 500 Internal Server Error

### POST /posts
- **Description**: Create a new post.
- **Request Body**:
  ```json
  {
    "title": "Looking for a mechanic",
    "body": "I need a mechanic for my car in Casablanca."
  }
  ```
- **Response**:
  - **201 Created**: Post created successfully.
  - **400 Bad Request**: If required fields are missing or invalid.

### POST /posts/{post_id}/comments
- **Description**: Add a comment to a post.
- **URL Parameters**:
  - `post_id`: ID of the post.
- **Request Body**:
  ```json
  {
    "comment": "I can help with that!"
  }
  ```
- **Response**:
  - **201 Created**: Comment added successfully.
  - **400 Bad Request**: If comment is missing or invalid.

## Reviews & Ratings

### POST /reviews
- **Description**: Submit a review for a service.
- **Request Body**:
  ```json
  {
    "service_id": "1",
    "rating": 5,
    "review": "Excellent plumbing services!"
  }
  ```
- **Response**:
  - **201 Created**: Review submitted successfully.
  - **400 Bad Request**: If rating is missing or invalid.

### GET /reviews/{service_id}
- **Description**: Get all reviews for a specific service.
- **URL Parameters**:
  - `service_id`: ID of the service.
- **Response**:
  ```json
  [
    {
      "user": "user_name",
      "rating": 5,
      "review": "Great service, highly recommend!"
    },
    {
      "user": "user_name2",
      "rating": 4,
      "review": "Good service, but a little expensive."
    }
  ]
  ```
  - **Success Response**: HTTP Status 200 OK
  - **Error Response**: HTTP Status 404 Not Found

## Notifications (WebSockets)

### WebSocket /notifications
- **Description**: Real-time notifications for users (e.g., new messages, service updates).
- **Connection**: WebSocket connection initiated with the server to listen for notifications.
- **Message**:
  ```json
  {
    "type": "service_update",
    "message": "Your plumbing request has been accepted!"
  }
  ```

## Error Codes

- **400 Bad Request**: Invalid input data.
- **401 Unauthorized**: Authentication required or failed.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server error, please try again later.
