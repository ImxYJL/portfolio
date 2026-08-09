import blogImg from '../assets/images/blog.png';
import { Feature } from '../components/layout/ProjectSection';
import {
  Label, Prose, Flow, Table, Code, CodePair, Arch, Result, BlogLink,
} from '../components/primitives';

export const meta = {
  id: 'blog',
  index: '01',
  name: 'Custom Blog',
  accent: 'blog',
  period: '2026.02 —',
  scale: '1인 개발 (풀스택)',
  role: null,
  stack: ['Next.js', 'TypeScript', 'Supabase'],
  desc: '기존 블로그 플랫폼의 성능 및 자유도 한계를 직접 해결하고자 Next.js로 커스텀한 개인 블로그',
  links: [
    { label: 'GitHub', href: 'https://github.com/ImxYJL/yejin-notes' },
    { label: 'Live', href: 'https://yejin-notes.vercel.app/dev/posts' },
  ],
  hero: { ratio: '3/2', label: '블로그 스크린샷 이미지', src: blogImg },
};

export function BlogContent() {
  return (
    <>
      <Feature title="권한별 렌더링 전략 이원화 및 캐싱">
        <Label>원인 추적</Label>
        <Flow nodes={[
          {  body: '관리자 권한 확인을 위해 `cookies()` 호출' },
          { body: '`cookies()`는 Dynamic API → \n 해당 `route` 전체가 SSR로 강제 전환', tone: 'warn' },
          {  body: '크기가 작은 정적 콘텐츠임에도 모든 페이지 이동 시 2.5s+ 소요', tone: 'warn' },
        ]} />

        <Label>다른 선택지 비교</Label>
        <Table
          head={['접근법', '원리', '기각 사유', '']}
          selected={2}
          rows={[
            ['하이브리드\n(SSG + CSR 권한 확인)', '페이지 뼈대는 SSG로, 권한만 런타임에 클라이언트에서 체크', '권한에 따라 페이지가 보여줄 데이터가 달라짐 → 한 라우트 경로 내에서 두 렌더링 전략이 공존할 수 없음', ''],
            ['PPR\n(Partial Prerendering)', '정적인 데이터는 빌드 타임에 완성 + dynamic 부분만 요청 시 스트리밍', '권한에 따라 페이지가 보여줄 데이터가 달라짐 → 사실상 페이지 전체가 dynamic 데이터에 의존하므로 결과적으로 SSR과 똑같이 동작(느림)', ''],
            ['경로·클라이언트 이원화', '/admin(SSR) + /(SSG)로 경로·페이지·DB 클라이언트 완전 분리', '—', '✓'],
          ]}
        />

        <Label>최종 구조</Label>
        <Arch
          sep="vs"
          left={{
            title: '/ 공개 (SSG)',
            rows: [['DB 클라이언트', '`anon key` (쿠키 없음)'], ['렌더링', '빌드 타임 → CDN 서빙'], ['캐시 전략', '`unstable_cache` + `revalidateTag`'], ['데이터 갱신', 'On-demand Revalidation']],
          }}
          right={{
            title: '/admin 관리자 (SSR)',
            rows: [['DB 클라이언트', '쿠키 기반 인증'], ['렌더링', '요청마다 서버 렌더링'], ['캐시 전략', '없음 (항상 최신)'], ['비공개 글', '접근 가능']],
          }}
        />

        <Label>의사결정 근거</Label>
        <Prose>공개/관리자 페이지의 UI는 서로 유사하지만 호출하는 API, 렌더링 전략, 캐시 정책이 모두 달랐습니다. 따라서 **코드 중복보다 격리**를 우선해 한쪽 수정 시 다른 쪽 사이드 이펙트를 원천 차단했습니다.</Prose>

        <Label>결과</Label>
        <Result rows={[
          { label: '포스트 목록 TTFB', before: 'SSR 2.8s', after: 'SSG 20ms' },
          { label: '포스트 상세 TTFB', before: 'SSR 2.6s', after: 'SSG 22ms' },
        ]} />

        <BlogLink href="https://yejin-notes.vercel.app/dev/posts/333abda6-2e47-44e5-813d-677f9b17e5ab" text="상세 블로그 포스트" />
      </Feature>

      <Feature title="자동 임시저장 도입과 상태 모델 재설계">
        <Label>기존 구조</Label>
        <Code
          title="Post 타입 — isPublished 단일 플래그"
          lang="typescript"
          code={`type Post = {
  id: string;
  title: string;
  content: string;
  ...
  isPublished: boolean;
};`}
          highlights={[6]}
          annotations={{ 6: '이 플래그 하나로 발행/임시저장 구분' }}
        />

        <Label>문제: 자동저장 시 발행 상태 손실</Label>
        <Flow nodes={[
          { label: '발행된 글 수정 시작', body: '이미 발행된 글이므로 `isPublished = true`' },
          { label: '자동 임시저장 트리거', body: '첫 자동저장시 `isPublished = false`로 변경됨 (임시저장 = 미발행이므로)', tone: 'warn' },
          { label: '공개 목록에서 사라짐', body: '발행 상태가 풀리므로 재게시 전까지 방문자에게 보이지 않음', tone: 'warn' },
        ]} />

        <Label>해결: 완성본/편집본 분리</Label>
        <CodePair
          left={{
            title: 'DraftData — 편집본 전용 타입',
            lang: 'typescript',
            code: `// 임시저장이 사용하는 필드만 Pick
// → Post에 필드가 추가돼도
//   임시저장에 자동으로 딸려오지 않음
type DraftData = Pick<
  Post,
  'title' | 'content' | 'summary' | ...
>;`,
          }}
          right={{
            title: 'PostRow — DB 타입에 draft_data 추가',
            lang: 'typescript',
            code: `type PostRow = {
  id: string;
  ...
  draft_data: DraftData | null;
};
// null → 편집 없음 (발행본만 존재)
// {...} → 편집 중
// 발행 시 → null로 초기화`,
            highlights: [4],
          }}
        />

        <Label>서버 매퍼: 프론트에 내려줄 데이터 결정</Label>
        <Code
          title="mapEditorPostResponse — draft 우선, 없으면 발행본 폴백"
          lang="typescript"
          code={`const mapEditorPostResponse = (row: PostRow): EditorPost => {
  const draft = row.draft_data;
  return {
    id:      row.id,
    title:   draft?.title   ?? row.title,
    content: draft?.content ?? row.content,
    ...
  };
};`}
          highlights={[5, 6]}
          annotations={{ 5: 'draft에 값이 있으면 편집본,', 6: '없으면 발행본 사용' }}
        />

        <Label>API 분리</Label>
        <Prose>임시저장 기능을 본격화하면서, 기존에 포스트 저장 기능을 담당하던 서비스 함수 `savePost`를 용도에 따라 이원화했습니다.</Prose>
        <Table
          head={['', '`saveDraft`', '`publishPost`']}
          rows={[
            ['대상', '`draft_data` 컬럼만', '전체 컬럼'],
            ['발행본 영향', '불변', '전체 반영 + `draft` 삭제'],
            ['캐시 무효화', '없음', '`revalidateTag` 수행'],
            ['엔드포인트', '`POST /api/admin/posts/drafts`', '`POST /api/admin/posts`'],
          ]}
        />

        <Label>프론트/백엔드 경계선</Label>
        <Prose>DB에 에디터 데이터를 어떻게 요청할지, DB에서 받은 데이터를 어디서 조합할지를 결정했습니다.</Prose>
        <Flow nodes={[
          { label: '프론트', body: '에디터 페이지 진입 시 에디터용 데이터 요청\n(도메인 판단 없음)' },
          { label: '서버 매퍼', body: '`draft_data` 유무에 따라\n발행본/편집본 조합 결정', tone: 'good' },
          { label: '응답', body: '`editorData` 하나만 반환 → \n별도 가공 없이 바로 사용' },
        ]} />

        <Label>자동 저장을 위한 디바운스 안정화</Label>
        <Table
          head={['문제', '해결']}
          rows={[
            ['타이핑마다 리렌더 → 디바운스 인스턴스 재생성', 'lazy init `ref`로 인스턴스 고정'],
            ['`ref` 초기값이 stale closure 위험', '최신 상태는 호출 시점 인자로 주입'],
            ['언마운트 시 타이머 잔존', '`cancel` 함수 + `useEffect` cleanup'],
            ['렌더 중 `ref.current` 읽기 에러', '함수 래핑으로 평가 시점 지연'],
          ]}
        />

        <Code
          title="핵심 패턴 — lazy init ref로 디바운스 인스턴스 고정"
          lang="typescript"
          code={`// useRef(debounce(...))로 하면 매 렌더마다 debounce() 재평가
// → lazy init으로 첫 렌더 1회만 생성
const ref = useRef<ReturnType<typeof debounce> | null>(null);
if (ref.current === null) {
  ref.current = debounce((data) => saveDraft(data), AUTOSAVE_TIME);
}

// stale closure 방지: 상태를 캡처하지 않고 호출 시점에 주입
const trigger = (partial: Partial<PostForm>) => {
  ref.current(mergeFormData(formData, partial));
};`}
          highlights={[10]}
          annotations={{ 10: '최신 formData 사용' }}
        />

        <BlogLink href="https://yejin-notes.vercel.app/dev/posts/416f2344-03fb-4b42-ad71-d38c33f52111" text="도메인 리팩토링 포스트" />
        <BlogLink href="https://yejin-notes.vercel.app/dev/posts/54749061-13a4-46fb-961f-11ce90d6ec5e" text="자동저장 프론트 포스트" />
      </Feature>

      <Feature title="코드블럭 하이라이팅">
        <Label>문제</Label>
        <Prose>하이라이트 정확도가 높은 Shiki(TextMate 엔진)라이브러리의 비동기 초기화가 React의 동기 렌더링과 충돌 → `runSync finished async` 에러 발생</Prose>

        <Label>환경별 라이브러리 분리</Label>
        <Table
          head={['', '에디터 (실시간 프리뷰)', '뷰어 (포스트 상세)']}
          rows={[
            ['우선 요구', '실시간성, 렌더 안정성', '하이라이트 품질, 정확도'],
            ['렌더 환경', 'CSR (클라이언트 컴포넌트)', 'RSC (서버 비동기 렌더)'],
            ['라이브러리', '`Highlight.js` (동기)', '`Shiki` (비동기, TextMate)'],
            ['적용 방식', '`react-markdown` 플러그인', '`unified` 파이프라인 → 서버에서 완성된 `ReactNode` 전달'],
          ]}
        />

        <Label>의사결정 근거</Label>
        <Prose>하나의 라이브러리로 양쪽을 커버하려는 시도가 동기/비동기 충돌의 원인이었습니다. 에디터와 뷰어의 요구 특성이 다르므로 환경에 맞는 도구를 각자 다르게 선택했습니다.</Prose>

        <BlogLink href="https://yejin-notes.vercel.app/dev/posts/cd337be1-0d0d-4933-b737-dc02fdb65bd1" text="상세 포스트" />
      </Feature>
    </>
  );
}
