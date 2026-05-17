import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Dimensions, TextInput, FlatList, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NyaisaCharacter } from '../components/NyaisaCharacter';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

type ExperienceLevel = 'beginner' | 'some' | 'experienced';

const slides = [
  { id: '1', title: 'こんにちは！\nニャイサです🐱', subtitle: 'NISAって難しそう…でも大丈夫！\n猫でも分かるやさしい言葉で\n一緒に学んでいきましょう✨' },
  { id: '2', title: 'NISAを一緒に\n学ぼう！', subtitle: '' },
  { id: '3', title: 'プロフィール設定', subtitle: 'あなたのことを教えてください！' },
];

const features = [
  { emoji: '📖', title: 'やさしい解説', sub: '難しい言葉は使いません' },
  { emoji: '🎯', title: '診断でぴったりプラン', sub: 'あなたに合った提案' },
  { emoji: '📊', title: 'シミュレーション', sub: '将来の資産を試算' },
];

const experienceOptions: { key: ExperienceLevel; emoji: string; label: string }[] = [
  { key: 'beginner', emoji: '🐣', label: '初めて' },
  { key: 'some', emoji: '🌱', label: '少しある' },
  { key: 'experienced', emoji: '🌳', label: '経験あり' },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState('');
  const [experience, setExperience] = useState<ExperienceLevel>('beginner');
  const scrollRef = useRef<FlatList>(null);

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      const next = currentSlide + 1;
      setCurrentSlide(next);
      scrollRef.current?.scrollToIndex({ index: next, animated: true });
    }
  };

  const goBack = () => {
    if (currentSlide > 0) {
      const prev = currentSlide - 1;
      setCurrentSlide(prev);
      scrollRef.current?.scrollToIndex({ index: prev, animated: true });
    }
  };

  const renderSlide = ({ item, index }: { item: typeof slides[0]; index: number }) => (
    <View style={styles.slide}>
      {index === 0 && (
        <>
          <NyaisaCharacter size={160} emotion="happy" />
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        </>
      )}
      {index === 1 && (
        <>
          <NyaisaCharacter size={120} emotion="encouraging" />
          <Text style={styles.slideTitle}>{item.title}</Text>
          <View style={styles.featureList}>
            {features.map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <View style={styles.featureIcon}><Text style={styles.featureEmoji}>{f.emoji}</Text></View>
                <View>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureSub}>{f.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
      {index === 2 && (
        <>
          <Text style={styles.setupEmoji}>🐱</Text>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          <View style={styles.profileSetup}>
            <Text style={styles.inputLabel}>お名前</Text>
            <TextInput
              style={styles.input}
              placeholder="例：田中さくら"
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textLight}
            />
            <Text style={styles.inputLabel}>投資の経験は？</Text>
            <View style={styles.expOptions}>
              {experienceOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.expOption, experience === opt.key && styles.expOptionSelected]}
                  onPress={() => setExperience(opt.key)}
                >
                  <Text style={styles.expEmoji}>{opt.emoji}</Text>
                  <Text style={[styles.expLabel, experience === opt.key && { color: colors.primaryOrange }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );

  return (
    <LinearGradient colors={[colors.warmBeige, colors.background]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onComplete}>
            <Text style={styles.skip}>スキップ</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={scrollRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        />

        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentSlide && styles.dotActive]} />
          ))}
        </View>

        {/* Navigation buttons */}
        <View style={styles.navBtns}>
          {currentSlide > 0 && (
            <TouchableOpacity style={styles.btnSecondary} onPress={goBack}>
              <Text style={styles.btnSecondaryText}>戻る</Text>
            </TouchableOpacity>
          )}
          {currentSlide < slides.length - 1 ? (
            <TouchableOpacity style={[styles.btnPrimary, currentSlide > 0 && { flex: 2 }]} onPress={goNext}>
              <Text style={styles.btnPrimaryText}>次へ →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.btnPrimary, { flex: 1 }]} onPress={onComplete}>
              <Text style={styles.btnPrimaryText}>はじめる 🚀</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingVertical: 8 },
  skip: { fontSize: fontSize.base, fontWeight: fontWeight.bold, color: colors.textLight },
  slide: { width, paddingHorizontal: 24, alignItems: 'center', paddingTop: 16 },
  slideTitle: { fontSize: fontSize['2xl'], fontWeight: fontWeight.black, color: colors.textDark, textAlign: 'center', marginTop: 16, marginBottom: 10, lineHeight: 32 },
  slideSubtitle: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.textMid, textAlign: 'center', lineHeight: 22 },
  setupEmoji: { fontSize: 52, marginBottom: 8 },
  featureList: { width: '100%', marginTop: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  featureIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.orangeLight, alignItems: 'center', justifyContent: 'center' },
  featureEmoji: { fontSize: 20 },
  featureTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark },
  featureSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textLight },
  profileSetup: { width: '100%', marginTop: 12 },
  inputLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.extrabold, color: colors.textLight, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { borderWidth: 2, borderColor: colors.border, borderRadius: 16, padding: 12, fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.textDark, marginBottom: 14 },
  expOptions: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  expOption: { flex: 1, borderWidth: 2, borderColor: colors.border, borderRadius: 14, padding: 10, alignItems: 'center' },
  expOptionSelected: { borderColor: colors.primaryOrange, backgroundColor: colors.orangeLight },
  expEmoji: { fontSize: 22, marginBottom: 4 },
  expLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.textMid },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.lightOrange },
  dotActive: { width: 24, borderRadius: 4, backgroundColor: colors.primaryOrange },
  navBtns: { flexDirection: 'row', gap: 12, paddingHorizontal: 24, paddingBottom: 16 },
  btnPrimary: { flex: 1, backgroundColor: colors.primaryOrange, borderRadius: 50, paddingVertical: 14, alignItems: 'center', shadowColor: colors.primaryOrange, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 },
  btnPrimaryText: { color: colors.white, fontSize: fontSize.md, fontWeight: fontWeight.extrabold },
  btnSecondary: { flex: 1, borderWidth: 2, borderColor: colors.primaryOrange, borderRadius: 50, paddingVertical: 12, alignItems: 'center' },
  btnSecondaryText: { color: colors.primaryOrange, fontSize: fontSize.base, fontWeight: fontWeight.bold },
});

export default OnboardingScreen;
