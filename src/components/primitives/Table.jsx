import styled from '@emotion/styled';
import { keepColor, avoidBreak } from '../../styles/mixins';
import { renderInline } from './Var';

/* --- 비교/데이터 표 --- */
const Wrap = styled.div`
  margin: 12px 0 20px;
  overflow-x: auto;

  @media print {
    ${avoidBreak};
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.02rem;
  border: 1px solid var(--line);
  background: var(--bg-raised);
  ${keepColor};

  th, td {
    text-align: left;
    padding: 11px 16px;
    border-bottom: 1px solid var(--line);
    vertical-align: top;
  }
  th {
    font-weight: 600;
    color: var(--text-2);
    font-size: .9rem;
    letter-spacing: .01em;
    background: var(--bg-sunk);
    border-bottom: 1px solid var(--line-strong);
    white-space: nowrap;
    ${keepColor};
  }
  td {
    color: var(--text-1);
    line-height: 1.55;
  }
  td span {
    display: block;
  }
  tr:last-child td {
    border-bottom: none;
  }
  td + td {
    border-left: 1px solid var(--line);
  }
  th + th {
    border-left: 1px solid var(--line);
  }

  @media (max-width: 760px) {
    font-size: .96rem;
    th, td {
      padding: 9px 11px;
    }
  }
`;

const SelectedRow = styled.tr`
  ${keepColor};
  td {
    background: var(--bg-sunk);
  }
`;

const Sub = styled.span`
  font-size: .94rem;
  color: var(--text-3);
`;

const Check = styled.td`
  color: ${({ theme }) => theme.color.good};
  font-weight: 700;
  font-size: 1.06rem;
`;

function Cell({ cell }) {
  const lines = String(cell).split('\n');
  const content = lines.map((line, li) =>
    li > 0
      ? <Sub key={li}>{renderInline(line)}</Sub>
      : <span key={li}>{renderInline(line)}</span>
  );
  return cell === '✓' ? <Check>{content}</Check> : <td>{content}</td>;
}

export function Table({ head, rows, selected }) {
  return (
    <Wrap>
      <StyledTable>
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{renderInline(h)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const cells = row.map((cell, ci) => <Cell key={ci} cell={cell} />);
            return ri === selected
              ? <SelectedRow key={ri}>{cells}</SelectedRow>
              : <tr key={ri}>{cells}</tr>;
          })}
        </tbody>
      </StyledTable>
    </Wrap>
  );
}
