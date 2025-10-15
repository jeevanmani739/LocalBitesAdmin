# LocalBites Admin Portal

A comprehensive admin dashboard for managing the LocalBites food delivery platform. Built with Expo, React Native Web, NativeWind (Tailwind CSS), and Supabase.

## ✅ Styling Fixed!

The styling is now fully functional. NativeWind v4 configuration includes:
- **tailwind.config.js** with custom color palette
- **metro.config.js** with `withNativeWind` wrapper
- **global.css** with Tailwind directives
- **tailwindcss** installed as dev dependency

All Tailwind CSS classes are working correctly in the build output.

## Features

### ✅ Implemented

- **Admin Authentication**: Separate authentication system for admin users with role-based access control
- **Dashboard Overview**: Real-time metrics showing revenue, active orders, users, drivers, and restaurants
- **User Management**: View and search all customers
- **Restaurant Management**: Browse restaurants, view pending applications
- **Driver Management**: Manage drivers with vehicle info and performance stats
- **Order Monitoring**: Real-time order tracking with status filtering
- **Role-Based Access**: Different permission levels for super_admin, manager, support_agent, onboarding_specialist, finance_admin, and marketing_manager
- **Complete Styling**: NativeWind/Tailwind CSS fully configured and working

### 🔜 Coming Soon

- Restaurant and driver application review workflows
- Financial management with Stripe integration
- Marketing campaigns and promotion management
- Analytics dashboard with charts and insights
- Support ticket system
- System settings and admin user management

## Tech Stack

- **Framework**: Expo (React Native Web)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: Expo Router
- **Icons**: Lucide React Native

## Database Schema

### Existing Tables (from User/Driver/Restaurant apps)
- `profiles` - All user profiles
- `restaurants` - Restaurant information
- `menus` & `menu_items` - Menu management
- `drivers` & `driver_locations` - Driver tracking
- `orders` & `order_items` - Order management
- `payments` & `earnings` - Financial transactions
- `reviews` - Customer feedback
- `restaurant_analytics` - Performance metrics

### Admin Portal Tables
- `portal_users` - Admin authentication
- `restaurant_applications` - Restaurant onboarding
- `driver_applications` - Driver onboarding
- `promotions` - Marketing campaigns
- `support_tickets` - Customer service
- `audit_logs` - Admin activity tracking

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Database migrations are already applied to your Supabase instance

4. Create your first admin user directly in Supabase SQL Editor:
```sql
-- First create the auth user (replace with your email and password)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@localbites.com',
  crypt('YourSecurePassword123!', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Then create the portal user record
INSERT INTO portal_users (id, email, name, role, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@localbites.com'),
  'admin@localbites.com',
  'Admin User',
  'super_admin',
  true,
  now(),
  now()
);
```

### Development

Start the development server:
```bash
npm run dev
```

The app will open in your browser. Login with the admin credentials you created.

### Build for Web

Build the web version:
```bash
npm run build:web
```

The output will be in the `dist` folder, ready to deploy to Vercel, Netlify, or any static hosting.

## Project Structure

```
project/
├── app/                      # Expo Router pages
│   ├── (dashboard)/         # Dashboard pages (protected)
│   │   ├── _layout.tsx     # Dashboard layout with sidebar
│   │   ├── index.tsx       # Dashboard home
│   │   ├── users.tsx       # User management
│   │   ├── restaurants.tsx # Restaurant management
│   │   ├── drivers.tsx     # Driver management
│   │   ├── orders.tsx      # Order monitoring
│   │   ├── finance.tsx     # Financial management
│   │   ├── marketing.tsx   # Marketing campaigns
│   │   ├── analytics.tsx   # Business intelligence
│   │   ├── support.tsx     # Customer support
│   │   └── settings.tsx    # System settings
│   ├── auth/
│   │   └── login.tsx       # Admin login page
│   ├── _layout.tsx         # Root layout
│   └── index.tsx           # Entry redirect
├── components/
│   ├── dashboard/
│   │   ├── Header.tsx      # Top navigation bar
│   │   └── Sidebar.tsx     # Side navigation menu
│   └── ui/                 # Reusable UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/
│   ├── auth.ts             # Authentication helpers
│   └── supabase.ts         # Supabase client
├── store/
│   ├── authStore.ts        # Auth state management
│   └── dashboardStore.ts   # Dashboard state
├── types/
│   └── database.ts         # TypeScript types
├── supabase/
│   └── migrations/         # Database migrations
├── global.css              # Tailwind directives
├── tailwind.config.js      # Tailwind configuration
├── metro.config.js         # Metro bundler config with NativeWind
└── babel.config.js         # Babel configuration
```

## Admin Roles

- **super_admin**: Full access to all features and settings
- **manager**: Access to most features, limited system settings
- **support_agent**: Customer service and support tickets
- **onboarding_specialist**: Restaurant and driver application reviews
- **finance_admin**: Financial management and payouts
- **marketing_manager**: Campaigns and promotions

## Styling with NativeWind

This project uses NativeWind v4, which brings Tailwind CSS to React Native.

### Configuration Files

1. **tailwind.config.js** - Tailwind configuration with custom colors
2. **metro.config.js** - Metro bundler wrapped with `withNativeWind`
3. **global.css** - Tailwind directives
4. **babel.config.js** - Simple babel-preset-expo (NativeWind handled by Metro)

### Custom Color Palette

```javascript
primary: {
  50: '#f0f9ff',  100: '#e0f2fe',  200: '#bae6fd',
  300: '#7dd3fc', 400: '#38bdf8',  500: '#0ea5e9',
  600: '#0284c7', 700: '#0369a1',  800: '#075985',
  900: '#0c4a6e'
}

success: { 50: '#f0fdf4', 100: '#dcfce7', 500: '#10b981', 600: '#059669', 700: '#047857' }
warning: { 50: '#fffbeb', 100: '#fef3c7', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' }
error:   { 50: '#fef2f2', 100: '#fee2e2', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' }
neutral: { 50-900 grayscale }
```

### Using Styles

Apply Tailwind classes directly to React Native components using the `className` prop:

```tsx
<View className="flex-1 bg-neutral-50">
  <Text className="text-2xl font-bold text-neutral-900">Title</Text>
  <TouchableOpacity className="bg-primary-600 px-4 py-3 rounded-lg">
    <Text className="text-white font-semibold">Button</Text>
  </TouchableOpacity>
</View>
```

## Security

- Row Level Security (RLS) enabled on all tables
- Separate admin authentication from user/driver/restaurant apps
- Role-based access control for all admin features
- Audit logging for all admin actions (table ready, logging to be implemented)
- Secure session management with auto-refresh

## Integration with Existing Apps

The admin portal integrates seamlessly with the existing LocalBites apps:

- **LocalBitesUser**: Manages customer profiles and orders
- **LocalBitesDriver**: Manages driver profiles and deliveries
- **LocalBitesRestaurant**: Manages restaurant profiles and menus

All apps share the same Supabase database, ensuring real-time data synchronization.

## Deployment

The admin portal can be deployed to any static hosting service:

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Connect your repo
2. Build command: `npm run build:web`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Custom Server
```bash
npm run build:web
# Serve the dist folder with any static server
```

Make sure to set these environment variables in your hosting platform:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

When adding new features:

1. Create database migrations in `supabase/migrations/`
2. Update TypeScript types in `types/database.ts`
3. Follow the existing component structure
4. Use NativeWind/Tailwind for styling
5. Implement proper RLS policies for security
6. Test on web (primary platform)

## License

Private - LocalBites Platform
