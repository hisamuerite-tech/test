import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SpeechBubble } from '../components/SpeechBubble';
import { CardUI } from '../components/CardUI';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

interface StatBoxProps { value: string | number; label: string }
const StatBox: React.FC<StatBoxProps> = ({ value, label }) => (
  <CardUI style={styles.statBox}>
    <Text style={styles.statNum}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </CardUI>
);

interface BadgeItemProps { emoji: string; name: string; earned: boolean }
const BadgeItem: React.FC<BadgeItemProps> = ({ emoji, name, earned }) => (
  <View style={styles.badgeItem}>
    <View style={[styles.badgeCircle, earned ? styles.badgeEarned : styles.badgeLocked]}>
      <Text style={{ fontSize: 26, opacity: earned ? 1 : 0.4 }}>{emoji}</Text>
    </View>
    <Text style={styles.badgeName}>{name}</Text>
  </View>
);

interface SettingsRowProps { icon: string; label: string; iconBg: string; iconColor: string }
const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, iconBg, iconColor }) => (
  <TouchableOpacity style={styles.settingsRow}>
    <View style={[styles.settingsIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={icon as any} size={18} color={iconColor} />
    </View>
    <Text style={styles.settingsLabel}>{label}</Text>
    <Ionicons name="chevron-forward" size={14} color={colors.textLight} />
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={[colors.primaryOrange, colors.lightOrange]} style={styles.header}>
          <SafeAreaView edges={['top']}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 36 }}>🐱</Text>
            </View>
            <Text style={styles.name}>さくらさん</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberText}>🌟 シルバー会員</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatBox value="7" label="🔥 連続日数" />
          <StatBox value="2" label="📚 完了レッスン" />
          <StatBox value="650" label="⭐ 獲得XP" />
        </View>

        <View style={styles.body}>
          {/* Badges */}
          <CardUI style={styles.mb12}>
            <Text style={styles.sectionTitle}>🏅 バッジコレクション</Text>
            <View style={styles.badgesGrid}>
              <BadgeItem emoji="🐣" name="初心者" earned={true} />
              <BadgeItem emoji="📚" name="学習者" earned={true} />
              <BadgeItem emoji="💪" name="挑戦者" earned={false} />
              <BadgeItem emoji="🌟" name="マスター" earned={false} />
            </View>
          </CardUI>

          {/* Goal */}
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>🎯 NISA目標設定</Text>
            <Text style={styles.goalAmount}>¥5,000,000</Text>
            <Text style={styles.goalDesc}>老後の資金として20年で達成目標</Text>
            <ProgressBar progress={0.024} style={{ marginVertical: 8 }} />
            <Text style={styles.goalProgress}>現在 ¥120,000 / 目標 ¥5,000,000</Text>
          </View>

          {/* Settings */}
          <CardUI style={[styles.mb12, { padding: 0 }]}>
            <SettingsRow icon="notifications-outline" label="通知設定" iconBg={colors.orangeLight} iconColor={colors.primaryOrange} />
            <View style={styles.divider} />
            <SettingsRow icon="flag-outline" label="目標の変更" iconBg={colors.lightBlue} iconColor={colors.blueMid} />
            <View style={styles.divider} />
            <SettingsRow icon="shield-checkmark-outline" label="プライバシー" iconBg={colors.successLight} iconColor={colors.successGreen} />
            <View style={styles.divider} />
            <SettingsRow icon="help-circle-outline" label="ヘルプ・よくある質問" iconBg="#F5F5F5" iconColor={colors.textLight} />
          </CardUI>

          {/* Consult button */}
          <TouchableOpacity
            style={styles.consultBtn}
            onPress={() => Alert.alert('🐱 ニャイサより', 'いつでも相談してにゃ！\nレッスンでわからないことがあれば、どんどん聞いてね！')}
          >
            <Text style={{ fontSize: 24 }}>🐱</Text>
            <Text style={styles.consultText}>ニャイサに相談する</Text>
          </TouchableOpacity>

          <SpeechBubble
            message="7日間連続で頑張ってるにゃ！🔥 次のバッジまであと3レッスン！一緒に頑張ろう💪"
            emotion="encouraging"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.6)' },
  name: { fontSize: fontSize['2xl'], fontWeight: fontWeight.black, color: colors.white, marginBottom: 6 },
  memberBadge: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, paddingHorizontal: 14, paddingVertical: 4 },
  memberText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.white },
  statsRow: { flexDirection: 'row', gap: 10, margin: 16 },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: fontSize['2xl'], fontWeight: fontWeight.black, color: colors.primaryOrange },
  statLabel: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.textLight, marginTop: 2, textAlign: 'center' },
  body: { paddingHorizontal: 16, paddingBottom: 40 },
  mb12: { marginBottom: 12 },
  sectionTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark, marginBottom: 14 },
  badgesGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  badgeItem: { alignItems: 'center' },
  badgeCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  badgeEarned: { backgroundColor: colors.warning },
  badgeLocked: { backgroundColor: colors.border },
  badgeName: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.textMid },
  goalCard: { backgroundColor: colors.warmBeige, borderRadius: 20, padding: 16, marginBottom: 12 },
  goalTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark, marginBottom: 8 },
  goalAmount: { fontSize: fontSize['3xl'], fontWeight: fontWeight.black, color: colors.primaryOrange, marginBottom: 4 },
  goalDesc: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textMid, marginBottom: 2 },
  goalProgress: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textMid, marginTop: 4 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  settingsIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingsLabel: { flex: 1, fontSize: fontSize.base, fontWeight: fontWeight.bold, color: colors.textDark },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: 14 },
  consultBtn: { backgroundColor: colors.primaryOrange, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16, shadowColor: colors.primaryOrange, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 },
  consultText: { fontSize: fontSize.md, fontWeight: fontWeight.extrabold, color: colors.white },
});

export default ProfileScreen;
