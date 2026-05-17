import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpeechBubble } from '../components/SpeechBubble';
import { CardUI } from '../components/CardUI';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import { products, Product } from '../data/learningContent';

type FilterType = 'all' | 'growth' | 'balance' | 'safe';

const riskConfig: Record<string, { bg: string; color: string; label: string }> = {
  low: { bg: colors.successLight, color: colors.successGreen, label: '🛡 安心型' },
  mid: { bg: colors.orangeLight, color: colors.primaryOrange, label: '📈 バランス' },
  high: { bg: '#FFE8E8', color: '#E05A5A', label: '🚀 成長型' },
};

const StarRating: React.FC<{ stars: number }> = ({ stars }) => (
  <Text style={{ fontSize: 13, color: colors.warning }}>
    {'⭐'.repeat(stars)}{'☆'.repeat(5 - stars)}
  </Text>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const risk = riskConfig[product.riskLevel];
  return (
    <CardUI style={styles.prodCard}>
      <View style={styles.prodHeader}>
        <Text style={styles.prodName}>{product.name}</Text>
        <View style={[styles.riskBadge, { backgroundColor: risk.bg }]}>
          <Text style={[styles.riskText, { color: risk.color }]}>{risk.label}</Text>
        </View>
      </View>
      <View style={styles.prodMeta}>
        <StarRating stars={product.stars} />
        <Text style={styles.prodFee}>
          信託報酬 <Text style={styles.prodFeeVal}>{product.fee}</Text>
        </Text>
      </View>
      <View style={styles.comment}>
        <Text style={{ fontSize: 20 }}>🐱</Text>
        <Text style={styles.commentText}>{product.nyaisaComment}</Text>
      </View>
      <View style={styles.prodFooter}>
        <View style={[styles.tag, { backgroundColor: '#E0F4FB' }]}>
          <Text style={[styles.tagText, { color: '#4A9FB5' }]}>
            {product.nisaCompatible ? 'つみたてNISA対応 ✅' : '一般NISA対応'}
          </Text>
        </View>
        <TouchableOpacity style={styles.detailBtn}>
          <Text style={styles.detailBtnText}>くわしく見る</Text>
        </TouchableOpacity>
      </View>
    </CardUI>
  );
};

const ProductsScreen: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = products.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'safe') return p.type === 'safe' || p.riskLevel === 'low';
    if (filter === 'balance') return p.type === 'balance';
    if (filter === 'growth') return p.type === 'growth';
    return true;
  });

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'すべて' },
    { key: 'safe', label: '安心型' },
    { key: 'balance', label: 'バランス型' },
    { key: 'growth', label: '成長型' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.lightBlue, colors.skyBlue]} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <Text style={styles.headerTitle}>ニャイサのおすすめ 🐱</Text>
          <Text style={styles.headerSub}>難しい商品をわかりやすく解説！</Text>
          <SpeechBubble
            message="手数料が安いほど長期的にはお得！信託報酬0.2%以下を選ぼうにゃ🎯"
            emotion="happy"
            catSize={40}
          />
        </SafeAreaView>
      </LinearGradient>

      {/* Filter tabs */}
      <View style={styles.filterWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filterTabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.filterTab, filter === tab.key && styles.filterTabActive]}
              onPress={() => setFilter(tab.key)}
            >
              <Text style={[styles.filterTabText, filter === tab.key && styles.filterTabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 16, paddingTop: 8 },
  headerTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.black, color: colors.textDark, marginBottom: 4 },
  headerSub: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textMid, marginBottom: 8 },
  filterWrap: { backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  filterScroll: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterTab: { borderWidth: 2, borderColor: colors.border, borderRadius: 50, paddingHorizontal: 16, paddingVertical: 6, backgroundColor: colors.white },
  filterTabActive: { borderColor: colors.primaryOrange, backgroundColor: colors.orangeLight },
  filterTabText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.textLight },
  filterTabTextActive: { color: colors.primaryOrange },
  body: { padding: 16, paddingBottom: 40 },
  prodCard: { marginBottom: 12 },
  prodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  prodName: { fontSize: fontSize.base, fontWeight: fontWeight.extrabold, color: colors.textDark, flex: 1, marginRight: 8, lineHeight: 20 },
  riskBadge: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4, flexShrink: 0 },
  riskText: { fontSize: 10, fontWeight: fontWeight.extrabold },
  prodMeta: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 10 },
  prodFee: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.textMid },
  prodFeeVal: { color: colors.primaryOrange, fontWeight: fontWeight.extrabold },
  comment: { backgroundColor: colors.warmBeige, borderRadius: 12, padding: 10, flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginBottom: 10 },
  commentText: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.textMid, flex: 1, lineHeight: 18 },
  prodFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tag: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: fontWeight.bold },
  detailBtn: { backgroundColor: colors.orangeLight, borderRadius: 50, paddingHorizontal: 16, paddingVertical: 8 },
  detailBtnText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.primaryOrange },
});

export default ProductsScreen;
