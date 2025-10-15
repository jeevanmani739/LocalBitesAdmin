import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { auth } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';

export default function Login() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { portalUser } = await auth.signIn(email, password);
      setUser(portalUser);
      router.replace('/(dashboard)');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container} className="flex-1 bg-neutral-50">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content} className="flex-1 items-center justify-center px-6">
          <View style={styles.card} className="w-full max-w-md">
            <View className="bg-white rounded-2xl shadow-lg p-8" style={styles.formCard}>
              <Text className="text-3xl font-bold text-neutral-900 mb-2 text-center" style={styles.title}>
                LocalBites Admin
              </Text>
              <Text className="text-base text-neutral-600 mb-8 text-center" style={styles.subtitle}>
                Sign in to access the admin portal
              </Text>

              {error && (
                <View className="bg-error-50 border border-error-200 rounded-lg p-3 mb-4" style={styles.errorBox}>
                  <Text className="text-error-700 text-sm" style={styles.errorText}>{error}</Text>
                </View>
              )}

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="admin@localbites.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
              />

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                className="mt-2"
              />

              <Text className="text-sm text-neutral-500 mt-6 text-center" style={styles.forgotText}>
                Forgot your password? Contact your administrator.
              </Text>
            </View>

            <Text className="text-xs text-neutral-400 mt-6 text-center" style={styles.versionText}>
              LocalBites Admin Portal v1.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 448,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#525252',
    marginBottom: 32,
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fee2e2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    color: '#737373',
    marginTop: 24,
    textAlign: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#a3a3a3',
    marginTop: 24,
    textAlign: 'center',
  },
});
