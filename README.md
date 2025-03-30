# Task-Management-System


##  Project Overview

The **Task Management System** is a full-stack web application built with the **MERN (MongoDB, Express, React, Node.js) stack**. It allows users to **create, update, delete, and manage tasks efficiently**, with authentication features for secure access.

##  Features

###  Authentication

- User **Registration & Login** with JWT authentication(role based)
- Protected Routes for authorized access
- Secure **password hashing** using bcrypt.js

###  Task Management

- **Create, Read, Update, Delete (CRUD) operations** for tasks
- Task attributes: **Title, Description, Priority, Due Date, Status**
- **Priority Badges** (High - Red, Medium - Blue, Low - Grey)
- **Status Indicator** (Completed - Green, Incomplete - Yellow)
- Tasks displayed in **card format with hover effects**
- Tasks details view page

###  Search & Filtering

- **Search tasks by title** on the homepage

###  Dashboard

- Shows **User Information**
- **Logout Functionality**

##  Tech Stack

- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB 
- **Authentication:** JWT (JSON Web Token)

---

##  Installation & Setup

###  Clone the Repository

```sh
https://github.com/Nafi14078/Task-Management-System.git
cd task-management-system
```

###  Install Dependencies

#### Backend Setup

```sh
cd backend
npm install
```

#### Frontend Setup

```sh
cd frontend
npm install
```

###  Setup Environment Variables

Create a **.env** file in the `backend` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Create a **.env** file in the `frontend` folder and add the following:

```env
REACT_APP_API_URL=your api
```

###  Run the Application

#### Start the Backend Server

```sh
cd backend
node server.js
```

#### Start the Frontend

```sh
cd frontend
npm start
```

## License

This project is licensed under the **MIT License**.

---

##  Contributing

Feel free to **fork** this repository and submit pull requests.

---


