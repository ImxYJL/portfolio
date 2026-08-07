import styled from '@emotion/styled';
import { avoidBreak } from '../../styles/mixins';

/* 실제 이미지: 원본 비율 유지 + max-height로 상한 (크롭 없이 자동 축소, 가운데 정렬) */
const IMAGE_MAX_HEIGHT = 460; // 원본이 커도 이 높이에서 멈춤. 특정 이미지만 키우려면 maxHeight prop.
const RealImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: ${({ maxHeight }) => maxHeight ?? IMAGE_MAX_HEIGHT}px;
  width: auto;
  height: auto;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.container};
  margin: 12px auto 64px;
`;

/* placeholder: 점선 박스 */
const Placeholder = styled.div`
  width: 100%;
  max-height: 420px;
  border: 1.5px dashed var(--line-strong);
  border-radius: ${({ theme }) => theme.radius.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--text-4);
  font-size: .88rem;
  text-align: center;
  margin: 12px 0 20px;
  background: var(--bg-raised);

  @media print {
    ${avoidBreak};
  }
`;

const PlaceholderLabel = styled.span`
  font-size: .84rem;
  color: var(--text-3);
`;

const toRatio = (ratio) => ratio.replace('/', ' / ');

/* --- 이미지 (src 있으면 실제 이미지, 없으면 placeholder) --- */
export function ImagePlaceholder({ ratio, label, src, maxHeight }) {
  if (src) {
    return <RealImage src={src} alt={label} maxHeight={maxHeight} />;
  }
  return (
    <Placeholder style={{ aspectRatio: toRatio(ratio) }}>
      <span>이미지 자리 · {ratio} 비율</span>
      <PlaceholderLabel>{label}</PlaceholderLabel>
    </Placeholder>
  );
}
