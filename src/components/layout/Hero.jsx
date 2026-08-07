import styled from '@emotion/styled';
import { Wrap } from './base';
import { Eyebrow } from '../primitives';

/* --- Hero --- */
const Header = styled.header`
  padding: clamp(96px, 14vw, 180px) 0 clamp(56px, 8vw, 96px);

  @media print {
    padding: 36px 0 24px;
  }
`;

const Role = styled(Eyebrow)`
  margin-bottom: 16px;
`;

const Name = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 6vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -.02em;
  margin-bottom: clamp(24px, 4vw, 40px);
`;

const Tagline = styled.p`
  font-size: clamp(1.08rem, 2vw, 1.3rem);
  line-height: 1.7;
  max-width: 620px;
  color: var(--text-3);

  em {
    font-style: normal;
    color: var(--text-1);
    font-weight: 500;
    background: linear-gradient(
      transparent 62%,
      ${({ theme }) => theme.color.accent.here.bg} 62%
    );
    padding: 0 2px;
  }
`;

const Contact = styled.div`
  margin-top: clamp(32px, 5vw, 52px);
  display: flex;
  gap: 22px;
  flex-wrap: wrap;

  a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: .92rem;
    font-weight: 500;
    color: var(--text-3);
    transition: color .15s;
  }
  a:hover {
    color: var(--text-1);
  }
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 760px) {
    gap: 16px;
  }
`;

export function Hero() {
  return (
    <Header id="top">
      <Wrap>
        <Role>Frontend Developer</Role>
        <Name>이예진</Name>
        <Tagline>
          구현 중 마주친 <em>제약</em>을 우회하지 않고,<br />
          제약이 드러낸 <em>구조</em>를 다시 설계하는 개발자입니다.
        </Tagline>
        <Contact>
          <a href="https://github.com/ImxYJL" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            GitHub
          </a>
          <a href="mailto:allensain14@gmail.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            allensain14@gmail.com
          </a>
          <a href="https://yejin-notes.vercel.app/dev/posts" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Blog
          </a>
        </Contact>
      </Wrap>
    </Header>
  );
}
