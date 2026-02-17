# API Documentation

Base URL: `/api/v1`  
Auth: JWT via `Authorization: Bearer <token>`  
All IDs are UUIDs.

## Route Inventory

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | Public | API health check. |
| POST | `/auth/register` | Public | Register a new account. |
| POST | `/auth/login` | Public | Login and return JWT token. |
| GET | `/services` | Public | List active and verified services with filters/pagination. |
| GET | `/services/:id` | Public | Get single service by ID. |
| GET | `/reviews/:serviceId` | Public | List reviews for a service. |
| GET | `/users/profile` | Auth | Get current user profile. |
| PUT | `/users/profile` | Auth | Update current user profile. |
| POST | `/services` | Auth | Create service (provider only). |
| PUT | `/services/:id` | Auth | Update service (owner/admin). |
| DELETE | `/services/:id` | Auth | Delete service (owner/admin). |
| POST | `/bookings` | Auth | Create booking (customer only). |
| GET | `/bookings` | Auth | List bookings by current user role. |
| GET | `/bookings/:id` | Auth | Get booking by ID (authorized user only). |
| PATCH | `/bookings/:id/confirm` | Auth | Confirm booking (provider/admin). |
| PATCH | `/bookings/:id/complete` | Auth | Complete booking (provider/admin). |
| PATCH | `/bookings/:id/cancel` | Auth | Cancel booking (customer/provider/admin). |
| POST | `/reviews` | Auth | Create review (customer + completed booking required). |
| POST | `/providers/verification` | Auth | Submit provider verification documents. |
| GET | `/providers/verification` | Auth | Get current provider verification status. |
| POST | `/uploads` | Auth | Upload file to MinIO (if configured). |
| GET | `/admin/users` | Admin | List all users. |
| PATCH | `/admin/users/:id/role` | Admin | Update user role. |
| GET | `/admin/services/pending` | Admin | List pending services. |
| PATCH | `/admin/services/:id/verify` | Admin | Moderate service status flags. |
| GET | `/admin/providers/verification/pending` | Admin | List pending provider verifications. |
| PATCH | `/admin/providers/verification/:id` | Admin | Approve/reject provider verification. |

## Health

### GET `/health`

Response:

```json
{
  "status": "OK",
  "message": "the api is healthy"
}
```

## Authentication

### POST `/auth/register`

Request:

```json
{
  "username": "user_name",
  "firstName": "First",
  "lastName": "Last",
  "email": "user@example.com",
  "password": "password",
  "phoneNumber": "+212...",
  "city": "Casablanca",
  "address": "optional",
  "userType": "customer"
}
```

Notes:
- `userType`: `customer`, `professional`, `company`

### POST `/auth/login`

Request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Success response:

```json
{
  "message": "Login successful",
  "token": "JWT_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user",
    "userType": "customer"
  }
}
```

## Services

### GET `/services`

Query params:
- `page` (default `1`)
- `limit` (default `20`, max `100`)
- `q`
- `category`
- `city`
- `minPrice`
- `maxPrice`
- `priceUnit` (`hour`, `job`, `day`)
- `providerId`
- `sort` (`newest`, `oldest`, `price_asc`, `price_desc`, `rating_desc`)

Response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

### POST `/services`

Provider/company only.

Request example:

```json
{
  "title": "Electrical Repair",
  "description": "Professional electrical repair services.",
  "priceAmount": 150,
  "priceCurrency": "MAD",
  "priceUnit": "job",
  "category": "Electrical",
  "city": "Marrakech",
  "images": ["https://storage.example.com/uploads/service-image/file.jpg"]
}
```

Notes:
- At least one image is required.
- Category must be one of supported backend categories.

## Uploads

### POST `/uploads`

`multipart/form-data` fields:
- `file` (required)
- `purpose` (required): `service-image`, `profile-image`, `provider-doc`, `service-video`, `service-audio`

Max file size: 10MB.

## Provider Verification

### POST `/providers/verification`

Request:

```json
{
  "documentType": "id_card",
  "documentUrls": ["http://.../uploads/provider-doc/file.png"],
  "notes": "Optional"
}
```

`documentType`: `id_card`, `passport`, `license`, `business_registration`, `certificate`

### PATCH `/admin/providers/verification/:id`

Request:

```json
{
  "status": "verified",
  "reviewNotes": "Approved."
}
```

`status`: `verified` or `rejected`

## Error Codes

- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict (register flow)
- `500` Internal Server Error
