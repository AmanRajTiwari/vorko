# Dashboard Fixes TODO

## 1. Remove avatar_url from Supabase queries

- [ ] Remove avatar_url from useStudentDashboardProfile.js
- [ ] Remove avatar_url from useStudentDashboardProject.js

## 2. Fix project query 400 errors

- [ ] Refactor useStudentDashboardProject.js to separate project and mentor queries
- [ ] Query projects from project_members → projects only
- [ ] Query mentor profile separately from profiles table

## 3. Fix dropdown z-index issues

- [ ] Increase z-index in ProfileDropdown.jsx
- [ ] Increase z-index in StudentTopBar.jsx (notifications)

## 4. Add stability checks

- [ ] Ensure user.id exists before Supabase calls
- [ ] Add proper error handling
