import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Slider } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpeechBubble } from '../components/SpeechBubble';
import { CardUI } from '../components/CardUI';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

function calcFutureValue(monthly: number, years: number, annualRate: number) {
  const months = years * 12;
  const mr = annualRate / 100 / 12;
  let total = 0;
  for (let i = 0; i < months; i++) {
    total = (total + monthly) * (1 + mr);
  }
  const principal = monthly * months;
  return { total: Math.round(total), principal, gain: Math.round(total - principal) };
}

function formatYen(n: number): string {
  if (n >= 100_000_000) return `¥${(n / 100_000_000).toFixed(1)}億`;
  if (n >= 10_000) return `¥${Math.round(n / 10_000)}万`;
  return `¥${n.toLocaleString()}`;
}

const BarChart: React.FC<{ monthly: number; years: number; rate: number }> = ({ monthly, years, rate }) => {
  const checkpoints = [5, 10, 15, 20, 25, 30].filter(y => y <= years);
  if (!checkpoints.includes(years)) checkpoints.push(years);

  const data = checkpoints.map(y => {
    const { total, principal } = calcFutureValue(monthly, y, rate);
    return { y, principal, gain: total - principal, total };
  });

  const maxVal = Math.max(...data.map(d => d.total));
  const maxBarH = 90;

  return (
    <View style={styles.chartWrap}>
      {data.map((d, i) => {
        const totalH = (d.total / maxVal) * maxBarH;
        const principalH = (d.principal / d.total) * totalH;
        const gainH = totalH - principalH;
        return (
          <View key={i} style={styles.barGroup}>
            <View style={[styles.barGain, { height: gainH }]} />
            <View style={[styles.barPrincipal, { height: principalH }]} />
            <Text style={styles.barLabel}>{d.y}年</Text>
          </View>
        );
      })}
    </View>
  );
};

const SliderRow: React.FC<{
  label: string; value: number; displayValue: string;
  min: number; max: number; step: number;
  onChange: (v: number) => void;
}> = ({ label, value, displayValue, min, max, step, onChange }) => (
  <CardUI style={styles.sliderCard}>
    <View style={styles.sliderHeader}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <Text style={styles.sliderVal}>{displayValue}</Text>
    </View>
    <Slider
      value={value}
      minimumValue={min}
      maximumValue={max}
      step={step}
      onValueChange={onChange}
      minimumTrackTintColor={colors.primaryOrange}
      maximumTrackTintColor={colors.border}
      thumbTintColor={colors.primaryOrange}
      style={{ height: 36 }}
    />
  </CardUI>
);

const SimulationScreen: React.FC = () => {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(5);

  const { total, principal, gain } = useMemo(
    () => calcFutureValue(monthly, years, rate),
    [monthly, years, rate]
  );

  const rentMonths = Math.round(total / 30000);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#5CBF8A', colors.skyBlue]} style={styles.header}>
          <SafeAreaView edges={['top']}>
            <Text style={styles.headerTitle}>将来いくらになるかな？💰</Text>
            <Text style={styles.headerSub}>スライダーを動かしてみよう！</Text>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.body}>
          {/* Result card */}
          <LinearGradient colors={[colors.primaryOrange, colors.lightOrange]} style={styles.resultCard}>
            <Text style={styles.resultLabel}>📊 {years}年後の試算額</Text>
            <Text style={styles.resultAmount}>{formatYen(total)}</Text>
            <Text style={styles.resultSub}>元本 {formatYen(principal)} ＋ 運用益 {formatYen(gain)}</Text>
          </LinearGradient>

          {/* Sliders */}
          <SliderRow
            label="月々の積立額"
            value={monthly}
            displayValue={`¥${monthly.toLocaleString()}`}
            min={1000} max={100000} step={1000}
            onChange={setMonthly}
          />
          <SliderRow
            label="積立期間"
            value={years}
            displayValue={`${years}年`}
            min={1} max={30} step={1}
            onChange={setYears}
          />
          <SliderRow
            label="想定利回り"
            value={rate}
            displayValue={`${rate}%`}
            min={1} max={10} step={0.5}
            onChange={setRate}
          />

          {/* NISA tax callout */}
          <View style={styles.taxCallout}>
            <Text style={{ fontSize: 28 }}>🎉</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.taxTitle}>NISAなら税金ゼロ！</Text>
              <Text style={styles.taxText}>通常は運用益に約20%の税金がかかりますが、NISAだと全額あなたのものになります！</Text>
            </View>
          </View>

          {/* Bar chart */}
          <CardUI style={styles.mb12}>
            <Text style={styles.chartTitle}>積立額 vs 運用益</Text>
            <BarChart monthly={monthly} years={years} rate={rate} />
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.lightBlue }]} />
                <Text style={styles.legendText}>積立元本</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primaryOrange }]} />
                <Text style={styles.legendText}>運用益</Text>
              </View>
            </View>
          </CardUI>

          {/* Fun comparison */}
          <View style={styles.funCard}>
            <Text style={styles.funText}>🏠 これは東京の家賃約{rentMonths}ヶ月分と同じ！</Text>
            <Text style={styles.funSub}>（月3万円の家賃換算）</Text>
          </View>

          <SpeechBubble
            message="長く積み立てるほど「複利」の力で運用益がどんどん増えるにゃ！早く始めることが一番大事！"
            emotion="encouraging"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8 },
  headerTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.black, color: colors.white, marginBottom: 4 },
  headerSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: 'rgba(255,255,255,0.9)' },
  body: { padding: 16 },
  resultCard: { borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 16, shadowColor: colors.primaryOrange, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 8 },
  resultLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: 'rgba(255,255,255,0.9)', marginBottom: 6 },
  resultAmount: { fontSize: fontSize['5xl'], fontWeight: fontWeight.black, color: colors.white, marginBottom: 4 },
  resultSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: 'rgba(255,255,255,0.9)' },
  sliderCard: { marginBottom: 12 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  sliderLabel: { fontSize: fontSize.sm, fontWeight: fontWeight.extrabold, color: colors.textDark },
  sliderVal: { fontSize: fontSize.md, fontWeight: fontWeight.extrabold, color: colors.primaryOrange },
  taxCallout: { backgroundColor: '#E8F8F0', borderRadius: 16, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginBottom: 12 },
  taxTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.successGreen, marginBottom: 4 },
  taxText: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textDark, lineHeight: 18 },
  mb12: { marginBottom: 12 },
  chartTitle: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark, marginBottom: 8 },
  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', height: 110, gap: 4, marginTop: 8 },
  barGroup: { flex: 1, alignItems: 'center' },
  barGain: { backgroundColor: colors.primaryOrange, borderRadius: 4, width: '80%' },
  barPrincipal: { backgroundColor: colors.lightBlue, width: '80%' },
  barLabel: { fontSize: 9, color: colors.textLight, fontWeight: fontWeight.bold, marginTop: 4 },
  legend: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 3 },
  legendText: { fontSize: 11, color: colors.textMid, fontWeight: fontWeight.bold },
  funCard: { backgroundColor: colors.warmBeige, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 2, borderColor: colors.lightOrange, borderStyle: 'dashed', marginBottom: 12 },
  funText: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.primaryOrange },
  funSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textMid, marginTop: 4 },
});

export default SimulationScreen;
