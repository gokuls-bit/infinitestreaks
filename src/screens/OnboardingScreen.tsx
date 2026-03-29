import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { BrandColors, DarkTextColors, DarkSurfaces, SemanticColors } from '../theme/colors';

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  // Tab indicator animation
  const indicatorOffset = useSharedValue(0);
  useEffect(() => {
    indicatorOffset.value = withSpring(isLogin ? 0 : width / 2 - 20, { damping: 15 });
  }, [isLogin, indicatorOffset]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorOffset.value }],
  }));

  const logoScale = useSharedValue(0);
  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 12 });
  }, [logoScale]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const handleAuth = async () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      return Alert.alert("Required", "All fields must be filled");
    }

    try {
      setLoading(true);
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
    } catch (err: any) {
      Alert.alert("Auth Error", err.message || "Something went wrong. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.topSection}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <MaterialCommunityIcons name="fire" size={80} color={BrandColors.purple} />
        </Animated.View>
        <Text style={styles.appName}>InfiniteStreaks</Text>
        <Text style={styles.tagline}>Consistency is the new superpower.</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setIsLogin(true)}>
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setIsLogin(false)}>
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Register</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>

      <View style={styles.formContainer}>
        {!isLogin && (
          <Animated.View entering={FadeInDown.delay(100)} style={styles.inputGroup}>
            <TextInput 
              placeholder="Full Name" 
              placeholderTextColor={DarkTextColors.tertiary}
              style={styles.input}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
          </Animated.View>
        )}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.inputGroup}>
          <TextInput 
            placeholder="Email Address" 
            placeholderTextColor={DarkTextColors.tertiary}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(300)} style={styles.inputGroup}>
          <TextInput 
            placeholder="Password" 
            placeholderTextColor={DarkTextColors.tertiary}
            style={styles.input}
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </Animated.View>

        <TouchableOpacity 
          style={[styles.authBtn, loading && styles.disabledBtn]} 
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.authBtnText}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkSurfaces.base,
    paddingHorizontal: 24,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(123, 94, 167, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: BrandColors.purple,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: DarkTextColors.primary,
  },
  tagline: {
    fontSize: 16,
    color: DarkTextColors.secondary,
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    position: 'relative',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: DarkSurfaces.divider,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: DarkTextColors.tertiary,
    fontWeight: '600',
  },
  activeTabText: {
    color: DarkTextColors.primary,
  },
  indicator: {
    position: 'absolute',
    bottom: -1,
    width: width / 2 - 44,
    height: 3,
    backgroundColor: BrandColors.purple,
    borderRadius: 3,
  },
  formContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: DarkSurfaces.raised,
    padding: 18,
    borderRadius: 16,
    color: DarkTextColors.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: DarkSurfaces.glassBorder,
  },
  authBtn: {
    backgroundColor: BrandColors.purple,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: BrandColors.purple,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  disabledBtn: {
    backgroundColor: DarkTextColors.tertiary,
  },
  authBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
