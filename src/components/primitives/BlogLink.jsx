import styled from '@emotion/styled';

/* --- 블로그 링크 --- */
const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 4px 16px 4px 0;
  font-size: .96rem;
  color: var(--text-3);
  border-bottom: 1px solid transparent;
  transition: color .15s, border-color .15s;

  svg {
    width: 14px;
    height: 14px;
  }
  &:hover {
    color: var(--text-1);
    border-bottom-color: var(--line-strong);
  }
`;

export function BlogLink({ href, text }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      {text}
    </Link>
  );
}
