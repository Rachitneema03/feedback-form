# FeedbackHub - College Feedback System

## Project Overview

FeedbackHub is a comprehensive web-based feedback management system designed for colleges and educational institutions. It allows students to submit feedback on various aspects of college life including courses, events, faculty, facilities, and management services.

## Project Structure

```
FeedbackHub/
│
├── index.html              # Main HTML file (integrates all components)
├── styles.css              # Complete stylesheet (all CSS in one file)
├── script.js               # Complete JavaScript (all JS in one file)
├── README.md               # Project documentation
│
├── html/                   # HTML components (organized by feature)
│   ├── 01-landing-page.html    # Landing page section
│   ├── 02-auth-page.html       # Authentication page section
│   ├── 03-dashboard-page.html  # Dashboard page section
│   └── 04-modals.html          # All modal dialogs
│
└── images/                 # Image assets
    ├── davv_gate.jpg           # Background image for hero section
    └── iips_davv_logo.jpeg     # IIPS DAVV logo for dashboard
```

## Features

### 1. Landing Page
- **Hero Section**: Attractive landing page with background image
- **Navigation**: Fixed header with logo and login button
- **Call-to-Action**: Buttons to get started or learn more

### 2. Authentication System
- **Login/Signup**: Toggle between login and signup modes
- **Google Authentication**: Mock Google login functionality
- **Form Validation**: Email and password validation
- **User Management**: In-memory user data storage

### 3. Dashboard
- **Feedback Forms Grid**: 20 different feedback form types
- **Feedback History**: View all submitted feedback
- **User Profile**: Access user profile information
- **Settings**: Manage account settings and appearance

### 4. Feedback Forms (20 Types)

#### Course-Related (5 forms)
1. College Course Review
2. Curriculum Review
3. Academic Program Review
4. Assignment Review
5. Study Material Review

#### Event-Related (5 forms)
6. College Event Review
7. Sports Event Review
8. Cultural Fest Review
9. Seminar & Workshop Review
10. Convocation Review

#### Management-Related (5 forms)
11. College Management Review
12. Student Services Review
13. Campus Security Review
14. Fee Structure Review
15. Health Services Review

#### Faculty-Related (3 forms)
16. Faculty Review
17. Teaching Methods Review
18. Office Hours Review

#### Facility-Related (2 forms)
19. Infrastructure Review
20. Library Review

### 5. Modals
- **Feedback Form Modal**: Dynamic form generation based on feedback type
- **Profile Modal**: Display user information and statistics
- **Settings Modal**: Account and appearance settings
- **Appearance Modal**: Light/Dark theme toggle
- **Delete Account Modal**: Account deletion with confirmation

### 6. Theme System
- **Light Theme**: Default light theme
- **Dark Theme**: Dark mode for better visibility
- **Theme Persistence**: Theme preference saved in sessionStorage

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and flexbox/grid
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **Bootstrap Icons**: Icon library for UI elements

## File Organization

### HTML Files
- **index.html**: Main entry point, contains all HTML sections
- **html/01-landing-page.html**: Landing page component (reference)
- **html/02-auth-page.html**: Authentication component (reference)
- **html/03-dashboard-page.html**: Dashboard component (reference)
- **html/04-modals.html**: All modals component (reference)

### CSS File
- **styles.css**: Complete stylesheet organized by sections:
  1. CSS Reset & Variables
  2. Base Styles & Typography
  3. Layout Components
  4. Landing Page Styles
  5. Authentication Page Styles
  6. Dashboard Styles
  7. Modal Styles
  8. Form Styles
  9. Button Styles
  10. Utility Classes
  11. Responsive Design

### JavaScript File
- **script.js**: Complete JavaScript organized by sections:
  1. Data Storage & Constants
  2. Initialization
  3. Page Navigation
  4. Authentication Functions
  5. Dashboard Functions
  6. Modal Management
  7. Feedback Form Handling
  8. Profile Management
  9. Settings & Theme Management
  10. Utility Functions

## How to Use

### Running the Application

1. **Open the Application**:
   - Simply open `index.html` in a web browser
   - No server or build process required

2. **Navigate the Application**:
   - Start at the landing page
   - Click "Get Started" or "Login" to access authentication
   - Create an account or login with existing credentials
   - Access the dashboard to submit feedback

3. **Submit Feedback**:
   - Browse available feedback forms in the dashboard
   - Click on any form card to open the feedback modal
   - Fill out the form with ratings and comments
   - Submit feedback

4. **View Feedback History**:
   - All submitted feedback appears in the "Your Feedback History" section
   - Feedback is sorted by date (newest first)

5. **Manage Profile**:
   - Click "My Profile" to view user information
   - Click "Settings" to manage account and appearance

## Code Structure Details

### CSS Organization
- **CSS Variables**: Used for theming and consistent styling
- **Responsive Design**: Media queries for mobile, tablet, and desktop
- **Component-Based**: Styles organized by component/feature
- **Dark Theme Support**: Comprehensive dark theme styling

### JavaScript Organization
- **Modular Functions**: Each feature has dedicated functions
- **Event-Driven**: Uses event listeners for interactivity
- **Data Management**: In-memory storage for users and feedback
- **Dynamic Content**: JavaScript generates dynamic form content

### HTML Organization
- **Semantic HTML**: Proper use of semantic elements
- **Component-Based**: Each major section is a separate component
- **Accessibility**: Proper labels and ARIA attributes
- **Comments**: Comprehensive comments for documentation

## Key Functions

### Authentication
- `handleAuthSubmit()`: Handles login/signup form submission
- `handleGoogleLogin()`: Mock Google authentication
- `toggleAuthMode()`: Switches between login and signup
- `handleLogout()`: Logs out the current user

### Dashboard
- `updateDashboard()`: Updates dashboard content
- `renderFeedbackForms()`: Renders feedback form cards
- `updateFeedbackHistory()`: Updates feedback history display

### Feedback Forms
- `openFeedbackModal()`: Opens feedback form modal
- `generateFormContent()`: Dynamically generates form fields
- `handleFeedbackSubmit()`: Handles feedback form submission
- `setupModalStarRating()`: Sets up star rating interaction

### Modals
- `openModal()`: Opens a modal dialog
- `closeModal()`: Closes a modal dialog
- `openProfileModal()`: Opens user profile modal
- `openSettingsModal()`: Opens settings modal

### Theme Management
- `applyTheme()`: Applies light or dark theme
- `setupThemeHandlers()`: Sets up theme selection handlers

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature set
- **Tablet**: Optimized layout
- **Mobile**: Mobile-friendly interface

## Data Storage

Currently, the application uses in-memory storage:
- **Users Data**: Stored in `usersData` array
- **Feedback Data**: Stored in `feedbackData` array
- **Current User**: Stored in `currentUser` variable
- **Theme Preference**: Stored in `sessionStorage`

**Note**: Data is lost on page refresh. For production, integrate with a backend API or database.

## Future Enhancements

1. **Backend Integration**: Connect to a REST API or database
2. **User Authentication**: Implement proper authentication with JWT tokens
3. **Data Persistence**: Save data to a database
4. **Admin Dashboard**: Admin panel for managing feedback
5. **Analytics**: Feedback analytics and reporting
6. **Email Notifications**: Email notifications for feedback submissions
7. **Export Functionality**: Export feedback as PDF or CSV

## Development Notes

### Code Comments
- All files include comprehensive comments
- Section headers for easy navigation
- Function descriptions where needed

### Code Style
- Consistent naming conventions
- Proper indentation and formatting
- Modular and reusable code

### Best Practices
- Semantic HTML
- CSS variables for theming
- Event delegation where appropriate
- Error handling in forms

## Author

**Student Name**  
**Course**: [Course Name]  
**Institution**: IIPS DAVV  
**Date**: [Submission Date]

## License

This project is created for academic purposes.

## Acknowledgments

- Bootstrap Icons for icon library
- DAVV for university branding
- IIPS for institutional support

---

## Submission Guidelines

This project is organized for easy submission as a hard copy:

1. **Main Files**: `index.html`, `styles.css`, `script.js`
2. **HTML Components**: Separated in `html/` folder for reference
3. **Documentation**: `README.md` for complete project documentation
4. **Images**: All images in `images/` folder

All code is well-commented and organized for easy understanding and review.

