import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { avoidBreak } from '../../styles/mixins';

/* --- Prism 코드블럭 --- */
const Wrap = styled.div`
  margin: 12px 0 20px;
  border: 1px solid var(--line-strong);
  border-radius: ${({ theme }) => theme.radius.container};
  overflow: hidden;
  background: var(--bg-raised);

  @media print {
    ${avoidBreak};
  }
`;

const Head = styled.div`
  background: var(--bg-sunk);
  padding: 8px 16px;
  font-size: .86rem;
  font-weight: 600;
  color: var(--text-3);
  border-bottom: 1px solid var(--line);
  letter-spacing: .01em;
`;

const Pre = styled.pre`
  margin: 0;
  padding: 16px 18px !important;
  font-family: var(--font-mono) !important;
  font-size: .92rem !important;
  line-height: 1.7 !important;
  background: var(--bg-raised) !important;
  color: var(--text-2) !important;
  overflow-x: auto;
  white-space: pre;
  border-radius: 0 !important;

  /* Prism 토큰 색: 포폴 팔레트에 맞춤 */
  .token.keyword { color: var(--text-3); font-weight: 600; }
  .token.function,
  .token.class-name { color: var(--text-1); font-weight: 600; }
  .token.string { color: ${({ theme }) => theme.color.accent.blog.fg}; }
  .token.comment { color: var(--text-4); font-style: italic; }
  .token.operator,
  .token.punctuation { color: var(--text-3); }
  .token.number { color: ${({ theme }) => theme.color.accent.ats.fg}; }
  .token.type-annotation { color: ${({ theme }) => theme.color.accent.here.fg}; }
`;

/* 줄 하이라이트 */
const HlLine = styled.span`
  display: inline-block;
  width: calc(100% + 36px);
  margin: 0 -18px;
  padding: 0 18px;
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.color.accent.here.bg} 60%, transparent)`};
  border-left: 3px solid ${({ theme }) => theme.color.accent.here.fg};
`;

/* 줄 끝 주석 */
const Annotation = styled.span`
  color: var(--text-4);
  font-style: italic;
  margin-left: 16px;
`;

export function Code({ title, lang, code, highlights, annotations }) {
  const ref = useRef(null);
  const hl = new Set(highlights || []);
  const ann = annotations || {};

  useEffect(() => {
    if (ref.current) Prism.highlightAllUnder(ref.current);
  }, [code]);

  const lines = code.split('\n');

  return (
    <Wrap ref={ref}>
      {title && <Head>{title}</Head>}
      <Pre>
        <code className={`language-${lang || 'typescript'}`}>
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const note = ann[lineNum];
            const LineTag = hl.has(lineNum) ? HlLine : 'span';
            return (
              <LineTag key={i}>
                {line}
                {note && <Annotation>{'  // ' + note}</Annotation>}
                {'\n'}
              </LineTag>
            );
          })}
        </code>
      </Pre>
    </Wrap>
  );
}
