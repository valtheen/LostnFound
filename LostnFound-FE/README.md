# Lost n Found Frontend

Frontend application for the Lost n Found system built with vanilla HTML, CSS, and JavaScript.

## Features

- **User Authentication**: Login and Signup functionality
- **Dashboard**: Overview of statistics and recent activity
- **Item Reporting**: Report lost or found items with image upload
- **Item Listing**: Browse and search through reported items
- **Responsive Design**: Mobile-friendly interface
- **Backend Integration**: RESTful API integration with Spring Boot backend

## Project Structure

```
LostnFound-FE/
├── src/
│   ├── pages/           # HTML pages
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── dashboard.html
│   │   ├── pelaporan.html
│   │   └── list-barang.html
│   ├── assets/
│   │   ├── css/         # Stylesheets
│   │   │   ├── login.css
│   │   │   ├── signup.css
│   │   │   ├── dashboard.css
│   │   │   ├── pelaporan.css
│   │   │   └── list-barang.css
│   │   ├── js/          # JavaScript files
│   │   │   ├── login.js
│   │   │   ├── signup.js
│   │   │   ├── dashboard.js
│   │   │   ├── pelaporan.js
│   │   │   └── list-barang.js
│   │   └── images/      # Image assets
│   └── index.html       # Landing page
├── public/             # Static files
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd LostnFound-FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Development

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`

## API Integration

The frontend integrates with the Spring Boot backend through RESTful APIs:

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Item Management Endpoints
- `GET /api/barang` - Get all items
- `POST /api/pelaporan` - Submit new report
- `GET /api/barang/stats` - Get dashboard statistics
- `GET /api/barang/recent` - Get recent activity

### Authentication
- JWT tokens are stored in localStorage
- All API requests include Authorization header
- Automatic redirect to login if token is invalid

## Features Overview

### 1. Authentication System
- **Login Page**: Email/password authentication with Google OAuth placeholder
- **Signup Page**: User registration with validation
- **Session Management**: JWT token-based authentication

### 2. Dashboard
- **Statistics Cards**: Total items, lost items, found items, total reports
- **Recent Activity**: Latest reported items
- **Responsive Grid**: Mobile-friendly layout

### 3. Item Reporting
- **Form Validation**: Client-side validation for all fields
- **File Upload**: Image upload for items
- **Success Feedback**: Popup confirmation after submission

### 4. Item Listing
- **Search Functionality**: Real-time search through items
- **Pagination**: Efficient data loading
- **Status Indicators**: Visual status badges for lost/found items

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
