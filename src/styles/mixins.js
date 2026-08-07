import { css } from '@emotion/react';

/* 인쇄 시 배경색(뮤트 액센트/경고 배경 등) 보존.
   기존 .keep-color 클래스와 동일한 역할. */
export const keepColor = css`
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;

/* 인쇄 시 요소가 페이지 중간에서 잘리지 않도록. */
export const avoidBreak = css`
  page-break-inside: avoid;
`;
