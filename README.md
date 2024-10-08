Deploy Link  :

https://vamshikumar32501.github.io/student-feedback-frontend/


# Student Feedback and Evaluation System

## Project Overview
The **Student Feedback and Evaluation System** is a web application that enables students to provide feedback on courses and faculty. The system has different roles: students, faculty, and administrators, each with their own dashboard and functionality.

- **Students**: Submit feedback on courses and faculties.
- **Admin**: Manage classes, subjects, students, questionnaires, and view feedback reports.
- **Faculty**: View feedback and manage personal information.

The project uses **React** for the frontend, **Spring Boot** for the backend, and **MySQL** as the database.

## Key Features
- **Student Dashboard**: Submit and view feedback, manage profile.
- **Admin Dashboard**: Manage classes, subjects, academic year, questionnaires, and view reports.
- **Faculty Dashboard**: View feedback and manage personal data.

## Technologies Used
- **Frontend**: React.js, HTML, CSS
- **Backend**: Spring Boot, Java
- **Database**: MySQL
- **Tools**: Node.js, npm, Maven

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14+)
- MySQL Server
- Java (JDK 11+)
- Maven

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-feedback-system.git
cd student-feedback-system
```

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Configure MySQL Database:
   - Create a MySQL database named `student_feedback_db`.
   - Update the `application.properties` file with your MySQL credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/student_feedback_db
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     spring.jpa.hibernate.ddl-auto=update
     ```

3. Run the backend:
   ```bash
   mvn install
   mvn spring-boot:run
   ```

### 3. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the React application:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8080`.

## Usage
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Student Dashboard**: `http://localhost:3000/student`
- **Faculty Dashboard**: `http://localhost:3000/faculty`

## Folder Structure

- **Frontend**: Contains the React components for the user interfaces (e.g., dashboards, forms, and feedback lists).
- **Backend**: Spring Boot project that handles REST APIs and business logic.
- **Database**: MySQL is used to store feedback data, user information, and related entities.



