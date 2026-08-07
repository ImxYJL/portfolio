import styled from '@emotion/styled';
import { keepColor } from '../../styles/mixins';

/* --- 인라인 코드 칩 (Notion식) ---
   식별자·변수·불리언 값(isFalse 등)을 본문/표/제목 안에서 코드로 강조.
   인쇄 시 배경이 날아가지 않도록 keepColor 적용.
   긴 식별자가 좁은 폭에서 칸을 뚫지 않도록 overflow-wrap: anywhere. */
export const Var = styled.code`
  ${keepColor};
  font-family: var(--font-mono);
  font-size: .9em;
  color: var(--text-1);
  background: var(--bg-sunk);
  border: 1px solid var(--line);
  border-radius: ${({ theme }) => theme.radius.small};
  padding: .08em .38em;
  white-space: normal;
  overflow-wrap: anywhere;
`;

/* 문자열 안의 인라인 마크업을 JSX로 변환.
   - `...`  → <Var> 코드 칩
   - **...** → <strong> 굵게 (안에 `...` 코드 중첩 허용)
   처리 순서: **bold** 먼저 쪼갠 뒤, 각 조각에 백틱 파서를 다시 통과.
   코드는 리프(내부 리터럴)라 재귀 없이 2단으로 충분하다.
   - 짝이 안 맞는 백틱/별표는 매칭되지 않아 그냥 리터럴로 남는다.
   - 리터럴이 필요하면 \\` 또는 \\* 로 이스케이프.
   - string이 아니면(이미 JSX면) 그대로 반환 → Prose 등에서 안전. */
const ESC_TICK = String.fromCharCode(0); // 콘텐츠에 없는 자리표시자
const ESC_STAR = String.fromCharCode(1);

/* 백틱만 처리하는 안쪽 단계 (bold 조각·일반 조각 공통) */
function renderCode(str, keyPrefix) {
  return str.split(/(`[^`]+`)/g).map((part, j) => {
    const restored = part.split(ESC_TICK).join('`').split(ESC_STAR).join('*');
    const key = `${keyPrefix}-${j}`;
    if (part.length >= 2 && part.startsWith('`') && part.endsWith('`')) {
      return <Var key={key}>{restored.slice(1, -1)}</Var>;
    }
    return restored;
  });
}

export function renderInline(text) {
  if (typeof text !== 'string') return text;
  if (!text.includes('`') && !text.includes('**')) return text;

  const escaped = text.replace(/\\`/g, ESC_TICK).replace(/\\\*/g, ESC_STAR);

  return escaped.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.length >= 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{renderCode(part.slice(2, -2), i)}</strong>;
    }
    return renderCode(part, i);
  });
}
