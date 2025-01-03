# GoHelp Project

GoHelp is a service management platform that allows users to request services from providers, enabling seamless interactions between customers and service providers. This project includes features like user authentication, service management, and a responsive dashboard.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Enhancements](#enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Source Outcome](#source-outcome)

---

## Features
- User and Service Provider authentication.
- 24-hour session persistence for logged-in users.
- Service request creation and management.
- Real-time dashboard for tracking requests.
- Responsive design for mobile and desktop.
- Role-based access control (User/Provider).

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Hetvik0907/gohelp.gi
   cd gohelp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Visit the application at [http://localhost:8080](http://localhost:3000).

---

## Usage

### User Authentication
- **Login**: Users and service providers can log in to access their respective dashboards.
- **Session Persistence**: Once logged in, users remain authenticated for 24 hours without needing to log in again.

### Service Management
- **Request Services**: Users can submit requests for specific services.
- **Dashboard**: Track pending and completed requests in real time.

---

## Technologies Used

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: Object Data Modeling (ODM) library.

### Frontend
- **EJS**: Templating engine.
- **Bootstrap**: Responsive design framework.

### Other Tools
- **express-session**: Session management.
- **Moment.js**: Time and date formatting.
- **Cloudinary**: Image upload and storage.

---

## Project Structure
```
GoHelp/
|-- models/          # Mongoose schemas
|-- routes/          # Express routes
|-- views/           # EJS templates
|-- public/          # Static files (CSS, JS, Images)
|-- app.js           # Main application file
|-- .env             # Environment variables
|-- package.json     # Project metadata
```

---

## API Endpoints

### Authentication
- `POST /login` - User login.
- `GET /logout` - Logout and destroy session.

### Service Management
- `POST /gohelp/serviceproviders` - Add a new service provider.
- `GET /dashboard` - Access user or provider dashboard.

### Requests
- `GET /requests` - View all requests.
- `POST /requests` - Create a new service request.

---

## Enhancements
1. **Implement JWT Authentication**: Replace session-based authentication for scalability.
2. **Email Notifications**: Notify users and providers about request updates.
3. **Role Management**: Add admin functionality for better control.
4. **Real-Time Updates**: Integrate WebSockets for live request status updates.

---

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature-name'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Source Outcome


Below are the visual outcomes of the GoHelp project:
![Screenshot 2025-01-03 124345](https://github.com/user-attachments/assets/505a32b6-92dd-46db-95c8-e12135b3e517)

![Screenshot 2025-01-03 124403](https://github.com/user-attachments/assets/ebcc7987-64a3-4279-821d-47ad16ca9018)

![Screenshot 2025-01-03 124556](https://github.com/user-attachments/assets/b6d22052-228b-451c-a5cd-aaa54c4c27ff)

![Screenshot 2025-01-03 124531](https://github.com/user-attachments/assets/5a2d7618-1cc9-4cb7-a55c-c8aa63bfaf10)

![Screenshot 2025-01-03 125118](https://github.com/user-attachments/assets/82f87f78-c71a-4531-8510-f99cb1972848)

![Screenshot 2025-01-03 125215](https://github.com/user-attachments/assets/bcd2567a-f0b2-497c-9f74-5690b8dbf68d)

![Screenshot 2025-01-03 125720](https://github.com/user-attachments/assets/79729f5a-9857-4552-a40c-8403c23f02b1)

![WhatsApp Image 2025-01-03 at 13 42 43_eeb98fa2](https://github.com/user-attachments/assets/40c841a9-105c-4d79-aa2d-4448a2892961)
![WhatsApp Image 2025-01-03 at 13 42 45_7e14ca54](https://github.com/user-attachments/assets/264936c4-782e-4167-8936-66933086baed)
![WhatsApp Image 2025-01-03 at 13 42 44_e109aff7](https://github.com/user-attachments/assets/e57667c5-69c0-4e41-ac55-7be2de51a4fe)

