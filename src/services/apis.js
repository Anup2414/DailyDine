const BASE_URL = process.env.REACT_APP_BASE_URL
console.log(BASE_URL);
// AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

// MESS ENDPOINTS
export const messEndpoints = {
  // Mess management
  GET_ALL_MESSES_API: BASE_URL + "/mess",
  GET_NEARBY_MESSES_API: BASE_URL + "/mess/nearby",
  GET_MESS_DETAILS_API: BASE_URL + "/mess/:messId",
  CREATE_MESS_API: BASE_URL + "/mess/create",
  UPDATE_MESS_API: BASE_URL + "/mess/update/:messId",
  DELETE_MESS_API: BASE_URL + "/mess/delete/:messId",
  GET_MESSES_BY_OWNER_API: BASE_URL + "/mess/owner/messes",
  UPLOAD_MESS_IMAGE_API: BASE_URL + "/mess/upload-image/:messId",
  
  // Menu management
  GET_MESS_MENUS_API: BASE_URL + "/mess/:messId/menus",
  CREATE_MENU_API: BASE_URL + "/mess/:messId/menu/create",
  UPDATE_MENU_API: BASE_URL + "/mess/:messId/menu/update/:menuId",
  DELETE_MENU_API: BASE_URL + "/mess/:messId/menu/delete/:menuId",
  GET_MENU_DETAILS_API: BASE_URL + "/mess/:messId/menu/:menuId",
  GET_TODAY_MENU_API: BASE_URL + "/mess/:messId/menu/today",
  GET_MENU_BY_DATE_API: BASE_URL + "/mess/:messId/menus/date/:date",
}

// REVIEW ENDPOINTS
export const reviewEndpoints = {
  CREATE_REVIEW_API: BASE_URL + "/review/create",
  UPDATE_REVIEW_API: BASE_URL + "/review/update/:reviewId",
  DELETE_REVIEW_API: BASE_URL + "/review/delete/:reviewId",
  GET_REVIEW_API: BASE_URL + "/review/:reviewId",
  GET_REVIEWS_BY_MESS_API: BASE_URL + "/review/mess/:messId",
  GET_REVIEWS_BY_USER_API: BASE_URL + "/review/user/my-reviews",
  MARK_REVIEW_HELPFUL_API: BASE_URL + "/review/:reviewId/helpful",
  REPORT_REVIEW_API: BASE_URL + "/review/:reviewId/report",
}

// CONTACT US ENDPOINT
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
