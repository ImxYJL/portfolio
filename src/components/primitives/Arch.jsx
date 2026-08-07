import styled from '@emotion/styled';
import { keepColor, avoidBreak } from '../../styles/mixins';
import { renderInline } from './Var';

/* --- 아키텍처 대비 --- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr);
  margin: 12px 0 20px;
  font-size: .98rem;
  border: 1px solid var(--line);
  background: var(--bg-raised);
  ${keepColor};

  @media print {
    ${avoidBreak};
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div`
  padding: 20px;
  min-width: 0;

  h4 {
    font-size: .86rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
    color: var(--text-3);
    margin-bottom: 12px;
  }
`;

/* 두 번째 컬럼(구분자 다음)에 좌측 보더 */
const RightCol = styled(Col)`
  border-left: 1px solid var(--line);

  @media (max-width: 760px) {
    border-left: none;
    border-top: 1px solid var(--line);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px solid var(--line);
  font-size: .96rem;

  &:last-child {
    border-bottom: none;
  }
  span:first-of-type {
    color: var(--text-3);
    white-space: nowrap;
  }
  span:last-of-type {
    font-weight: 500;
    text-align: right;
    min-width: 0;
    overflow-wrap: anywhere;
  }
`;

const Sep = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .88rem;
  color: var(--text-4);
  font-weight: 600;

  @media (max-width: 760px) {
    padding: 8px 0;
  }
`;

function ColBody({ col }) {
  return (
    <>
      <h4>{col.title}</h4>
      {col.rows.map(([k, v], i) => (
        <Row key={i}>
          <span>{renderInline(k)}</span>
          <span>{renderInline(v)}</span>
        </Row>
      ))}
    </>
  );
}

export function Arch({ left, right, sep }) {
  return (
    <Grid>
      <Col><ColBody col={left} /></Col>
      <Sep>{sep}</Sep>
      <RightCol><ColBody col={right} /></RightCol>
    </Grid>
  );
}
