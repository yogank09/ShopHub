# OTP Verification - Testing Guide

## Quick Test Steps

1. **Open the website** in your browser
2. **Open Browser Console** (F12) to see OTP
3. **Test User Registration:**
   - Click user icon → Register tab
   - Fill all fields:
     - Name: Test User
     - Email: test@example.com
     - Phone: +1234567890 (must start with +)
     - Password: password123
     - Confirm Password: password123
   - Click "Send OTP"
   - **Check console** - OTP will be displayed (e.g., "OTP sent to +1234567890: 123456")
   - **Check notification** - OTP is also shown in notification
   - OTP modal should appear
   - Enter the 6-digit OTP from console/notification
   - Click "Verify OTP"
   - Registration should complete

4. **Test Shopkeeper Registration:**
   - Click shopkeeper icon → Shopkeeper Sign Up
   - Fill all fields including phone
   - Click "Send OTP"
   - Enter OTP from console
   - Registration should complete

## Common Issues & Fixes

### Issue: OTP modal doesn't appear
**Fix:**
- Check browser console for errors
- Make sure phone number format is correct (+1234567890)
- Verify all form fields are filled

### Issue: OTP verification fails
**Fix:**
- Check console for the generated OTP
- Make sure you're entering the exact 6 digits
- OTP expires after 5 minutes
- Check console logs for "OTP Mismatch" message

### Issue: Phone validation fails
**Fix:**
- Phone must start with + (e.g., +1234567890)
- Must be 10-15 digits after +
- Examples: +1234567890, +919876543210

## Debug Commands

Open browser console (F12) and run:

```javascript
// Check if OTP is stored
localStorage.getItem('pendingOTP')

// Check pending registration
pendingRegistration

// Check current OTP
currentOTP

// Manually verify OTP (for testing)
const stored = JSON.parse(localStorage.getItem('pendingOTP'));
console.log('Stored OTP:', stored.otp);
```

## Expected Console Output

When you click "Send OTP", you should see:
```
OTP sent to +1234567890: 123456
In production, this would be sent via SMS
```

## Phone Number Format

✅ Valid formats:
- `+1234567890`
- `+919876543210`
- `+442071234567`

❌ Invalid formats:
- `1234567890` (missing +)
- `+123` (too short)
- `123-456-7890` (contains dashes)
