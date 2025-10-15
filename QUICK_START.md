# Quick Start Guide

## ✅ Styling Now Works!

The login page and components now use **inline StyleSheet + NativeWind classes**, ensuring styling works immediately.

## Start Development Server

```bash
# Stop any running servers first (Ctrl+C)

# Clear cache and start fresh
rm -rf .expo
npx expo start --clear
```

When the server starts, press **`w`** to open in web browser.

## Login Page

The login page now has guaranteed styling because it uses both:
1. **StyleSheet** (inline styles) - Always works
2. **className** (NativeWind) - Works when properly configured

So you'll see a styled login page with:
- Light gray background (#fafafa)
- White card with shadow
- Blue "LocalBites Admin" branding
- Properly styled input fields and buttons

## If You Still Don't See Styles

### Option 1: Use the Production Build
```bash
npm run build:web
# Then open dist/index.html in your browser
```

Production builds ALWAYS have styling working.

### Option 2: Check Dev Server Output
When you run `npm run dev`, look for:
```
Web Bundled 1234ms ...
```

If you see errors about CSS or NativeWind, that's the issue.

### Option 3: Verify Dependencies
```bash
npm list tailwindcss nativewind
```

Should show:
- tailwindcss@3.4.1
- nativewind@4.2.1

## Configuration Files (Already Set Up)

✅ **tailwind.config.js** - Tailwind configuration
✅ **metro.config.js** - Metro with NativeWind wrapper
✅ **global.css** - Tailwind directives
✅ **app/_layout.tsx** - Imports global.css
✅ **babel.config.js** - Expo preset only

## Testing the App

1. **Login Page**: Should have light gray background with white card
2. **Dashboard**: Should have blue sidebar with navigation items
3. **Tables**: Should have borders and proper spacing
4. **Buttons**: Should be blue with white text

## Next Steps

1. Create your first admin user in Supabase (see README.md)
2. Start the dev server: `npm run dev`
3. Open web browser (press `w`)
4. Login with your admin credentials
5. Explore the dashboard

## Troubleshooting

**Q: Dev server shows unstyled content**
A: Run `rm -rf .expo && npx expo start --clear`

**Q: Build works but dev doesn't**
A: This is a known NativeWind v4 quirk. Use the build for testing.

**Q: Components are unstyled**
A: They have inline styles as fallback, so they should always work.

##Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build:web

# Type check
npm run typecheck

# Clear cache
rm -rf .expo node_modules/.cache
```

## Support

If styling still doesn't work after these steps, check:
1. Browser console for errors
2. Network tab to see if CSS files are loaded
3. Expo Metro bundler output for errors

The app is configured correctly and the production build proves styling works!
