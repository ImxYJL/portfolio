import styled from '@emotion/styled';
import { Wrap } from './base';
import { ImagePlaceholder, renderInline } from '../primitives';
import { keepColor } from '../../styles/mixins';

/* --- 프로젝트 상세 섹션 --- */
/* 화면: 프로젝트별 액센트 배경. 인쇄: 흰 배경 + 새 페이지 시작. */
const Section = styled.section`
  padding: var(--gap) 0;
  border-top: 1px solid var(--line);
  background: ${({ theme, accent }) => theme.color.accent[accent].bg};
  transition: background .3s;

  @media print {
    padding: 28px 0;
    page-break-before: always;
    border-top: none;
    background: #fff !important;
  }
`;

/* 인트로 2단 그리드 (데스크탑) → 모바일/인쇄 1단 */
const Intro = styled.div`
  margin-bottom: clamp(36px, 5vw, 56px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 48px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  @media print {
    grid-template-columns: 1fr;
  }
`;

const Index = styled.p`
  ${keepColor};
  font-family: var(--font-mono);
  font-size: .88rem;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  display: inline-block;
  color: ${({ theme, accent }) => theme.color.accent[accent].fg};
  margin-bottom: 12px;
  grid-column: 1 / -1;
`;

const Name = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.62rem, 3.2vw, 2.28rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -.01em;
  margin-bottom: 14px;
  padding-left: 14px;
  border-left: 3px solid ${({ theme, accent }) => theme.color.accent[accent].fg};
`;

const Desc = styled.p`
  font-size: clamp(1.06rem, 1.6vw, 1.16rem);
  color: var(--text-2);
  line-height: 1.7;
  max-width: 680px;
  margin-bottom: 22px;
`;

const MetaList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  div {
    display: flex;
    gap: 10px;
    align-items: baseline;
  }
  dt {
    font-family: var(--font-mono);
    font-size: .9rem;
    font-weight: 500;
    color: var(--text-4);
    text-transform: uppercase;
    letter-spacing: .03em;
    min-width: 48px;
  }
  dd {
    font-size: .98rem;
    color: var(--text-2);
  }
`;

const Links = styled.div`
  display: flex;
  gap: 18px;

  a {
    font-size: .98rem;
    font-weight: 500;
    color: var(--text-2);
    border-bottom: 1px solid var(--line-strong);
    padding-bottom: 1px;
    transition: color .15s, border-color .15s;
  }
  a:hover {
    color: var(--text-1);
    border-color: var(--text-1);
  }
`;

/* --- Feature (기능 단위 블록 묶음) --- */
const FeatureWrap = styled.div`
  margin-bottom: clamp(52px, 7vw, 76px);

  &:last-child {
    margin-bottom: 0;
  }

  @media print {
    page-break-inside: auto;
  }
`;

const FeatureTitle = styled.h3`
  font-size: clamp(1.3rem, 2.1vw, 1.56rem);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -.005em;
  margin-bottom: clamp(18px, 3vw, 28px);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);

  @media print {
    page-break-after: avoid;
  }
`;

export function Feature({ title, children }) {
  return (
    <FeatureWrap>
      <FeatureTitle>{renderInline(title)}</FeatureTitle>
      {children}
    </FeatureWrap>
  );
}

export function ProjectSection({ meta, children }) {
  const { accent } = meta;
  return (
    <Section id={meta.id} accent={accent}>
      <Wrap>
        {/* 인트로 — 2단 */}
        <Intro>
          <Index accent={accent}>Project {meta.index}</Index>
          <div>
            <Name accent={accent}>{meta.name}</Name>
            <Desc>{meta.desc}</Desc>
            {meta.links.length > 0 && (
              <Links>
                {meta.links.map((l) => (
                  <a href={l.href} key={l.label} target="_blank" rel="noopener noreferrer">
                    {l.label} <span aria-hidden="true">→</span>
                  </a>
                ))}
              </Links>
            )}
          </div>
          <div>
            <MetaList>
              <div><dt>기간</dt><dd>{meta.period}</dd></div>
              <div><dt>규모</dt><dd>{meta.scale}</dd></div>
              {meta.role && <div><dt>역할</dt><dd>{meta.role}</dd></div>}
              <div><dt>스택</dt><dd>{meta.stack.join(' · ')}</dd></div>
            </MetaList>
          </div>
        </Intro>

        {/* Hero 이미지 (src 있으면 실제 이미지, 없으면 placeholder) */}
        {meta.hero && (
          <ImagePlaceholder
            ratio={meta.hero.ratio}
            label={meta.hero.label}
            src={meta.hero.src}
          />
        )}

        {/* Feature 콘텐츠 */}
        {children}
      </Wrap>
    </Section>
  );
}
