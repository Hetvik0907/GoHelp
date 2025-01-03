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

1. **Login Page**:
   - A responsive login page for users and service providers.
   ![Login Page](https://via.placeholder.com/800x400?text=Login+Page+Screenshot)

2. **Dashboard**:
   - A user dashboard showcasing pending and completed service requests.
   ![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

3. **Service Request Form**:
   - A simple form to request services from providers.
   ![Service Request Form](https://via.placeholder.com/800x400?text=Service+Request+Form+Screenshot)

4. **Admin Panel**:
   - A role-based admin panel to manage users and requests.
   ![Admin Panel](https://via.placeholder.com/800x400?text=Admin+Panel+Screenshot)

Add your screenshots to the `public/images` directory and update the paths above.

##Source Outcome
below are the visual outcomes of the GoHelp project:

-->Login Page:
A responsive login page for users and service providers.

-->Dashboard:
A user dashboard showcasing pending and completed service requests.

-->Service Request Form:
A simple form to request services from providers.

-->Admin Panel:
A role-based admin panel to manage users and requests.
