import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NyaisaCharacter, NyaisaEmotion } from './NyaisaCharacter';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

interface SpeechBubbleProps {
  message: string;
  title?: string;
  emotion?: NyaisaEmotion;
  catSize?: number;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  title,
  emotion = 'happy',
  catSize = 52,
}) => {
  return (
    <View style={styles.wrap}>
      <NyaisaCharacter size={catSize} emotion={emotion} />
      <View style={styles.bubble}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>{message}</Text>
        <View style={styles.tail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 12,
    shadowColor: colors.primaryOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  tail: {
    position: 'absolute',
    bottom: 8,
    left: -8,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.white,
  },
  title: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.extrabold,
    color: colors.primaryOrange,
    marginBottom: 4,
  },
  message: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textDark,
    lineHeight: fontSize.sm * 1.6,
  },
});

export default SpeechBubble;
