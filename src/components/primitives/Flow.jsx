import styled from '@emotion/styled';
import { keepColor, avoidBreak } from '../../styles/mixins';
import { renderInline } from './Var';

/* --- 가로 흐름도 --- */
const Wrap = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  margin: 12px 0 20px;

  @media print {
    ${avoidBreak};
  }

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  min-width: 130px;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const Node = styled.div`
  ${keepColor};
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 16px;
  font-size: .98rem;
  line-height: 1.5;
  color: var(--text-2);
  border-radius: ${({ theme }) => theme.radius.small};
  flex: 1;
  background: ${({ theme, tone }) =>
    tone === 'warn' ? theme.color.warn.bg :
    tone === 'good' ? theme.color.accent.blog.bg :
    'var(--bg-raised)'};
  border: 1px solid ${({ theme, tone }) =>
    tone === 'warn' ? theme.color.warn.line :
    tone === 'good' ? theme.color.accent.blog.fg :
    'var(--line-strong)'};

  b {
    font-size: .84rem;
    font-weight: 600;
    letter-spacing: .02em;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 2px;
  }
  span {
    color: var(--text-1);
  }
`;

const Arrow = styled.span`
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: var(--text-4);
  font-size: 1.02rem;

  @media (max-width: 760px) {
    transform: rotate(90deg);
    padding: 4px 0;
    align-self: center;
  }
`;

export function Flow({ nodes }) {
  return (
    <Wrap>
      {nodes.map((n, i) => (
        <Cell key={i}>
          <Node tone={n.tone || 'plain'}>
            <b>{n.label}</b>
            {n.body.split('\n').map((line, j) =>
              <span key={j}>{renderInline(line)}</span>
            )}
          </Node>
          {i < nodes.length - 1 && <Arrow aria-hidden="true">→</Arrow>}
        </Cell>
      ))}
    </Wrap>
  );
}
