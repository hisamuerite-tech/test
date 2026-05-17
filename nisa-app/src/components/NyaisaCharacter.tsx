import React from 'react';
import Svg, {
  Circle, Polygon, Path, Ellipse, Line, Rect, Text as SvgText,
} from 'react-native-svg';

export type NyaisaEmotion = 'happy' | 'surprised' | 'thinking' | 'encouraging' | 'neutral';

interface NyaisaCharacterProps {
  size?: number;
  emotion?: NyaisaEmotion;
}

export const NyaisaCharacter: React.FC<NyaisaCharacterProps> = ({
  size = 60,
  emotion = 'happy',
}) => {
  const s = size / 52; // scale factor based on 52x52 viewBox

  const renderEyes = () => {
    switch (emotion) {
      case 'happy':
        return (
          <>
            <Path d="M20,27 Q23,22 26,27" stroke="#2D2D2D" strokeWidth={2.5} fill="none" strokeLinecap="round" />
            <Path d="M26,27 Q29,22 32,27" stroke="#2D2D2D" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          </>
        );
      case 'surprised':
        return (
          <>
            <Circle cx={22} cy={26} r={5} fill="#fff" />
            <Circle cx={30} cy={26} r={5} fill="#fff" />
            <Circle cx={22} cy={26} r={3} fill="#2D2D2D" />
            <Circle cx={30} cy={26} r={3} fill="#2D2D2D" />
            <Circle cx={23} cy={25} r={1} fill="#fff" />
            <Circle cx={31} cy={25} r={1} fill="#fff" />
          </>
        );
      case 'thinking':
        return (
          <>
            <Circle cx={22} cy={26} r={5} fill="#fff" />
            <Circle cx={30} cy={26} r={5} fill="#fff" />
            <Circle cx={23} cy={25} r={2.5} fill="#2D2D2D" />
            <Circle cx={31} cy={25} r={2.5} fill="#2D2D2D" />
          </>
        );
      case 'encouraging':
        return (
          <>
            <Path d="M19,27 Q22,20 25,27" stroke="#2D2D2D" strokeWidth={3} fill="none" strokeLinecap="round" />
            <Path d="M27,27 Q30,20 33,27" stroke="#2D2D2D" strokeWidth={3} fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <Circle cx={22} cy={26} r={4} fill="#fff" />
            <Circle cx={30} cy={26} r={4} fill="#fff" />
            <Circle cx={22} cy={26} r={2} fill="#2D2D2D" />
            <Circle cx={30} cy={26} r={2} fill="#2D2D2D" />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (emotion) {
      case 'surprised':
        return <Ellipse cx={26} cy={35} rx={3} ry={4} fill="#2D2D2D" opacity={0.7} />;
      case 'encouraging':
        return (
          <>
            <Ellipse cx={26} cy={33} rx={3} ry={2} fill="#FF6B6B" />
            <Path d="M22,36 Q26,41 30,36" stroke="#E05A5A" strokeWidth={1.5} fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <Ellipse cx={26} cy={33} rx={3} ry={2} fill="#FF6B6B" />
            <Path d="M22,36 Q26,40 30,36" stroke="#E05A5A" strokeWidth={1.5} fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 52 52">
      {/* Body circle */}
      <Circle cx={26} cy={26} r={24} fill="#FF8C42" />
      {/* Left ear */}
      <Polygon points="18,14 14,6 22,12" fill="#FF8C42" />
      <Polygon points="19,13 15,7 22,12" fill="#FFB380" />
      {/* Right ear */}
      <Polygon points="34,14 38,6 30,12" fill="#FF8C42" />
      <Polygon points="33,13 37,7 30,12" fill="#FFB380" />
      {/* Fur stripes on forehead */}
      <Path d="M18,17 Q26,14 34,17" stroke="#E07A35" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Eyes */}
      {renderEyes()}
      {/* Cheeks */}
      <Circle cx={19} cy={31} r={5} fill="#FFB380" opacity={0.5} />
      <Circle cx={33} cy={31} r={5} fill="#FFB380" opacity={0.5} />
      {/* Mouth / nose */}
      {renderMouth()}
      {/* Whiskers left */}
      <Line x1={8} y1={30} x2={19} y2={32} stroke="#8B5E3C" strokeWidth={1.5} opacity={0.5} />
      <Line x1={7} y1={34} x2={19} y2={34} stroke="#8B5E3C" strokeWidth={1.5} opacity={0.5} />
      {/* Whiskers right */}
      <Line x1={33} y1={32} x2={44} y2={30} stroke="#8B5E3C" strokeWidth={1.5} opacity={0.5} />
      <Line x1={33} y1={34} x2={45} y2={34} stroke="#8B5E3C" strokeWidth={1.5} opacity={0.5} />
    </Svg>
  );
};

export default NyaisaCharacter;
