import styled from '@emotion/styled';
import { Section, Wrap } from './base';
import { Eyebrow } from '../primitives';

/* --- 프로젝트 목차 --- */
const Head = styled.div`
  margin-bottom: clamp(32px, 5vw, 52px);

  /* 목차 eyebrow (Hero의 Eyebrow는 그대로 두고 여기서만 확대) */
  p {
    font-size: .88rem;
  }
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3.6vw, 2.6rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -.01em;
  margin-top: 8px;
`;

const List = styled.div`
  border-top: 1px solid var(--line);
`;

const Card = styled.a`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px 28px;
  align-items: start;
  padding: clamp(24px, 3vw, 34px) 4px;
  border-bottom: 1px solid var(--line);
  transition: padding-left .2s ease, background .15s;

  &:hover {
    background: var(--bg-raised);
    padding-left: 14px;
  }

  @media (max-width: 760px) {
    grid-template-columns: auto 1fr;
    gap: 10px 18px;
    &:hover {
      padding-left: 4px;
    }
  }

  @media print {
    &:hover {
      background: none;
      padding-left: 4px;
    }
  }
`;

const Index = styled.span`
  font-family: var(--font-mono);
  font-size: 1.18rem;
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme, accent }) => theme.color.accent[accent].fg};
`;

const Main = styled.div`
  min-width: 0;
`;

const Top = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const Name = styled.span`
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.1vw, 1.5rem);
  font-weight: 600;
  letter-spacing: -.01em;
`;

const Period = styled.span`
  font-family: var(--font-mono);
  font-size: .9rem;
  color: var(--text-4);
`;

const Desc = styled.p`
  font-size: 1.06rem;
  color: var(--text-3);
  line-height: 1.6;
  margin-bottom: 12px;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: .84rem;
  color: var(--text-3);
  padding: 2px 9px;
  border: 1px solid var(--line);
  border-radius: ${({ theme }) => theme.radius.small};
`;

const Meta = styled.span`
  font-family: var(--font-mono);
  font-size: .9rem;
  color: var(--text-4);
  white-space: nowrap;
  text-align: right;

  @media (max-width: 760px) {
    grid-column: 2;
    text-align: left;
  }
`;

export function ProjectIndex({ projects }) {
  return (
    <Section id="projects">
      <Wrap>
        <Head>
          <Eyebrow>Projects</Eyebrow>
          <Title>프로젝트</Title>
        </Head>
        <List>
          {projects.map((p) => (
            <Card href={`#${p.id}`} key={p.id}>
              <Index accent={p.accent}>{p.index}</Index>
              <Main>
                <Top>
                  <Name>{p.name}</Name>
                  <Period>{p.period}</Period>
                </Top>
                <Desc>{p.desc}</Desc>
                <Tags>
                  {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </Tags>
              </Main>
              <Meta>{p.scale}</Meta>
            </Card>
          ))}
        </List>
      </Wrap>
    </Section>
  );
}
