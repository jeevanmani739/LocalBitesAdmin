# NativeWind Styling Fix Guide

If you're not seeing styles in development, follow these steps:

## Quick Fix (Most Common)

1. **Stop the dev server** (Ctrl+C if running)

2. **Clear all caches**:
```bash
rm -rf .expo
rm -rf node_modules/.cache
npx expo start --clear
```

3. **Important**: When the dev server starts, **press `w`** to open in web browser

## Verification Steps

### 1. Check that all configuration files are correct:

**tailwind.config.js** - Should have:
```javascript
const { hairlineWidth } = require('nativewind/theme');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: { colors: {...} } }
};
```

**metro.config.js** - Should have:
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

**app/_layout.tsx** - Should import CSS:
```javascript
import '../global.css';
```

### 2. Verify Dependencies

Run this to check if tailwindcss is installed:
```bash
npm list tailwindcss
```

Should show: `tailwindcss@3.4.1`

If not installed:
```bash
npm install -D tailwindcss@3.4.1
```

### 3. Test the Build

If dev server styles don't work, test the production build:
```bash
npm run build:web
```

Then check the generated CSS file in `dist/_expo/static/css/` - should be ~11KB

## Common Issues

### Issue 1: "className is not a valid prop"
**Solution**: Make sure nativewind-env.d.ts exists and tsconfig.json includes it

### Issue 2: Styles work in build but not in dev
**Solution**: This is a known NativeWind v4 issue. Clear cache and restart:
```bash
rm -rf .expo && npx expo start --clear
```

### Issue 3: CSS file not generated
**Solution**: Check metro.config.js has `withNativeWind` wrapper

### Issue 4: Some colors don't work
**Solution**: Verify tailwind.config.js has all color definitions in `theme.extend.colors`

## Manual Verification

1. Start dev server: `npm run dev`
2. Open browser (press `w`)
3. Open browser DevTools
4. Check if CSS is loaded in `<style>` tags in `<head>`
5. If not, restart with `--clear` flag

## Still Not Working?

If styles still don't appear after all these steps:

1. Check browser console for errors
2. Verify you're running on **web** (not iOS/Android simulator)
3. Try building: `npm run build:web` and check the CSS file
4. Check if global.css is being imported in _layout.tsx

## Alternative: Inline Styles

If you need a quick workaround while debugging, you can use StyleSheet:

```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  button: { backgroundColor: '#0284c7', padding: 12 },
});

<View style={styles.container}>
  <TouchableOpacity style={styles.button}>
```

But NativeWind SHOULD work with the configuration provided!
