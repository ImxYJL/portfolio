import styled from '@emotion/styled';
import { keepColor, avoidBreak } from '../../styles/mixins';
import { renderInline } from './Var';

/* --- 지표 결과 박스 --- */
const Box = styled.div`
  ${keepColor};
  background: ${({ theme }) => theme.color.accent.blog.bg};
  border: 1px solid ${({ theme }) => theme.color.accent.blog.fg};
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.radius.container};
  margin: 12px 0 20px;

  @media print {
    ${avoidBreak};
  }
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 3px 0;

  @media (max-width: 760px) {
    flex-direction: column;
    gap: 2px;
  }
`;

const RowLabel = styled.span`
  font-size: .96rem;
  color: var(--text-2);
  min-width: 140px;

  @media (max-width: 760px) {
    min-width: auto;
  }
`;

const Val = styled.span`
  font-size: 1.02rem;
  color: var(--text-2);

  b {
    color: var(--text-1);
    font-weight: 700;
  }
`;

const Arr = styled.span`
  color: var(--text-4);
`;

export function Result({ rows }) {
  return (
    <Box>
      {rows.map((r, i) => (
        <Row key={i}>
          <RowLabel>{renderInline(r.label)}</RowLabel>
          <Val>
            {renderInline(r.before)} <Arr aria-hidden="true">→</Arr> <b>{renderInline(r.after)}</b>
          </Val>
        </Row>
      ))}
    </Box>
  );
}
