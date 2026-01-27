# devTinder Backend API Documentation

A RESTful API backend for devTinder - a developer networking platform where developers can connect, share skills, and build professional relationships.

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication-endpoints)
  - [OTP Verification](#otp-verification-endpoints)
  - [Profile Management](#profile-management-endpoints)
  - [User Feed & Connections](#user-feed--connections-endpoints)
  - [Connection Requests](#connection-requests-endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Example Requests](#example-requests)

---

## Base URL

```
http://localhost:3000
```

**Note:** The API uses CORS and is configured to accept requests from `http://localhost:5173` with credentials enabled.

---

## Authentication

The API uses **Cookie-based JWT authentication**. After successful login, a JWT token is stored in an HTTP-only cookie named `token`.

### How it works:

1. **Login/Signup** → Server sets `token` cookie automatically
2. **Authenticated Requests** → Include cookies in requests (handled automatically by browsers)
3. **Logout** → Cookie is cleared

### Important Notes:

- Cookies are **HTTP-only** and **secure** (in production)
- Token expires after **7 days**
- For authenticated endpoints, ensure cookies are sent with requests
- In frontend, use `credentials: 'include'` in fetch/axios requests

### Example Axios Configuration:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Important: Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## API Endpoints

### Authentication Endpoints

#### 1. User Signup

Create a new user account.

**Endpoint:** `POST /signup`

**Authentication:** Not required

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "gender": "male"
}
```

**Validation Rules:**
- `firstName`: Required, 1-20 characters
- `lastName`: Required, 1-20 characters
- `email`: Required, valid email format, unique
- `password`: Required, strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol)
- `gender`: Required, must be `"male"`, `"female"`, or `"other"`

**Success Response (200):**
```json
{
  "status": 200,
  "message": "signup successfully"
}
```

**Error Response (400):**
```json
{
  "status": 400,
  "message": "Error message here"
}
```

---

#### 2. User Login

Authenticate user and receive JWT token (stored in cookie).

**Endpoint:** `POST /login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "message": "login successfully",
  "status": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "gender": "male",
    "age": 25,
    "photoUrl": "https://example.com/photo.jpg",
    "about": "Full stack developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "connections": [],
    "createdAt": "2026-01-26T10:00:00.000Z",
    "updatedAt": "2026-01-26T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid credentials / Email not found
- `404`: Invalid credentials (wrong password)

---

#### 3. User Logout

Clear authentication cookie.

**Endpoint:** `POST /logout`

**Authentication:** Not required

**Success Response (200):**
```json
{
  "status": 200,
  "message": "logout successfully"
}
```

---

### OTP Verification Endpoints

#### 4. Send OTP

Send a 6-digit OTP to the provided email address. Used for email verification during signup.

**Endpoint:** `POST /otp/send-otp`

**Authentication:** Not required

**Rate Limiting:** Yes (prevents spam/abuse)

**Request Body:**
```json
{
  "email": "newuser@example.com"
}
```

**Validation:**
- `email`: Required, valid email format
- Email must not already be registered (user must not exist)

**Success Response (200):**
```json
{
  "status": 200,
  "message": "OTP sent successfully"
}
```

**Error Responses:**
- `400`: Invalid email / User already exists

**Notes:**
- OTP is valid for **5 minutes**
- OTP is sent via email using AWS SES
- Rate limiting is applied to prevent abuse

---

#### 5. Verify OTP

Verify the OTP code sent to the email.

**Endpoint:** `POST /otp/verify-otp`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "otp verified successfully"
}
```

**Error Response (400):**
```json
{
  "status": 400,
  "message": "invalid otp"
}
```

**Notes:**
- OTP is deleted after successful verification
- OTP expires after 5 minutes

---

### Profile Management Endpoints

#### 6. Get User Profile

Get the authenticated user's complete profile.

**Endpoint:** `GET /profile/view`

**Authentication:** Required (Cookie)

**Success Response (200):**
```json
{
  "status": 200,
  "message": "profile data fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "gender": "male",
    "age": 25,
    "photoUrl": "https://example.com/photo.jpg",
    "about": "Full stack developer passionate about React and Node.js",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
    "connections": ["507f1f77bcf86cd799439012"],
    "createdAt": "2026-01-26T10:00:00.000Z",
    "updatedAt": "2026-01-26T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "status": 404,
  "message": "Error message"
}
```

---

#### 7. Update User Profile

Update the authenticated user's profile information.

**Endpoint:** `PATCH /profile/edit`

**Authentication:** Required (Cookie)

**Editable Fields:**
- `firstName` (max 20 characters)
- `lastName` (max 20 characters)
- `gender` ("male", "female", "other")
- `age` (18-150)
- `skills` (array of strings, max 20 skills, each skill max 20 chars)
- `about` (max 1000 characters)
- `photoUrl` (valid URL)

**Note:** `email` and `password` cannot be updated via this endpoint.

**Request Body:**
```json
{
  "firstName": "Jane",
  "age": 26,
  "skills": ["TypeScript", "Next.js", "GraphQL"],
  "about": "Updated bio here"
}
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "user profile is updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 26,
    "skills": ["TypeScript", "Next.js", "GraphQL"],
    "about": "Updated bio here",
    "updatedAt": "2026-01-26T11:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "status": 404,
  "message": "Error message"
}
```

---

### User Feed & Connections Endpoints

#### 8. Get User Feed

Get a paginated list of users for the feed (excluding already connected users and current user).

**Endpoint:** `GET /user/feeds`

**Authentication:** Required (Cookie)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 50)
- `startage` (optional): Minimum age filter
- `endage` (optional): Maximum age filter
- `gender` (optional): Filter by gender ("male", "female", "other")
- `skills` (optional): Comma-separated skills to filter (e.g., "JavaScript,React")

**Example Request:**
```
GET /user/feeds?page=1&limit=20&startage=20&endage=30&gender=male&skills=JavaScript,React
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "user fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "Alice",
      "lastName": "Smith",
      "age": 28,
      "photoUrl": "https://example.com/alice.jpg",
      "about": "Frontend developer",
      "gender": "female"
    }
  ],
  "count": 1,
  "page": 1,
  "limit": 20
}
```

**Error Response (400):**
```json
{
  "status": 400,
  "message": "Error message"
}
```

---

#### 9. Get Received Connection Requests

Get all connection requests received by the authenticated user (status: "interested").

**Endpoint:** `GET /user/requests/receive`

**Authentication:** Required (Cookie)

**Success Response (200):**
```json
{
  "status": 200,
  "message": "successfully get the data",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "fromUserId": {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "Alice",
        "lastName": "Smith",
        "age": 28,
        "photoUrl": "https://example.com/alice.jpg",
        "about": "Frontend developer",
        "gender": "female"
      },
      "toUserId": "507f1f77bcf86cd799439011",
      "status": "interested",
      "createdAt": "2026-01-26T10:00:00.000Z"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "status": 400,
  "message": "Error message"
}
```

---

#### 10. Get User Connections

Get all accepted connections for the authenticated user.

**Endpoint:** `GET /user/connection`

**Authentication:** Required (Cookie)

**Success Response (200):**
```json
{
  "status": 200,
  "message": "data fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "fromUserId": {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "Alice",
        "lastName": "Smith",
        "age": 28,
        "photoUrl": "https://example.com/alice.jpg",
        "about": "Frontend developer",
        "gender": "female"
      },
      "toUserId": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "age": 25,
        "photoUrl": "https://example.com/john.jpg",
        "about": "Full stack developer",
        "gender": "male"
      },
      "status": "accepted",
      "createdAt": "2026-01-26T10:00:00.000Z"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "status": 400,
  "message": "Error message"
}
```

---

### Connection Requests Endpoints

#### 11. Send Connection Request

Send a connection request to another user (interested or ignored).

**Endpoint:** `POST /request/send/:status/:toUserId`

**Authentication:** Required (Cookie)

**URL Parameters:**
- `status`: Must be `"interested"` or `"ignored"`
- `toUserId`: MongoDB ObjectId of the target user

**Example Request:**
```
POST /request/send/interested/507f1f77bcf86cd799439012
```

**Success Response (200):**
```json
{
  "message": "John interested in Alice",
  "status": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "fromUserId": "507f1f77bcf86cd799439011",
    "toUserId": "507f1f77bcf86cd799439012",
    "status": "interested",
    "createdAt": "2026-01-26T10:00:00.000Z",
    "updatedAt": "2026-01-26T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid status / Request already exists / Invalid receiver
- `401`: User not authenticated

**Notes:**
- Cannot send request to yourself
- If a request already exists (in any direction), returns error
- Email notification is sent to the receiver

---

#### 12. Review Connection Request

Accept or reject a received connection request.

**Endpoint:** `POST /request/review/:status/:connectionId`

**Authentication:** Required (Cookie)

**URL Parameters:**
- `status`: Must be `"accepted"` or `"rejected"`
- `connectionId`: MongoDB ObjectId of the connection request

**Example Request:**
```
POST /request/review/accepted/507f1f77bcf86cd799439020
```

**Success Response (200):**
```json
{
  "status": 200,
  "message": "request is accepted",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "connections": ["507f1f77bcf86cd799439012"],
    "updatedAt": "2026-01-26T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid status / Connection not found / Invalid credentials

**Notes:**
- Only the receiver can review the request
- When accepted, both users are added to each other's `connections` array
- Transaction is used to ensure data consistency

---

#### 13. Get Connected Developers

Get all developers connected to the authenticated user.

**Endpoint:** `GET /request/connectedDeveloper`

**Authentication:** Required (Cookie)

**Success Response (200):**
```json
{
  "status": 200,
  "message": "connections fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "Alice",
      "lastName": "Smith",
      "photoUrl": "https://example.com/alice.jpg",
      "about": "Frontend developer",
      "skills": ["React", "TypeScript"]
    }
  ]
}
```

**Empty Response (200):**
```json
{
  "status": 200,
  "message": "successful",
  "data": []
}
```

**Error Response (400/401):**
```json
{
  "status": 400,
  "message": "Error message"
}
```

---

## Data Models

### User Model

```typescript
{
  _id: ObjectId,
  firstName: string (1-20 chars, required),
  lastName: string (1-20 chars, required),
  email: string (unique, lowercase, required),
  password: string (hashed, required),
  gender: "male" | "female" | "other" (required),
  age: number (18-150, optional),
  photoUrl: string (URL, default: default image),
  about: string (max 1000 chars, default: "without about"),
  skills: string[] (max 20 items, each max 20 chars, optional),
  connections: ObjectId[] (references to User, optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Connection Request Model

```typescript
{
  _id: ObjectId,
  fromUserId: ObjectId (ref: User, required),
  toUserId: ObjectId (ref: User, required),
  status: "ignored" | "interested" | "accepted" | "rejected" (required),
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Model

```typescript
{
  _id: ObjectId,
  email: string (unique, validated, required),
  otp: string (6 digits, required),
  createdAt: Date (expires after 5 minutes)
}
```

---

## Error Handling

All API responses follow a consistent format:

### Success Response Format:
```json
{
  "status": 200,
  "message": "Success message",
  "data": { /* response data */ }
}
```

### Error Response Format:
```json
{
  "status": 400 | 401 | 404,
  "message": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes:

- `200`: Success
- `400`: Bad Request (validation errors, invalid input)
- `401`: Unauthorized (authentication required)
- `404`: Not Found (resource not found)

---

## Example Requests

### Using Fetch API

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

// Get Profile (authenticated)
const getProfile = async () => {
  const response = await fetch('http://localhost:3000/profile/view', {
    method: 'GET',
    credentials: 'include', // Include auth cookie
  });
  return await response.json();
};

// Send Connection Request
const sendConnectionRequest = async (status, toUserId) => {
  const response = await fetch(
    `http://localhost:3000/request/send/${status}/${toUserId}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );
  return await response.json();
};
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login
const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

// Get Profile
const getProfile = async () => {
  const response = await api.get('/profile/view');
  return response.data;
};

// Update Profile
const updateProfile = async (profileData) => {
  const response = await api.patch('/profile/edit', profileData);
  return response.data;
};

// Get Feed
const getFeed = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/user/feeds?${params}`);
  return response.data;
};
```

---

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- AWS SES credentials (for email functionality)

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ACCESS_KEY_ID=your_aws_access_key_id
SECRET_ACCESS_KEY=your_aws_secret_access_key
```

### Installation

```bash
cd backend
npm install
npm run dev
```

---

## Support

For issues or questions, please contact the backend team or create an issue in the repository.

---

**Last Updated:** January 26, 2026
