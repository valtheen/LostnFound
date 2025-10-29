# Lost n Found Frontend - Complete Setup

## 📁 Project Structure

```
LostnFound-FE/
├── 📄 package.json          # Dependencies and scripts
├── 📄 README.md             # Project documentation
├── 🔧 install.sh            # Installation script
├── 📁 public/               # Static files directory
└── 📁 src/                  # Source code
    ├── 📄 index.html        # Landing page
    ├── 📁 pages/            # Application pages
    │   ├── 📄 login.html
    │   ├── 📄 signup.html
    │   ├── 📄 dashboard.html
    │   ├── 📄 pelaporan.html
    │   └── 📄 list-barang.html
    ├── 📁 assets/           # Static assets
    │   ├── 📁 css/          # Stylesheets
    │   │   ├── 📄 login.css
    │   │   ├── 📄 signup.css
    │   │   ├── 📄 dashboard.css
    │   │   ├── 📄 pelaporan.css
    │   │   └── 📄 list-barang.css
    │   ├── 📁 js/           # JavaScript files
    │   │   ├── 📄 api-config.js
    │   │   ├── 📄 login.js
    │   │   ├── 📄 signup.js
    │   │   ├── 📄 dashboard.js
    │   │   ├── 📄 pelaporan.js
    │   │   └── 📄 list-barang.js
    │   └── 📁 images/       # Image assets
    └── 📁 components/       # Reusable components
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd LostnFound-FE
./install.sh
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Application
Open your browser and navigate to: `http://localhost:3000`

## 🔗 Backend Integration

The frontend is configured to communicate with the Spring Boot backend running on `http://localhost:8080`.

### API Endpoints Used:
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/barang` - Get all items
- `POST /api/pelaporan` - Submit new report
- `GET /api/barang/stats` - Dashboard statistics
- `GET /api/barang/recent` - Recent activity

## 📱 Features

### ✅ Authentication System
- User login with email/password
- User registration with validation
- JWT token-based session management
- Automatic redirect for unauthenticated users

### ✅ Dashboard
- Statistics overview (total items, lost/found counts)
- Recent activity feed
- Responsive grid layout
- Real-time data updates

### ✅ Item Reporting
- Comprehensive form with validation
- Image upload functionality
- Success feedback with popup
- Form reset after submission

### ✅ Item Listing
- Search and filter functionality
- Pagination for large datasets
- Status indicators (lost/found)
- Responsive table design

### ✅ Responsive Design
- Mobile-first approach
- Cross-browser compatibility
- Modern UI with smooth animations
- Accessible design patterns

## 🛠️ Development

### Available Scripts:
- `npm start` - Start production server
- `npm run dev` - Start development server with CORS
- `npm run serve` - Start server without auto-open
- `npm run build` - Build for production (placeholder)
- `npm test` - Run tests (placeholder)

### Browser Support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Configuration

### API Configuration
The API base URL and endpoints are configured in `src/assets/js/api-config.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',
    ENDPOINTS: {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        ITEMS: '/barang',
        REPORTS: '/pelaporan',
        // ... more endpoints
    }
};
```

### Authentication
- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Session validation on page load

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on port 8080
- Modern web browser

## 🎯 Next Steps

1. **Start Backend**: Ensure your Spring Boot backend is running
2. **Install Frontend**: Run the installation script
3. **Test Integration**: Verify API communication
4. **Customize**: Modify styles and functionality as needed
5. **Deploy**: Configure for production deployment

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Errors**: Use `npm run dev` for development with CORS enabled
2. **API Connection**: Verify backend is running on port 8080
3. **Authentication**: Check token storage in browser dev tools
4. **File Upload**: Ensure proper FormData handling

### Support:
- Check browser console for errors
- Verify network requests in dev tools
- Ensure all dependencies are installed
- Check backend logs for API errors
