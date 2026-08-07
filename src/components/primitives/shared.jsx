import styled from '@emotion/styled';
import { renderInline } from './Var';

/* --- 라벨 --- */
const LabelEl = styled.p`
  font-family: var(--font-mono);
  font-size: .98rem;
  font-weight: 600;
  letter-spacing: .04em;
  color: var(--text-1);
  margin: 44px 0 10px;

  &:first-child {
    margin-top: 0;
  }
`;

/* --- 문단 --- */
const ProseEl = styled.p`
  font-size: clamp(1.06rem, 1.6vw, 1.14rem);
  line-height: 1.78;
  color: var(--text-2);
  margin: 4px 0 12px;
`;

/* text prop 또는 children 모두 지원 (프로젝트 파일에서 JSX 직접 조합 시 편의) */
export function Label({ text, children, ...rest }) {
  return <LabelEl {...rest}>{renderInline(children ?? text)}</LabelEl>;
}
export function Prose({ text, children, ...rest }) {
  return <ProseEl {...rest}>{renderInline(children ?? text)}</ProseEl>;
}

/* --- eyebrow (모노 대문자 소제목) --- */
export const Eyebrow = styled.p`
  font-family: var(--font-mono);
  font-size: .82rem;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-4);
`;
