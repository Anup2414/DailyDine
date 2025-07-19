# 📁 DailyDine Project - Complete Folder Structure

```
dailydine/
├── 📄 .env                                    # Frontend environment variables
├── 📄 .editorconfig                          # Editor configuration
├── 📄 .gitignore                             # Git ignore rules
├── 📄 .nvmrc                                 # Node version specification
├── 📄 .prettierignore                        # Prettier ignore rules
├── 📄 package.json                           # Frontend package configuration
├── 📄 package-lock.json                      # Frontend dependency lock file
├── 📄 prettier.config.js                     # Prettier configuration
├── 📄 README.md                              # Project documentation
├── 📄 tailwind.config.js                     # Tailwind CSS configuration
│
├── 📁 public/                                # Public assets
│   ├── 📄 index.html                         # Main HTML file
│   └── 📄 manifest.json                      # Web app manifest
│
├── 📁 server/                                # Backend server
│   ├── 📄 .env                               # Backend environment variables
│   ├── 📄 .gitignore                         # Server git ignore
│   ├── 📄 index.js                           # Main server file
│   ├── 📄 package.json                       # Backend package configuration
│   ├── 📄 package-lock.json                  # Backend dependency lock file
│   └── 📄 README.md                          # Server documentation
│   │
│   ├── 📁 config/                            # Configuration files
│   │   ├── 📄 cloudinary.js                  # Cloudinary configuration
│   │   ├── 📄 database.js                    # Database configuration
│   │   └── 📄 razorpay.js                    # Razorpay configuration
│   │
│   ├── 📁 controllers/                       # Route controllers
│   │   ├── 📄 Auth.js                        # Authentication controller
│   │   ├── 📄 Category.js                    # Category controller
│   │   ├── 📄 ContactUs.js                   # Contact controller
│   │   ├── 📄 Course.js                      # Course controller
│   │   ├── 📄 courseProgress.js              # Course progress controller
│   │   ├── 📄 payments.js                    # Payment controller
│   │   ├── 📄 profile.js                     # Profile controller
│   │   ├── 📄 RatingandReview.js             # Rating controller
│   │   ├── 📄 resetPassword.js               # Password reset controller
│   │   ├── 📄 Section.js                     # Section controller
│   │   └── 📄 Subsection.js                  # Subsection controller
│   │
│   ├── 📁 mail/                              # Email templates
│   │   └── 📁 templates/
│   │       ├── 📄 contactFormRes.js          # Contact form response
│   │       ├── 📄 courseEnrollmentEmail.js   # Course enrollment email
│   │       ├── 📄 emailVerificationTemplate.js # Email verification
│   │       ├── 📄 passwordUpdate.js          # Password update email
│   │       └── 📄 paymentSuccessEmail.js     # Payment success email
│   │
│   ├── 📁 middleware/                        # Custom middleware
│   │   └── 📄 auth.js                        # Authentication middleware
│   │
│   ├── 📁 models/                            # Database models
│   │   ├── 📄 Category.js                    # Category model
│   │   ├── 📄 Course.js                      # Course model
│   │   ├── 📄 CourseProgress.js              # Course progress model
│   │   ├── 📄 Menu.js                        # Menu model (DailyDine)
│   │   ├── 📄 OTP.js                         # OTP model
│   │   ├── 📄 Profile.js                     # Profile model
│   │   ├── 📄 RatingandReview.js             # Rating model
│   │   ├── 📄 Review.js                      # Review model (DailyDine)
│   │   ├── 📄 Section.js                     # Section model
│   │   ├── 📄 Subsection.js                  # Subsection model
│   │   └── 📄 User.js                        # User model (DailyDine)
│   │
│   ├── 📁 routes/                            # API routes
│   │   ├── 📄 auth.js                        # Authentication routes
│   │   ├── 📄 Contact.js                     # Contact routes
│   │   ├── 📄 Course.js                      # Course routes
│   │   ├── 📄 menus.js                       # Menu routes (DailyDine)
│   │   ├── 📄 messes.js                      # Mess routes (DailyDine)
│   │   ├── 📄 Payments.js                    # Payment routes
│   │   ├── 📄 profile.js                     # Profile routes
│   │   ├── 📄 reviews.js                     # Review routes (DailyDine)
│   │   ├── 📄 user.js                        # User routes
│   │   └── 📄 users.js                       # Users routes (DailyDine)
│   │
│   └── 📁 utils/                             # Utility functions
│       ├── 📄 imageUploader.js               # Image upload utility
│       ├── 📄 mailSender.js                  # Email sending utility
│       └── 📄 secToDuration.js               # Time conversion utility
│
└── 📁 src/                                   # Frontend source code
    ├── 📄 App.css                            # Main app styles
    ├── 📄 App.jsx                            # Main app component
    ├── 📄 index.js                           # App entry point
    │
    ├── 📁 assets/                            # Static assets
    │
    ├── 📁 components/                        # React components
    │   ├── 📁 Common/                        # Common components
    │   │   ├── 📄 ConfirmationModal.jsx      # Confirmation modal
    │   │   ├── 📄 Footer.jsx                 # Footer component
    │   │   ├── 📄 IconBtn.jsx                # Icon button component
    │   │   ├── 📄 Navbar.jsx                 # Navigation bar
    │   │   ├── 📄 RatingStars.jsx            # Rating stars component
    │   │   ├── 📄 ReviewSlider.jsx           # Review slider
    │   │   └── 📄 Tab.jsx                    # Tab component
    │   │
    │   ├── 📁 core/                          # Core components
    │   │   ├── 📁 AboutPage/                 # About page components
    │   │   │   ├── 📄 ContactFormSection.jsx
    │   │   │   ├── 📄 LearningGrid.jsx
    │   │   │   ├── 📄 Quote.jsx
    │   │   │   └── 📄 Stats.jsx
    │   │   │
    │   │   ├── 📁 Auth/                      # Authentication components
    │   │   │   ├── 📄 LoginForm.jsx          # Login form
    │   │   │   ├── 📄 OpenRoute.jsx          # Open route wrapper
    │   │   │   ├── 📄 PrivateRoute.jsx       # Private route wrapper
    │   │   │   ├── 📄 ProfileDropdown.jsx    # Profile dropdown
    │   │   │   ├── 📄 SignupForm.jsx         # Signup form
    │   │   │   └── 📄 Template.jsx           # Auth template
    │   │   │
    │   │   ├── 📁 Catalog/                   # Catalog components
    │   │   │   ├── 📄 Course_Card.jsx        # Course card
    │   │   │   └── 📄 Course_Slider.jsx      # Course slider
    │   │   │
    │   │   ├── 📁 ContactUsPage/             # Contact page components
    │   │   │   ├── 📄 ContactDetails.jsx
    │   │   │   ├── 📄 ContactForm.jsx
    │   │   │   └── 📄 ContactUsForm.jsx
    │   │   │
    │   │   ├── 📁 Course/                    # Course components
    │   │   │   ├── 📄 CourseAccordionBar.jsx
    │   │   │   ├── 📄 CourseDetailsCard.jsx
    │   │   │   └── 📄 CourseSubSectionAccordion.jsx
    │   │   │
    │   │   ├── 📁 Dashboard/                 # Dashboard components
    │   │   │   ├── 📁 AddCourse/             # Add course components
    │   │   │   │   ├── 📁 CourseBuilder/
    │   │   │   │   │   ├── 📄 CourseBuilderForm.jsx
    │   │   │   │   │   ├── 📄 NestedView.jsx
    │   │   │   │   │   └── 📄 SubSectionModal.jsx
    │   │   │   │   ├── 📁 CourseInformation/
    │   │   │   │   │   ├── 📄 ChipInput.jsx
    │   │   │   │   │   ├── 📄 CourseInformationForm.jsx
    │   │   │   │   │   └── 📄 RequirementsField.jsx
    │   │   │   │   ├── 📁 PublishCourse/
    │   │   │   │   │   └── 📄 index.jsx
    │   │   │   │   ├── 📄 index.jsx
    │   │   │   │   ├── 📄 RenderSteps.jsx
    │   │   │   │   └── 📄 Upload.jsx
    │   │   │   ├── 📁 Cart/
    │   │   │   │   └── 📄 index.jsx
    │   │   │   ├── 📁 EditCourse/
    │   │   │   │   └── 📄 index.jsx
    │   │   │   ├── 📁 InstructorCourses/
    │   │   │   │   └── 📄 CoursesTable.jsx
    │   │   │   ├── 📁 Settings/
    │   │   │   │   ├── 📄 ChangeProfilePicture.jsx
    │   │   │   │   ├── 📄 DeleteAccount.jsx
    │   │   │   │   ├── 📄 EditProfile.jsx
    │   │   │   │   ├── 📄 index.jsx
    │   │   │   │   └── 📄 UpdatePassword.jsx
    │   │   │   ├── 📄 EnrolledCourses.jsx
    │   │   │   ├── 📄 Instructor.jsx
    │   │   │   ├── 📄 MyCourses.jsx
    │   │   │   ├── 📄 MyProfile.jsx
    │   │   │   ├── 📄 Sidebar.jsx
    │   │   │   └── 📄 SidebarLink.jsx
    │   │   │
    │   │   ├── 📁 HomePage/                  # Home page components
    │   │   │   ├── 📄 Button.jsx
    │   │   │   ├── 📄 CodeBlocks.jsx
    │   │   │   ├── 📄 CourseCard.jsx
    │   │   │   ├── 📄 ExploreMore.jsx
    │   │   │   ├── 📄 HighlightText.jsx
    │   │   │   ├── 📄 InstructorSection.jsx
    │   │   │   ├── 📄 LearningLanguageSection.jsx
    │   │   │   └── 📄 Timeline.jsx
    │   │   │
    │   │   └── 📁 ViewCourse/                # View course components
    │   │       ├── 📄 CourseReviewModal.jsx
    │   │       ├── 📄 VideoDetails.jsx
    │   │       └── 📄 VideoDetailsSidebar.jsx
    │   │
    │   └── 📄 GoogleMap.jsx                  # Google Maps component (DailyDine)
    │
    ├── 📁 data/                              # Static data files
    │   ├── 📄 countrycode.json               # Country codes
    │   ├── 📄 dashboard-links.js             # Dashboard navigation
    │   ├── 📄 footer-links.js                # Footer links
    │   ├── 📄 homepage-explore.js            # Homepage explore data
    │   └── 📄 navbar-links.js                # Navbar links
    │
    ├── 📁 hooks/                             # Custom React hooks
    │   ├── 📄 useOnClickOutside.js           # Click outside hook
    │   └── 📄 useRouteMatch.js               # Route match hook
    │
    ├── 📁 pages/                             # Page components
    │   ├── 📄 About.jsx                      # About page
    │   ├── 📄 Catalog.jsx                    # Catalog page
    │   ├── 📄 Contact.jsx                    # Contact page
    │   ├── 📄 CourseDetails.jsx              # Course details page
    │   ├── 📄 Dashboard.jsx                  # Dashboard page
    │   ├── 📄 Error.jsx                      # Error page
    │   ├── 📄 ForgotPassword.jsx             # Forgot password page
    │   ├── 📄 Home.jsx                       # Home page (DailyDine)
    │   ├── 📄 Login.jsx                      # Login page (DailyDine)
    │   ├── 📄 MessDashboard.jsx              # Mess dashboard (DailyDine)
    │   ├── 📄 MessDetails.jsx                # Mess details (DailyDine)
    │   ├── 📄 MessProfile.jsx                # Mess profile (DailyDine)
    │   ├── 📄 MessSignup.jsx                 # Mess signup (DailyDine)
    │   ├── 📄 NearbyMesses.jsx               # Nearby messes (DailyDine)
    │   ├── 📄 Signup.jsx                     # Signup page (DailyDine)
    │   ├── 📄 UpdatePassword.jsx             # Update password page
    │   ├── 📄 UserProfile.jsx                # User profile (DailyDine)
    │   ├── 📄 VerifyEmail.jsx                # Verify email page
    │   └── 📄 ViewCourse.jsx                 # View course page
    │
    ├── 📁 reducer/                           # Redux reducers
    │   └── 📄 index.js                       # Root reducer
    │
    ├── 📁 services/                          # API services
    │   ├── 📄 apiConnector.js                # API connector utility
    │   ├── 📄 apis.js                        # API endpoints
    │   ├── 📄 formatDate.js                  # Date formatting utility
    │   └── 📁 operations/                    # API operations
    │       ├── 📄 authAPI.js                 # Authentication API (DailyDine)
    │       ├── 📄 courseDetailsAPI.js        # Course details API
    │       ├── 📄 menuAPI.js                 # Menu API (DailyDine)
    │       ├── 📄 messAPI.js                 # Mess API (DailyDine)
    │       ├── 📄 pageAndComponntDatas.js    # Page data API
    │       ├── 📄 profileAPI.js              # Profile API
    │       ├── 📄 SettingsAPI.js             # Settings API
    │       └── 📄 studentFeaturesAPI.js      # Student features API
    │
    ├── 📁 slices/                            # Redux slices
    │   ├── 📄 authSlice.js                   # Authentication slice (DailyDine)
    │   ├── 📄 cartSlice.js                   # Cart slice
    │   ├── 📄 courseSlice.js                 # Course slice
    │   ├── 📄 menuSlice.js                   # Menu slice (DailyDine)
    │   ├── 📄 messSlice.js                   # Mess slice (DailyDine)
    │   ├── 📄 profileSlice.js                # Profile slice
    │   └── 📄 viewCourseSlice.js             # View course slice
    │
    └── 📁 utils/                             # Utility functions
        ├── 📄 avgRating.js                   # Average rating calculator
        ├── 📄 constants.js                   # Constants
        └── 📄 dateFormatter.js               # Date formatter
```

## 📋 Key Files for DailyDine

### 🎯 **Core DailyDine Files:**

#### **Frontend Pages (DailyDine Specific):**
- `src/pages/Home.jsx` - Main homepage with today's menus
- `src/pages/Login.jsx` - User login page
- `src/pages/Signup.jsx` - User registration page
- `src/pages/MessSignup.jsx` - Mess owner registration page
- `src/pages/MessDashboard.jsx` - Mess owner dashboard
- `src/pages/MessProfile.jsx` - Mess profile management
- `src/pages/UserProfile.jsx` - User profile management
- `src/pages/MessDetails.jsx` - Individual mess details page
- `src/pages/NearbyMesses.jsx` - Nearby messes with map

#### **Components (DailyDine Specific):**
- `src/components/GoogleMap.jsx` - Google Maps integration
- `src/components/Common/Navbar.jsx` - Navigation with auth
- `src/components/Common/RatingStars.jsx` - Rating component
- `src/components/Common/ReviewSlider.jsx` - Review display

#### **API Services (DailyDine Specific):**
- `src/services/operations/authAPI.js` - Authentication operations
- `src/services/operations/menuAPI.js` - Menu management operations
- `src/services/operations/messAPI.js` - Mess management operations

#### **Redux Slices (DailyDine Specific):**
- `src/slices/authSlice.js` - Authentication state
- `src/slices/menuSlice.js` - Menu state management
- `src/slices/messSlice.js` - Mess state management

#### **Backend Models (DailyDine Specific):**
- `server/models/User.js` - User and mess owner model
- `server/models/Menu.js` - Menu and menu items model
- `server/models/Review.js` - Review and rating model

#### **Backend Routes (DailyDine Specific):**
- `server/routes/auth.js` - Authentication routes
- `server/routes/menus.js` - Menu management routes
- `server/routes/messes.js` - Mess management routes
- `server/routes/reviews.js` - Review management routes
- `server/routes/users.js` - User management routes

#### **Configuration Files:**
- `.env` - Frontend environment variables
- `server/.env` - Backend environment variables
- `package.json` - Frontend dependencies
- `server/package.json` - Backend dependencies

## 🚀 **How to Run:**

1. **Install Dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Set Environment Variables:**
   - Create `.env` in root with Google Maps API key
   - Create `server/.env` with MongoDB and JWT settings

3. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   ```

4. **Run Application:**
   ```bash
   npm run dev
   ```

## 📊 **File Count Summary:**
- **Total Files:** ~150+ files
- **Frontend Files:** ~100+ files
- **Backend Files:** ~50+ files
- **DailyDine Specific:** ~30+ files
- **Configuration Files:** ~10+ files

This structure shows a complete MERN stack application with both the original StudyNotion features and the new DailyDine functionality integrated together.