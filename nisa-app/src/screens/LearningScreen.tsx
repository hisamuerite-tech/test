import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpeechBubble } from '../components/SpeechBubble';
import { CardUI } from '../components/CardUI';
import { ProgressBar } from '../components/ProgressBar';
import { XPBadge } from '../components/XPBadge';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import { lessons, Lesson } from '../data/learningContent';

const LessonCard: React.FC<{
  lesson: Lesson;
  onPress: () => void;
  isExpanded: boolean;
}> = ({ lesson, onPress, isExpanded }) => {
  const iconBg: Record<string, string> = {
    done: colors.successLight,
    current: colors.orangeLight,
    locked: '#F5F5F5',
  };

  const statusEmoji: Record<string, string> = {
    done: '✅',
    current: '▶️',
    locked: '🔒',
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.lessonCard,
          lesson.status === 'current' && styles.lessonCurrent,
          lesson.status === 'done' && styles.lessonDone,
          lesson.status === 'locked' && styles.lessonLocked,
        ]}
        onPress={lesson.status !== 'locked' ? onPress : undefined}
        activeOpacity={lesson.status === 'locked' ? 1 : 0.7}
      >
        {lesson.status === 'current' && (
          <View style={styles.currentRibbon}>
            <Text style={styles.currentRibbonText}>今日のレッスン</Text>
          </View>
        )}
        <View style={[styles.lessonIcon, { backgroundColor: iconBg[lesson.status] }]}>
          <Text style={{ fontSize: 24 }}>{lesson.emoji}</Text>
        </View>
        <View style={styles.lessonInfo}>
          <Text style={[styles.lessonTitle, lesson.status === 'locked' && { color: colors.textLight }]}>
            {lesson.title}
          </Text>
          <View style={styles.lessonMeta}>
            <Text style={styles.lessonDuration}>⏱ {lesson.durationMin}分</Text>
            <XPBadge xp={lesson.xp} size="sm" />
            {lesson.status === 'done' && (
              <View style={styles.tagGreen}><Text style={styles.tagGreenText}>完了！</Text></View>
            )}
            {lesson.status === 'current' && (
              <View style={styles.tagOrange}><Text style={styles.tagOrangeText}>学習中</Text></View>
            )}
            {lesson.status === 'locked' && (
              <View style={styles.tagGray}><Text style={styles.tagGrayText}>ロック中</Text></View>
            )}
          </View>
        </View>
        <Text style={{ fontSize: 20 }}>{statusEmoji[lesson.status]}</Text>
      </TouchableOpacity>

      {/* Expanded content for current lesson */}
      {isExpanded && lesson.status === 'current' && (
        <CardUI style={styles.lessonDetail}>
          <Text style={styles.detailTitle}>{lesson.emoji} {lesson.title}</Text>
          <SpeechBubble
            message="「卵は一つのカゴに盛るな」それが分散投資の考え方にゃ！"
            emotion="thinking"
            catSize={36}
          />
          {lesson.content.map((block, i) => (
            <View
              key={i}
              style={[
                styles.contentBlock,
                block.type === 'highlight' && styles.contentHighlight,
                block.type === 'tip' && styles.contentTip,
              ]}
            >
              {block.type === 'tip' && (
                <Text style={styles.contentTipTitle}>💡 ポイント</Text>
              )}
              <Text style={styles.contentText}>{block.body}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.completedBtn}
            onPress={() => Alert.alert('🎉 レッスン完了！', `+${lesson.xp}XP 獲得！\nすごいにゃ！継続は力なり！`)}
          >
            <Text style={styles.completedBtnText}>✅ 理解できた！+{lesson.xp}XP</Text>
          </TouchableOpacity>
        </CardUI>
      )}
    </View>
  );
};

const LearningScreen: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('diversification');

  const toggleLesson = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.lightOrange, colors.primaryOrange]} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <Text style={styles.headerTitle}>ニャイサ学習塾 📚</Text>
          <View style={styles.levelRow}>
            <View style={styles.levelBadge}><Text style={styles.levelText}>⭐ レベル2</Text></View>
            <ProgressBar
              progress={0.65}
              height={8}
              color={colors.white}
              backgroundColor="rgba(255,255,255,0.3)"
              style={{ flex: 1 }}
            />
            <Text style={styles.xpText}>650/1000 XP</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        <SpeechBubble
          message="順番に学ぶと理解しやすいにゃ！今は「分散投資」を一緒に学ぼう📖"
          title="💭 ニャイサより"
          emotion="thinking"
        />

        <View style={styles.lessonList}>
          {lessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isExpanded={expandedId === lesson.id}
              onPress={() => toggleLesson(lesson.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8 },
  headerTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.black, color: colors.white, marginBottom: 12 },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  levelBadge: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, paddingHorizontal: 14, paddingVertical: 4 },
  levelText: { fontSize: fontSize.sm, fontWeight: fontWeight.extrabold, color: colors.white },
  xpText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: 'rgba(255,255,255,0.9)' },
  body: { padding: 16, paddingBottom: 40 },
  lessonList: { gap: 10, marginTop: 4 },
  lessonCard: { backgroundColor: colors.white, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 14, shadowColor: colors.primaryOrange, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3, position: 'relative', overflow: 'hidden' },
  lessonCurrent: { borderWidth: 2, borderColor: colors.primaryOrange, shadowOpacity: 0.18 },
  lessonDone: { backgroundColor: '#F8FFF8' },
  lessonLocked: { opacity: 0.6 },
  currentRibbon: { position: 'absolute', top: 0, right: 0, backgroundColor: colors.primaryOrange, borderBottomLeftRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  currentRibbonText: { fontSize: 9, fontWeight: fontWeight.extrabold, color: colors.white },
  lessonIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark, marginBottom: 4 },
  lessonMeta: { flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  lessonDuration: { fontSize: 11, fontWeight: fontWeight.semibold, color: colors.textLight },
  tagGreen: { backgroundColor: colors.successLight, borderRadius: 50, paddingHorizontal: 8, paddingVertical: 2 },
  tagGreenText: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.successGreen },
  tagOrange: { backgroundColor: colors.orangeLight, borderRadius: 50, paddingHorizontal: 8, paddingVertical: 2 },
  tagOrangeText: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.primaryOrange },
  tagGray: { backgroundColor: '#F5F5F5', borderRadius: 50, paddingHorizontal: 8, paddingVertical: 2 },
  tagGrayText: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.textLight },
  lessonDetail: { marginTop: -4, marginBottom: 8, borderTopLeftRadius: 0, borderTopRightRadius: 0 },
  detailTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.black, color: colors.textDark, marginBottom: 12 },
  contentBlock: { backgroundColor: colors.warmBeige, borderRadius: 14, padding: 14, marginBottom: 10 },
  contentHighlight: { backgroundColor: colors.lightBlue },
  contentTip: { backgroundColor: '#E8F8F0' },
  contentTipTitle: { fontSize: fontSize.sm, fontWeight: fontWeight.extrabold, color: colors.successGreen, marginBottom: 4 },
  contentText: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textDark, lineHeight: 20 },
  completedBtn: { backgroundColor: colors.primaryOrange, borderRadius: 50, padding: 14, alignItems: 'center', shadowColor: colors.primaryOrange, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  completedBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: fontWeight.extrabold },
});

export default LearningScreen;
