import { projects, metas } from './projects';
import { Nav } from './components/layout/Nav';
import { Hero } from './components/layout/Hero';
import { ProjectIndex } from './components/layout/ProjectIndex';
import { ProjectSection } from './components/layout/ProjectSection';
import { Footer } from './components/layout/Footer';
import { Rule } from './components/layout/base';

export default function App() {
  return (
    <>
      <Nav projects={metas} />
      <main>
        <Hero />
        <Rule />
        <ProjectIndex projects={metas} />
        {projects.map(({ meta, Content }) => (
          <ProjectSection meta={meta} key={meta.id}>
            <Content />
          </ProjectSection>
        ))}
      </main>
      <Footer />
    </>
  );
}
