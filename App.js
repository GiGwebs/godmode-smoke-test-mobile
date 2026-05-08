import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

export default function App() {
  const pulse = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(glow, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.9] });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background grid lines */}
      <View style={styles.gridOverlay} pointerEvents="none" />

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>MOBILE CI/CD</Text>
        </View>
        <View style={[styles.badge, styles.badgeLive]}>
          <Text style={styles.badgeText}>● LIVE</Text>
        </View>
      </View>

      <Animated.Text style={[styles.title, { transform: [{ scale: pulse }] }]}>
        GOD{'\n'}MODE
      </Animated.Text>

      <Animated.View style={[styles.glowLine, { opacity: glowOpacity }]} />

      <Text style={styles.subtitle}>Smoke Test · Mobile · EAS Build Pipeline</Text>

      <View style={styles.statsRow}>
        {[
          { label: 'Platform', value: 'EAS' },
          { label: 'Target', value: 'iOS + Android' },
          { label: 'Status', value: 'ACTIVATED' },
        ].map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>GiGwebs/workflows · Thin Caller Architecture</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060612',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.04,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  badge: {
    borderWidth: 1,
    borderColor: '#4f46e5',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: 'rgba(79,70,229,0.12)',
  },
  badgeLive: {
    borderColor: '#22d3ee',
    backgroundColor: 'rgba(34,211,238,0.1)',
  },
  badgeText: {
    color: '#a5b4fc',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 80,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 80,
    letterSpacing: -4,
    textShadowColor: 'rgba(139,92,246,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  glowLine: {
    width: '70%',
    height: 2,
    backgroundColor: '#7c3aed',
    borderRadius: 2,
    marginVertical: 24,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    letterSpacing: 1.2,
    marginBottom: 36,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statValue: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statLabel: {
    color: '#475569',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
  },
  footerText: {
    color: '#334155',
    fontSize: 11,
    letterSpacing: 0.5,
  },
});
