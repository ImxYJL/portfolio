import styled from '@emotion/styled';
import { avoidBreak } from '../../styles/mixins';
import { Code } from './Code';

/* --- 좌우 2단 코드블럭 --- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 12px 0 20px;

  /* 내부 Code 래퍼의 상하 마진 제거 */
  & > * {
    margin: 0;
  }

  @media print {
    ${avoidBreak};
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export function CodePair({ left, right }) {
  return (
    <Grid>
      <Code {...left} />
      <Code {...right} />
    </Grid>
  );
}
