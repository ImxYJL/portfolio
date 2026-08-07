import { meta as blogMeta, BlogContent } from './blog.jsx';
import { meta as hereMeta, HereAgainContent } from './here-again.jsx';
import { meta as atsMeta, AtsContent } from './ats.jsx';
import { meta as reviewMeta, ReviewMeContent } from './review-me.jsx';

/* 프로젝트 = 목차용 메타 + 상세 콘텐츠 컴포넌트 조합 */
export const projects = [
  { meta: blogMeta, Content: BlogContent },
  { meta: hereMeta, Content: HereAgainContent },
  { meta: atsMeta, Content: AtsContent },
  { meta: reviewMeta, Content: ReviewMeContent },
];

/* Nav / ProjectIndex 에 넘길 목차용 메타 배열 */
export const metas = projects.map((p) => p.meta);
