import styled from '@emotion/styled';

/* --- 상단 고정 네비 (화면 전용) --- */
const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);

  /* 인쇄 시 숨김 (.no-print) */
  @media print {
    display: none;
  }
`;

const Inner = styled.div`
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--px);
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.a`
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.02rem;
`;

const Links = styled.ul`
  display: flex;
  gap: 22px;
  list-style: none;

  a {
    font-family: var(--font-mono);
    font-size: .9rem;
    color: var(--text-3);
    transition: color .15s;
  }
  a:hover {
    color: var(--text-1);
  }

  /* 모바일에서 링크 숨김 */
  @media (max-width: 760px) {
    display: none;
  }
`;

export function Nav({ projects }) {
  return (
    <NavBar aria-label="포트폴리오 내비게이션">
      <Inner>
        <Name href="#top">이예진</Name>
        <Links>
          <li><a href="#projects">Projects</a></li>
          {projects.map((p) => (
            <li key={p.id}><a href={`#${p.id}`}>{p.name}</a></li>
          ))}
        </Links>
      </Inner>
    </NavBar>
  );
}
