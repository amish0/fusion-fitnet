# Admin Dashboard Documentation

## Overview

The Admin Dashboard provides comprehensive management tools for administrators to manage:
- Gallery images
- Events
- Team members
- View system statistics

## Getting Started

### 1. Create Admin User

First, create an admin account using the provided script:

```bash
cd backend
python create_admin.py
```

You'll be prompted to enter:
- Admin name
- Admin email
- Admin password (minimum 6 characters)

Example:
```
Enter admin name: John Administrator
Enter admin email: admin@fusionfit.com
Enter admin password: MySecurePassword123
```

### 2. Login as Admin

1. Go to the login page: `http://localhost:3000/auth/login`
2. Enter your admin email and password
3. You'll automatically be redirected to the Admin Dashboard

### 3. Access Admin Dashboard

- **URL**: `http://localhost:3000/admin/dashboard`
- Only users with admin privileges can access this page
- Regular users will be redirected to the home page

## Dashboard Features

### Dashboard Overview

The main dashboard shows:
- **Gallery Items**: Total number of gallery images
- **Events**: Total number of events
- **Team Members**: Total number of team members
- **Users**: Total registered users

### Gallery Management

#### Add Gallery Image
1. Click "🖼️ Gallery" in the sidebar
2. Click "+ Add New Image"
3. Fill in the form:
   - **Title**: Image name/title (required)
   - **Image URL**: URL to the image (required)
   - **Description**: Optional description
   - **Category**: Category (e.g., yoga, training, etc.)
4. Click "Save Gallery Item"

#### Edit Gallery Image
1. Go to Gallery section
2. Click "Edit" button next to the image
3. Update the details
4. Click "Save Gallery Item"

#### Delete Gallery Image
1. Go to Gallery section
2. Click "Delete" button next to the image
3. Confirm deletion

### Event Management

#### Add Event
1. Click "📅 Events" in the sidebar
2. Click "+ Add New Event"
3. Fill in the form:
   - **Title**: Event name (required)
   - **Description**: Event details (required)
   - **Date**: Event date (required)
   - **Time**: Event time (optional)
   - **Location**: Event location (optional)
   - **Image URL**: Event image (optional)
4. Click "Save Event"

#### Edit Event
1. Go to Events section
2. Click "Edit" button next to the event
3. Update the details
4. Click "Save Event"

#### Delete Event
1. Go to Events section
2. Click "Delete" button next to the event
3. Confirm deletion

### Team Management

#### Add Team Member
1. Click "👥 Team" in the sidebar
2. Click "+ Add Team Member"
3. Fill in the form:
   - **Name**: Team member name (required)
   - **Role**: Job role/position (required)
   - **Bio**: Member biography (optional)
   - **Image URL**: Profile picture URL (optional)
   - **Email**: Member email (optional)
   - **Phone**: Contact number (optional)
4. Click "Save Team Member"

#### Edit Team Member
1. Go to Team section
2. Click "Edit" button next to the member
3. Update the details
4. Click "Save Team Member"

#### Delete Team Member
1. Go to Team section
2. Click "Delete" button next to the member
3. Confirm deletion

## API Endpoints (Backend)

### Authentication Required
All admin endpoints require the `X-User-ID` header with the admin user ID.

### Gallery Endpoints

```
POST   /api/admin/gallery              - Create gallery item
PUT    /api/admin/gallery/<id>         - Update gallery item
DELETE /api/admin/gallery/<id>         - Delete gallery item
```

**Create/Update Gallery Item:**
```json
{
  "title": "Morning Yoga",
  "image_url": "https://images.unsplash.com/...",
  "description": "Yoga session",
  "category": "yoga"
}
```

### Events Endpoints

```
POST   /api/admin/events               - Create event
PUT    /api/admin/events/<id>          - Update event
DELETE /api/admin/events/<id>          - Delete event
```

**Create/Update Event:**
```json
{
  "title": "Marathon 2024",
  "description": "Annual marathon event",
  "date": "2024-02-15",
  "time": "08:00",
  "location": "City Park",
  "image_url": "https://images.unsplash.com/..."
}
```

### Team Endpoints

```
POST   /api/admin/team                 - Create team member
PUT    /api/admin/team/<id>            - Update team member
DELETE /api/admin/team/<id>            - Delete team member
```

**Create/Update Team Member:**
```json
{
  "name": "John Smith",
  "role": "Head Coach",
  "bio": "Expert trainer with 15 years experience",
  "image_url": "https://images.unsplash.com/...",
  "email": "john@fusionfit.com",
  "phone": "+1234567890",
  "social_facebook": "facebook.com/john",
  "social_instagram": "instagram.com/john",
  "social_twitter": "twitter.com/john"
}
```

### Dashboard Stats

```
GET /api/admin/dashboard/stats
```

Returns:
```json
{
  "gallery": 5,
  "events": 3,
  "team": 4,
  "users": 15
}
```

## Security Features

✅ **Admin-Only Access**
- Only users with `is_admin = true` can access admin endpoints
- Automatic redirect for non-admin users
- Validation on both frontend and backend

✅ **User ID Verification**
- Admin endpoints verify user is admin before allowing operations
- Uses HTTP header `X-User-ID` for verification

✅ **Session Management**
- Admin status stored in session
- Sessions expire after 24 hours
- Logout clears all session data

## Database Schema

### Users Table Updates

```sql
ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
```

New fields:
- `is_admin`: Boolean flag indicating admin status

### All Other Tables

No changes required to existing tables for admin functionality.

## Troubleshooting

### Can't Access Admin Dashboard
- Verify your user is marked as admin in the database
- Check that you're logged in with admin credentials
- Ensure the `is_admin` field is set to `true` in the database

### Changes Not Appearing
- Refresh the browser (Ctrl+R or Cmd+R)
- Check browser console for JavaScript errors
- Verify the Flask backend is running

### API Errors
- Ensure `X-User-ID` header is being sent
- Check that the user ID is valid
- Verify the admin has proper permissions

## Tips & Best Practices

1. **Use High-Quality Images**: Ensure gallery and event images are properly sized
2. **Keep Descriptions Updated**: Write clear, engaging descriptions for gallery items
3. **Set Event Dates**: Always include dates for events so they display in chronological order
4. **Regular Backups**: Back up your database regularly
5. **Test Changes**: Test changes in a staging environment first

## Support

For issues or questions:
1. Check the browser console for errors
2. Check Flask backend logs
3. Verify database connection
4. Ensure all services are running

---

**Version**: 1.0
**Last Updated**: January 2026
