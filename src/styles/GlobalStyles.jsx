import { Global, css, useTheme } from '@emotion/react';

/* ============================================================
   전역 스타일 — reset / base / CSS 변수 / 인쇄 오버라이드
   기존 global.css를 Emotion Global로 이전.

   surface/text/line 토큰은 CSS 변수로 emit 하여 @media print 에서
   덮어쓴다(흰 배경·진한 본문 등). styled 컴포넌트는 이 토큰을 var(--..)로
   참조하므로 인쇄 동작이 기존과 동일하게 유지된다.
   ============================================================ */
export function GlobalStyles() {
  const theme = useTheme();
  const c = theme.color;

  return (
    <Global
      styles={css`
        :root {
          /* Base surfaces */
          --bg: ${c.bg};
          --bg-raised: ${c.bgRaised};
          --bg-sunk: ${c.bgSunk};
          /* Text */
          --text-1: ${c.text1};
          --text-2: ${c.text2};
          --text-3: ${c.text3};
          --text-4: ${c.text4};
          /* Lines */
          --line: ${c.line};
          --line-strong: ${c.lineStrong};
          /* Fonts */
          --font-sans: ${theme.font.sans};
          --font-display: ${theme.font.display};
          --font-mono: ${theme.font.mono};
          /* Layout */
          --max-w: ${theme.maxWidth};
          --gap: clamp(72px, 9vw, 128px);
          --px: clamp(20px, 5vw, 52px);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body {
          font-family: var(--font-sans);
          color: var(--text-1);
          background: var(--bg);
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        a { color: inherit; text-decoration: none; }
        img { display: block; max-width: 100%; }
        ::selection { background: #E3E3DD; }

        :focus-visible {
          outline: 2px solid var(--text-1);
          outline-offset: 3px;
          border-radius: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }

        @media print {
          :root {
            --bg: #fff; --bg-raised: #fff; --bg-sunk: #f4f4f2;
            --line: #ddd; --line-strong: #bbb;
            --text-2: #333; --text-3: #555;
          }
          body { line-height: 1.5; font-size: 10pt; }
        }
      `}
    />
  );
}
