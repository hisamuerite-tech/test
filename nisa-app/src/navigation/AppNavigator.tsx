import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

import HomeScreen from '../screens/HomeScreen';
import LearningScreen from '../screens/LearningScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import SimulationScreen from '../screens/SimulationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

type TabIconName = keyof typeof Ionicons.glyphMap;

const tabConfig: Record<string, { label: string; icon: TabIconName; iconActive: TabIconName }> = {
  Home: { label: 'ホーム', icon: 'home-outline', iconActive: 'home' },
  Learning: { label: '学習', icon: 'book-outline', iconActive: 'book' },
  Diagnosis: { label: '診断', icon: 'search-outline', iconActive: 'search' },
  Simulation: { label: 'シミュ', icon: 'bar-chart-outline', iconActive: 'bar-chart' },
  Profile: { label: 'プロフィール', icon: 'person-outline', iconActive: 'person' },
};

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primaryOrange,
        tabBarInactiveTintColor: colors.textLight,
        tabBarIcon: ({ focused, color, size }) => {
          const config = tabConfig[route.name];
          const iconName: TabIconName = focused ? config.iconActive : config.icon;
          return (
            <View style={styles.iconWrap}>
              <Ionicons name={iconName} size={focused ? 24 : 22} color={color} />
              {focused && <View style={styles.activePill} />}
            </View>
          );
        },
        tabBarLabel: ({ color, focused }) => {
          const config = tabConfig[route.name];
          return (
            <Text style={[styles.tabLabel, { color, fontWeight: focused ? fontWeight.extrabold : fontWeight.bold }]}>
              {config.label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learning" component={LearningScreen} />
      <Tab.Screen name="Diagnosis" component={DiagnosisScreen} />
      <Tab.Screen name="Simulation" component={SimulationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: colors.primaryOrange,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    bottom: -6,
    width: 24,
    height: 3,
    backgroundColor: colors.primaryOrange,
    borderRadius: 3,
  },
  tabLabel: {
    fontSize: 9,
    marginTop: 2,
  },
});

export default AppNavigator;
