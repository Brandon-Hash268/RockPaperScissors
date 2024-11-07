# gp-p2

# IP-RMT54

<!-- [![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16526947&assignment_repo_type=AssignmentRepo) -->

# Group Project (Server Side)

# Jankenpon API Documentation

#  [BASE URL](https://jankenpon.alifnaufaldo.online/)

## Models:

_User_

- userName: string
- win: integer
- lose: integer

_GameSession_

- PlayerId1: integer
- PlayerId2: integer
- PlayerMove1: string
- PlayerMove2: string
- result: string

## Relationship:

### **One-to-Many**

Relasi antara `User` dan `GameSession`, dimana satu user bisa memiliki banyak gamesession.

---

## Endpoints:

List of available endpoints:

### User Endpoints:

- `POST /login`
- `GET /users/:id`

---

## 1. User Endpoints:

### 1.1. POST /register

Add a new user.

**Request:**

- Body:

```json
{
  "userName": "string"
}
```

**Response (200 - OK):**

```json
{
  "message": "User created successfully" | "User found",
  "user": {
    "id": "integer",
    "userName": "string"
  }
}
```

**Response (500):**

```json
{
  "message": "Internal Server Error"
}
```

### 1.2. GET /users/:id

Get user by id.

**Request:**

Params: integer by user id

- Body:

**Response (200 - OK):**

```json
{
  "id": "integer",
  "userName": "string",
  "win": "integer",
  "lose": "integer",
  ...
}
```

**Response (404 - User not found):**

```json
{
  "message": "User not found"
}
```

**Response (500):**

```json
{
  "message": "Internal Server Error"
}
```