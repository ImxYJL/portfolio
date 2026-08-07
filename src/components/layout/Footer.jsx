import styled from '@emotion/styled';
import { Wrap } from './base';

/* --- Footer --- */
const FooterEl = styled.footer`
  padding: 44px 0;
  border-top: 1px solid var(--line);
  text-align: center;

  p {
    font-family: var(--font-mono);
    font-size: .9rem;
    color: var(--text-4);
  }
`;

export function Footer() {
  return (
    <FooterEl>
      <Wrap>
        <p>이예진 · Frontend Developer · 2026</p>
      </Wrap>
    </FooterEl>
  );
}
