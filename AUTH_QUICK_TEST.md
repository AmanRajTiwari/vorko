# Auth System - Quick Testing Guide

## 🚀 Live Server

**URL**: http://localhost:5173

Dev server is running on port 5173 with hot reload enabled.

---

## 🔑 Demo Credentials

### Student Account

```
Email: student@vorko.com
Password: student123
Role: Student
```

### Mentor Account

```
Email: mentor@vorko.com
Password: mentor123
Role: Mentor
```

---

## ✅ Test Cases

### Test 1: Student Login

1. Click "Login" button in navbar (or go to /login)
2. Role is already "Student"
3. Click the 📚 demo button to auto-fill student credentials
4. Click "Sign In"
5. ✅ Should redirect to `/student/dashboard`
6. ✅ Navbar shows "STUDENT | Alex Johnson"
7. ✅ Can access all /student/\* routes
8. Refresh page → ✅ Session persists

### Test 2: Mentor Login

1. Click "Login" button
2. Click "Mentor" role button
3. Click the 👨‍🏫 demo button to auto-fill mentor credentials
4. Click "Sign In"
5. ✅ Should redirect to `/mentor/dashboard`
6. ✅ Navbar shows "MENTOR | Dr. James Mitchell"
7. ✅ Can access all /mentor/\* routes
8. Refresh page → ✅ Session persists

### Test 3: Access Control - Student

1. Login as **Student**
2. Try to manually access `/mentor/dashboard`
3. ✅ Should redirect to `/student/dashboard`
4. Try to access `/mentor/projects`
5. ✅ Should redirect to `/student/dashboard`

### Test 4: Access Control - Mentor

1. Login as **Mentor**
2. Try to manually access `/student/dashboard`
3. ✅ Should redirect to `/mentor/dashboard`
4. Try to access `/student/tasks`
5. ✅ Should redirect to `/mentor/dashboard`

### Test 5: Unauthenticated Access

1. Logout (click Logout button)
2. Try to access `/student/dashboard` manually
3. ✅ Should redirect to `/login`
4. Try to access `/mentor/dashboard` manually
5. ✅ Should redirect to `/login`

### Test 6: Logout

1. Login with any role
2. Click "Logout" button in navbar
3. ✅ Should redirect to home page
4. ✅ Navbar shows "Login" and "Sign Up" buttons
5. ✅ Try to access dashboard → redirects to /login

### Test 7: Signup

1. Go to `/signup` (or click "Sign Up" in navbar)
2. Fill form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm: "password123"
   - Role: "Student"
3. Click "Sign Up"
4. ✅ Should auto-login and redirect to dashboard
5. ✅ Navbar shows "STUDENT | John Doe"

### Test 8: Signup Validation

1. Go to `/signup`
2. Leave Name empty → Click "Sign Up" → Error: "Name is required"
3. Enter invalid email → Click "Sign Up" → Error: "Valid email required"
4. Password < 6 chars → Click "Sign Up" → Error: "Min 6 characters"
5. Passwords don't match → Click "Sign Up" → Error: "Passwords don't match"

### Test 9: Session Persistence

1. Login as Student
2. ✅ Navbar shows user info
3. Refresh the page
4. ✅ Still logged in (no re-login needed)
5. DevTools → Application → LocalStorage → Find `vorko_auth`
6. ✅ Should contain user data

### Test 10: Session Clearing

1. Login as Student
2. Open DevTools → Application → LocalStorage
3. Find `vorko_auth` key
4. Delete it manually
5. Refresh page
6. ✅ Should be logged out and redirect to login

---

## 🎯 Quick Navigation

| Action                              | URL                  | Expected              |
| ----------------------------------- | -------------------- | --------------------- |
| View app                            | `/`                  | Landing page          |
| Login page                          | `/login`             | Login form            |
| Signup page                         | `/signup`            | Signup form           |
| Student dashboard (not logged in)   | `/student/dashboard` | Redirects to `/login` |
| Mentor dashboard (not logged in)    | `/mentor/dashboard`  | Redirects to `/login` |
| Student dashboard (logged in)       | `/student/dashboard` | Shows student UI      |
| Mentor dashboard (logged in)        | `/mentor/dashboard`  | Shows mentor UI       |
| Any protected route (not logged in) | `/*`                 | Redirects to `/login` |

---

## 🔍 Debugging Tips

### Check if Logged In

Open DevTools Console and run:

```javascript
JSON.parse(localStorage.getItem("vorko_auth"));
```

Should show:

```json
{
  "user": {"id": "...", "email": "...", "name": "...", ...},
  "role": "student",
  "isAuthenticated": true,
  "isLoading": false
}
```

### Clear Session Manually

```javascript
localStorage.removeItem("vorko_auth");
location.reload();
```

### Check Current Route

Open DevTools and check the URL bar

### View Network Requests

1. Open DevTools → Network tab
2. Login
3. Should show POST request to form submission (no actual API yet)

### Check Component State

1. Install React DevTools Chrome extension
2. Open DevTools → Components tab
3. Find `<AuthProvider>`
4. Inspect auth state in the sidebar

---

## 📱 Mobile Testing

### Desktop View (1200px+)

- Navbar shows all buttons in one row
- Login/Dashboard buttons visible

### Tablet View (768px - 1199px)

- Navbar shows hamburger menu on smaller screens
- Mobile menu slides out

### Mobile View (320px - 767px)

- Full hamburger menu
- Login/Logout/Dashboard stacked in mobile menu
- Touch-optimized buttons

**To test**:

- Use DevTools device emulation (Ctrl+Shift+M)
- Or test on actual phone at computer's IP

---

## 🐛 Common Test Issues

### Issue: "Page stuck loading"

- Dev server might be down
- Run `npm run dev` again
- Wait 10 seconds for HMR

### Issue: "Redirect loop"

- Clear cache: Ctrl+Shift+Delete
- Clear localStorage: DevTools → Application → Storage → Clear
- Restart dev server

### Issue: "Can't find auth context"

- Make sure AuthProvider wraps App component
- Check console for import errors

### Issue: "Demo button not filling form"

- Try typing manually instead
- Or clear form and try demo button again

---

## ✨ Feature Showcase

### Before Auth

- Navbar: "Student Dashboard" button → goes to `/student/dashboard` (unprotected)
- Navbar: "Mentor Dashboard" button → goes to `/mentor/dashboard` (unprotected)
- No user identification
- Anyone can access any dashboard

### After Auth ✅

- Navbar: Login/Sign Up buttons (logged out)
- Navbar: User badge + Dashboard + Logout (logged in)
- Role-specific dashboards
- Cannot access other role's routes
- Session persists across refresh
- Proper access control

---

## 📊 Auth Flow Diagram

```
Home Page (/)
    ↓
[Login] button → /login
    ↓
Select Role (Student/Mentor)
    ↓
Enter credentials
    ↓
AuthContext validates
    ↓
Success?
  YES → /student/dashboard OR /mentor/dashboard
  NO → Show error message
    ↓
Try accessing other role's route?
    YES → Redirect to correct dashboard
    NO → Show protected page
    ↓
Logout?
    YES → Clear localStorage → Redirect to /
    NO → Stay on dashboard
```

---

## 🎓 Learning Path

1. **Start Here**: Go to http://localhost:5173
2. **Try Login**: Click "Login" → Use demo credentials
3. **Explore Dashboard**: Browse student/mentor pages
4. **Test Access Control**: Try accessing other role's routes
5. **Refresh Page**: Verify session persists
6. **Logout**: Test logout flow
7. **Try Signup**: Create new account
8. **Check localStorage**: DevTools → Application → Storage

---

## 🚀 What's Implemented

✅ Login page with role selector  
✅ Signup page with validation  
✅ Demo credentials for quick testing  
✅ Protected routes per role  
✅ Session persistence (localStorage)  
✅ Role-based redirects  
✅ Navbar auth integration  
✅ Error/success alerts  
✅ Loading states  
✅ Responsive design  
✅ Mobile-friendly auth

---

## 🔄 What's Next

🟡 Backend API integration  
🟡 JWT token authentication  
🟡 Password reset flow  
🟡 Email verification  
🟡 Two-factor authentication  
🟡 Social login (Google/GitHub)  
🟡 Account recovery

---

## 📞 Need Help?

1. **Authentication not working**: Check browser console (F12)
2. **Stuck on loading**: Refresh page or restart dev server
3. **Sessions clearing**: Check if localStorage is disabled
4. **Routes not protected**: Verify ProtectedRoute is wrapping all dashboard routes
5. **Navbar not updating**: Clear browser cache (Ctrl+Shift+Delete)

---

**Happy Testing! 🎉**

For detailed documentation, see: `AUTH_IMPLEMENTATION_GUIDE.md`
