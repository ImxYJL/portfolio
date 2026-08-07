// 디자인 토큰 — 기존 global.css의 :root 변수를 이전.
// 색상 hex는 CLAUDE.md "디자인 결정 배경"의 현재 값이며, 대비 문제로 여러 차례
// 조정된 값이므로 임의로 변경하지 말 것.
//
// 인쇄(@media print) 시 surface/text/line 토큰은 값이 달라져야 하므로(흰 배경,
// 진한 본문 등) GlobalStyles에서 CSS 변수로도 emit 하고 print 미디어쿼리로
// 덮어쓴다. styled 컴포넌트에서 이 토큰들은 var(--bg) 형태로 참조한다.
// accent/warn/good/font/radius 처럼 인쇄에서도 고정인 값은 theme 객체로 직접 참조.
export const theme = {
  color: {
    bg: '#F5F5F3',
    bgRaised: '#FBFBFA',
    bgSunk: '#EEEEEB',
    text1: '#1A1A19',
    text2: '#55564F',
    text3: '#767974',
    text4: '#6B6E67',
    line: '#E0E0DC',
    lineStrong: '#C6C6C0',
    accent: {
      blog:   { fg: '#7C8B6F', bg: '#ECEFE8' }, // 세이지
      here:   { fg: '#6E8299', bg: '#E8ECF0' }, // 더스티 블루
      ats:    { fg: '#A8836B', bg: '#F0EAE4' }, // 클레이
      review: { fg: '#8A83A0', bg: '#ECEAF0' }, // 라벤더 그레이
    },
    warn: { bg: '#F0ECE4', line: '#C9BEA8' },
    good: '#5F7A55',
  },
  font: {
    sans: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`,
    display: `"Space Grotesk", var(--font-sans)`,
    mono: `"JetBrains Mono", "SF Mono", "Roboto Mono", monospace`,
  },
  radius: { container: '10px', small: '4px' },
  maxWidth: '1100px',
};
