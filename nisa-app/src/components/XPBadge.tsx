import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

interface XPBadgeProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
}

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, size = 'md' }) => {
  const sizeMap = {
    sm: { padding: 3, paddingH: 8, fontSize: fontSize.xs },
    md: { padding: 4, paddingH: 10, fontSize: fontSize.sm },
    lg: { padding: 6, paddingH: 14, fontSize: fontSize.base },
  };
  const s = sizeMap[size];

  return (
    <View style={[styles.badge, { paddingVertical: s.padding, paddingHorizontal: s.paddingH }]}>
      <Text style={[styles.text, { fontSize: s.fontSize }]}>⭐ +{xp} XP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.orangeLight,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.primaryOrange,
    fontWeight: fontWeight.bold,
  },
});

export default XPBadge;
