import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NyaisaCharacter } from '../components/NyaisaCharacter';
import { SpeechBubble } from '../components/SpeechBubble';
import { CardUI } from '../components/CardUI';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0.3,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'おはよう' : hour < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={[colors.primaryOrange, colors.lightOrange]} style={styles.header}>
          <SafeAreaView edges={['top']}>
            <Text style={styles.greeting}>{greeting}、さくらさん 🌟</Text>
            <Text style={styles.headerSub}>今日も一緒に学んでいこう！</Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 7日連続学習中！</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.body}>
          {/* Speech bubble */}
          <SpeechBubble
            message="投資は長く続けることが大事！今日も少しずつ学んでいこうにゃ✨"
            title="💬 今日のひとこと"
            emotion="happy"
          />

          {/* Savings card */}
          <CardUI style={styles.mb14}>
            <Text style={styles.cardLabel}>今月の積立状況</Text>
            <Text style={styles.savingsAmount}>¥10,000</Text>
            <Text style={styles.savingsTarget}>目標 ¥33,333（年間上限の1/12）</Text>
            <ProgressBar progress={0.3} style={{ marginVertical: 8 }} />
            <Text style={styles.savingsPct}>✅ 30% 達成！</Text>
          </CardUI>

          {/* Chart */}
          <CardUI style={styles.mb14}>
            <Text style={styles.sectionTitle}>📈 資産推移グラフ（6ヶ月）</Text>
            <View style={styles.chartPlaceholder}>
              <View style={styles.chartLine} />
              <View style={[styles.chartDot, { left: '10%', bottom: '20%' }]} />
              <View style={[styles.chartDot, { left: '30%', bottom: '35%' }]} />
              <View style={[styles.chartDot, { left: '50%', bottom: '55%' }]} />
              <View style={[styles.chartDot, { left: '70%', bottom: '70%' }]} />
              <View style={[styles.chartDot, { left: '90%', bottom: '82%' }]} />
              <View style={styles.chartLabels}>
                {['1月','2月','3月','4月','5月','6月'].map((m,i) => (
                  <Text key={i} style={styles.chartLabel}>{m}</Text>
                ))}
              </View>
            </View>
          </CardUI>

          {/* Today's lesson */}
          <TouchableOpacity onPress={() => navigation.navigate('Learning')}>
            <LinearGradient colors={[colors.skyBlue, colors.blueMid]} style={styles.lessonCard}>
              <View style={styles.lessonIcon}><Text style={styles.lessonEmoji}>📚</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.lessonTitle}>今日のレッスン</Text>
                <Text style={styles.lessonSub}>分散投資とは？ · 3分 · +50XP</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Daily challenge */}
          <CardUI style={[styles.mb14, styles.challengeCard]}>
            <View style={styles.challengeIcon}><Text style={{ fontSize: 24 }}>🎯</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>デイリーチャレンジ</Text>
              <Text style={styles.challengeSub}>今日のクイズに挑戦して+30XP！</Text>
            </View>
            <View style={styles.tagOrange}><Text style={styles.tagOrangeText}>未達成</Text></View>
          </CardUI>

          {/* Tip card */}
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🐱 ニャイサのワンポイント</Text>
            <Text style={styles.tipText}>
              つみたてNISAの<Text style={styles.tipHighlight}>年間上限は40万円</Text>。
              月々33,333円積み立てると満額使えるにゃ！でも1,000円からでも大丈夫🎵
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8 },
  greeting: { fontSize: fontSize.xl, fontWeight: fontWeight.black, color: colors.white, marginBottom: 4 },
  headerSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: 'rgba(255,255,255,0.9)' },
  streakBadge: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginTop: 8 },
  streakText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.white },
  body: { padding: 16 },
  mb14: { marginBottom: 14 },
  cardLabel: { fontSize: 11, fontWeight: fontWeight.extrabold, color: colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  savingsAmount: { fontSize: fontSize['3xl'], fontWeight: fontWeight.black, color: colors.primaryOrange, marginBottom: 4 },
  savingsTarget: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textLight, marginBottom: 4 },
  savingsPct: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.successGreen, marginTop: 4 },
  sectionTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark, marginBottom: 10 },
  chartPlaceholder: { height: 80, backgroundColor: colors.warmBeige, borderRadius: 12, position: 'relative', overflow: 'hidden' },
  chartLine: { position: 'absolute', bottom: '20%', left: 0, right: 0, height: 2, backgroundColor: colors.primaryOrange, opacity: 0.3 },
  chartDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primaryOrange },
  chartLabels: { position: 'absolute', bottom: 4, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around' },
  chartLabel: { fontSize: 9, color: colors.textLight, fontWeight: fontWeight.bold },
  lessonCard: { borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  lessonIcon: { width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  lessonEmoji: { fontSize: 24 },
  lessonTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.white, marginBottom: 4 },
  lessonSub: { fontSize: fontSize.sm, color: 'rgba(255,255,255,0.9)' },
  chevron: { fontSize: 24, color: 'rgba(255,255,255,0.7)' },
  challengeCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  challengeIcon: { width: 48, height: 48, backgroundColor: '#FFF0E6', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  challengeTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark },
  challengeSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textLight },
  tagOrange: { backgroundColor: colors.orangeLight, borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  tagOrangeText: { fontSize: 11, fontWeight: fontWeight.bold, color: colors.primaryOrange },
  tipCard: { backgroundColor: colors.warmBeige, borderRadius: 20, padding: 16, borderLeftWidth: 4, borderLeftColor: colors.primaryOrange },
  tipTitle: { fontSize: 11, fontWeight: fontWeight.extrabold, color: colors.primaryOrange, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  tipText: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textDark, lineHeight: 20 },
  tipHighlight: { backgroundColor: colors.warning, fontWeight: fontWeight.extrabold },
});

export default HomeScreen;
