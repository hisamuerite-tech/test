import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpeechBubble } from '../components/SpeechBubble';
import { CardUI } from '../components/CardUI';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

interface Question {
  question: string;
  options: { emoji: string; text: string }[];
}

const questions: Question[] = [
  {
    question: '投資の経験はありますか？',
    options: [{ emoji: '🐣', text: '初めて' }, { emoji: '🌱', text: '少しある' }, { emoji: '🌳', text: '経験あり' }],
  },
  {
    question: 'NISAで何をしたいですか？',
    options: [{ emoji: '👴', text: '老後の資金' }, { emoji: '🏠', text: '住宅購入' }, { emoji: '🎓', text: '教育費' }, { emoji: '✈️', text: '旅行や趣味' }],
  },
  {
    question: 'どのくらいの期間投資しますか？',
    options: [{ emoji: '📅', text: '5年くらい' }, { emoji: '🗓', text: '10年くらい' }, { emoji: '📆', text: '20年以上' }],
  },
  {
    question: '月にいくら積み立てたいですか？',
    options: [{ emoji: '💴', text: '1,000円〜' }, { emoji: '💰', text: '10,000円〜' }, { emoji: '💎', text: '30,000円〜' }],
  },
  {
    question: 'どのくらいリスクが取れますか？',
    options: [{ emoji: '🛡', text: '安全重視' }, { emoji: '⚖️', text: 'バランス型' }, { emoji: '🚀', text: '積極的に' }],
  },
];

const ResultFeature: React.FC<{ emoji: string; label: string; value: string }> = ({ emoji, label, value }) => (
  <CardUI style={styles.resultFeature}>
    <Text style={styles.resultFeatureEmoji}>{emoji}</Text>
    <Text style={styles.resultFeatureLabel}>{label}</Text>
    <Text style={styles.resultFeatureVal}>{value}</Text>
  </CardUI>
);

const DiagnosisScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const selectOption = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = index;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (step + 1 >= questions.length) {
        setShowResult(true);
      } else {
        setStep(step + 1);
      }
    }, 350);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.skyBlue, colors.lightBlue]} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <Text style={styles.headerTitle}>あなたにぴったりの{'\n'}NISAを探そう！🔍</Text>
          <Text style={styles.headerSub}>5つの質問に答えてね</Text>
        </SafeAreaView>
      </LinearGradient>

      <ProgressBar
        progress={showResult ? 1 : (step + 1) / questions.length}
        height={6}
        style={{ marginHorizontal: 20, marginVertical: 12 }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        {!showResult ? (
          <>
            <SpeechBubble
              message={questions[step].question}
              title={`質問 ${step + 1} / ${questions.length}`}
              emotion="thinking"
            />
            <View style={styles.optionsWrap}>
              {questions[step].options.map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, answers[step] === i && styles.optionSelected]}
                  onPress={() => selectOption(i)}
                >
                  <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                  <Text style={[styles.optionText, answers[step] === i && styles.optionTextSelected]}>
                    {opt.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {step > 0 && (
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}>
                <Text style={styles.backBtnText}>← 戻る</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View>
            <LinearGradient colors={[colors.primaryOrange, colors.lightOrange]} style={styles.resultBadge}>
              <Text style={{ fontSize: 40, marginBottom: 8 }}>🎉</Text>
              <Text style={styles.resultTitle}>診断結果</Text>
              <Text style={styles.resultType}>つみたてNISA がおすすめ！</Text>
              <Text style={styles.resultDesc}>
                長期・積立・分散投資に最適な制度です。毎月コツコツ積み立てて、将来の資産をつくりましょう！
              </Text>
            </LinearGradient>

            <View style={styles.featuresGrid}>
              <ResultFeature emoji="📅" label="非課税期間" value="無期限" />
              <ResultFeature emoji="💰" label="年間上限" value="120万円" />
              <ResultFeature emoji="🏦" label="最低金額" value="100円〜" />
              <ResultFeature emoji="📊" label="対象商品" value="投資信託" />
            </View>

            <SpeechBubble
              message="つみたてNISAは毎月少額からコツコツ投資できる制度にゃ！まずはシミュレーションで将来の金額を試してみよう！"
              emotion="happy"
            />

            <View style={styles.resultBtns}>
              <TouchableOpacity style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>シミュレーションしてみる 📊</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={reset}>
                <Text style={styles.btnSecondaryText}>もう一度診断する</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8 },
  headerTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.black, color: colors.textDark, marginBottom: 6, lineHeight: 28 },
  headerSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textMid },
  body: { padding: 16, paddingBottom: 40 },
  optionsWrap: { gap: 10, marginTop: 4 },
  option: { backgroundColor: colors.white, borderWidth: 2, borderColor: colors.border, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionSelected: { borderColor: colors.primaryOrange, backgroundColor: colors.orangeLight },
  optionEmoji: { fontSize: 24 },
  optionText: { fontSize: fontSize.base, fontWeight: fontWeight.bold, color: colors.textDark },
  optionTextSelected: { color: colors.primaryOrange },
  backBtn: { borderWidth: 2, borderColor: colors.primaryOrange, borderRadius: 50, padding: 12, alignItems: 'center', marginTop: 16 },
  backBtnText: { color: colors.primaryOrange, fontSize: fontSize.base, fontWeight: fontWeight.bold },
  resultBadge: { borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 16 },
  resultTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.black, color: colors.white, marginBottom: 6 },
  resultType: { fontSize: fontSize['2xl'], fontWeight: fontWeight.black, color: colors.white, marginBottom: 8 },
  resultDesc: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: 'rgba(255,255,255,0.95)', lineHeight: 20, textAlign: 'center' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  resultFeature: { width: '47%', alignItems: 'center', padding: 14 },
  resultFeatureEmoji: { fontSize: 24, marginBottom: 6 },
  resultFeatureLabel: { fontSize: 11, fontWeight: fontWeight.extrabold, color: colors.textLight, marginBottom: 2 },
  resultFeatureVal: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark },
  resultBtns: { gap: 10, marginTop: 4, paddingBottom: 20 },
  btnPrimary: { backgroundColor: colors.primaryOrange, borderRadius: 50, padding: 14, alignItems: 'center', shadowColor: colors.primaryOrange, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 },
  btnPrimaryText: { color: colors.white, fontSize: fontSize.md, fontWeight: fontWeight.extrabold },
  btnSecondary: { borderWidth: 2, borderColor: colors.primaryOrange, borderRadius: 50, padding: 12, alignItems: 'center' },
  btnSecondaryText: { color: colors.primaryOrange, fontSize: fontSize.base, fontWeight: fontWeight.bold },
});

export default DiagnosisScreen;
