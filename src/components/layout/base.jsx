import styled from '@emotion/styled';

/* 중앙 정렬 컨텐츠 래퍼 */
export const Wrap = styled.div`
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--px);

  @media print {
    max-width: 100%;
    padding: 0 24px;
  }
`;

/* 세로 리듬 섹션 */
export const Section = styled.section`
  padding: var(--gap) 0;

  @media print {
    padding: 28px 0;
    page-break-inside: avoid;
  }
`;

/* 구분선 (Hero ↔ ProjectIndex 사이 풀폭 rule) */
export const Rule = styled.hr`
  border: none;
  border-top: 1px solid var(--line);
`;
