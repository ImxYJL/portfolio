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
    { label: 'GitHub', href: '[https://github.com/ImxYJL/yejin-notes](https://github.com/ImxYJL/yejin-notes)' },
    { label: 'Live', href: '[https://yejin-notes.vercel.app/dev/posts](https://yejin-notes.vercel.app/dev/posts)' },
  ],
  hero: { ratio: '3/2', label: '블로그 스크린샷 이미지', src: blogImg },
};

export function BlogContent() {
  return (
    <>
      <Feature title="정적 콘텐츠인데 왜 느리지? — 렌더링 전략 재설계">

        <Label>문제</Label>

        <Prose>
          정적 콘텐츠를 보여주는 블로그임에도 모든 페이지가 SSR로 동작해
          포스트 목록과 상세 페이지의 TTFB가 약 2.8초, 2.6초까지 늘어났습니다.
        </Prose>

        <Flow nodes={[
          { body: '관리자 권한 확인을 위해 `cookies()` 호출' },
          {
            body: '`cookies()`는 Dynamic API이므로 해당 route 전체가 SSR로 전환',
            tone: 'warn',
          },
          {
            body: '컨텐츠는 정적 데이터지만 요청마다 서버 렌더링 → TTFB 2.5s+',
            tone: 'warn',
          },
        ]} />

        <Label>가설</Label>

        <Prose>
          전체 공개용 데이터와 관리자용 데이터를 분리해야겠다고 생각했습니다.
        </Prose>

        <Label>선택지 비교</Label>

        <Table
          head={['접근법', '판단']}
          selected={2}
          rows={[
            [
              '하이브리드 렌더링',
              '관리자 권한 여부에 따라 조회 결과가 달라지므로 하나의 route에서 공개/관리자 데이터를 분리하기 어려움',
            ],
            [
              'PPR로 권한 체크 부분만 격리',
              '페이지에서 사용하는 데이터가 권한 판별에 의존하므로 사실상 SSR과 유사하게 동작하게 됨',
            ],
            [
              '경로·데이터 이원화, DB 클라이언트 분리',
              '공개/관리자 동작을 route와 데이터 조회 단계부터 분리',
            ],
          ]}
        />

        <Label>구현</Label>

        <Arch
          sep="vs"
          left={{
            title: '/ 공개 (SSG)',
            rows: [
              ['DB 클라이언트', '`anon key`'],
              ['렌더링', '빌드 타임 → CDN 서빙'],
              ['캐시 전략', '`unstable_cache` + `revalidateTag`'],
              ['데이터 갱신', 'On-demand Revalidation'],
            ],
          }}
          right={{
            title: '/admin 관리자 (SSR)',
            rows: [
              ['DB 클라이언트', '쿠키 기반 인증'],
              ['렌더링', '요청마다 서버 렌더링'],
              ['캐시 전략', '없음 (항상 최신)'],
              ['비공개 글', '접근 가능'],
            ],
          }}
        />

        <Prose>
          공개/관리자 페이지의 UI는 매우 유사했지만 API, 렌더링 시점, 캐시 정책이 모두 달랐습니다.
          따라서 코드 중복 제거보다 책임의 격리를 우선했습니다.
        </Prose>

        <Label>결과</Label>

        <Result rows={[
          { label: '포스트 목록 TTFB', before: 'SSR 2.8s', after: 'SSG 20ms' },
          { label: '포스트 상세 TTFB', before: 'SSR 2.6s', after: 'SSG 22ms' },
        ]} />

        <Prose>
          콘텐츠가 변경될 때만 관련 캐시를 갱신하도록 구성해
          캐싱으로 인한 빠른 응답과 별도의 빌드 트리거 없이 콘텐츠 최신성을 확보했습니다.
        </Prose>

        <BlogLink
          href="[https://yejin-notes.vercel.app/dev/posts/333abda6-2e47-44e5-813d-677f9b17e5ab](https://yejin-notes.vercel.app/dev/posts/333abda6-2e47-44e5-813d-677f9b17e5ab)"
          text="상세 블로그 포스트"
        />
      </Feature>

      <Feature title="자동저장을 계기로 다시 정의한 포스트 상태">

        <Label>문제</Label>

        <Prose>
          초기에는 빠른 MVP 제작과 불필요한 복잡도를 줄이는 것을 우선해
          게시 중인 상태와 편집 중인 상태의 데이터를 따로 분리하지 않고 `isPublished` 플래그만으로 상태를 구분했습니다.
        </Prose>

        <Flow nodes={[
          {
            label: '기존 모델',
            body: '`isPublished` 하나로 발행/임시저장 상태를 표현',
          },
          {
            label: '새 요구사항',
            body: '에디터에서 자동 임시저장이 필요',
          },
          {
            label: '문제 발생',
            body: '자동저장으로 인해 `isPublished = false`로 변경되면 기존 발행글이 공개 목록에서 사라짐',
            tone: 'warn',
          },
        ]} />

        <Label>원인과 가설</Label>

        <Prose>
          하나의 데이터로 서로 다른 생명주기의 상태를 표현하고 있는 것이 문제였습니다.
          자동저장이 도입됐으니 두 데이터를 따로 분리해야겠다고 생각했습니다.
        </Prose>

        <Label>해결: 발행본과 편집본 분리</Label>

        <CodePair
          left={{
            title: 'DraftData — 에디터 전용 타입(편집본)',
            lang: 'typescript',
            code: `type DraftData = Pick<
  Post,
  'title' | 'content' | 'summary' | ...
>;`,
          }}
          right={{
            title: 'PostRow — 일반 포스트 타입',
            lang: 'typescript',
            code: `type PostRow = {
  id: string;
  ...
  draft_data: DraftData | null;
};

// null → 편집본 없음
// {...} → 편집 중인 데이터 있음
// 발행 → draft_data 삭제`,
            highlights: [4],
          }}
        />

        <Label>데이터 조합 책임 이동</Label>

        <Code
          title="서버 매퍼 — 발행본/편집본을 조합해 현재 에디터용 데이터를 제작"
          lang="typescript"
          code={`const mapEditorPostResponse = (row: PostRow): EditorPost => {
  const draft = row.draft_data;

  return {
    id: row.id,
    title: draft?.title ?? row.title,
    content: draft?.content ?? row.content,
    ...
  };
};`}
          highlights={[5, 6]}
          annotations={{
            5: '편집본이 있으면 우선 사용',
            6: '없으면 발행본으로 폴백',
          }}
        />

        <Label>에디터 페이지 내 저장 데이터/API 분리</Label>

        <Table
          head={['', '`saveDraft`', '`publishPost`']}
          rows={[
            ['대상', '`draft_data`만', '전체 포스트 데이터'],
            ['발행본 영향', '없음', '변경'],
            ['캐시 무효화', '없음', '`revalidateTag`'],
            ['발행본과 편집본 관계', '편집본만 생성/수정', '발행 후 편집본 삭제'],
          ]}
        />

        <Prose>
          프론트엔드는 발행본과 편집본의 존재 여부를 직접 판단하지 않고
          서버가 조합한 `editorData` 하나만 사용하도록 경계를 정리했습니다.
        </Prose>

        <Label>자동저장 안정화</Label>

        <Prose>
          에디터가 리렌더될 때마다 debounce 인스턴스가 재생성되는 문제는
          lazy init `ref`로 인스턴스를 고정해 해결했고, 최신 상태는 콜백 호출 시점에 전달했습니다.
          언마운트 시에는 `cancel`로 남은 타이머를 정리했습니다.
        </Prose>

        <Label>배운 점</Label>

        <Prose>
          초기에는 발행본과 편집본을 분리할 수도 있었지만, 당시 요구사항에서는 isPublished 하나로 충분하다고 판단해 단순한 구조로 시작했습니다. 이후 자동저장이라는 새로운 요구사항이 생기면서 기존 구조의 한계가 드러났고, 그때 발행본과 편집본을 분리했습니다.

모든 가능성을 미리 대비해 복잡도를 높이기보다, 실제 요구사항이 생겼을 때 필요한 만큼 구조를 확장하는 것이 더 합리적일 수 있다는 것을 경험했습니다.
        </Prose>

        <BlogLink
          href="[https://yejin-notes.vercel.app/dev/posts/416f2344-03fb-4b42-ad71-d38c33f52111](https://yejin-notes.vercel.app/dev/posts/416f2344-03fb-4b42-ad71-d38c33f52111)"
          text="도메인 리팩토링 포스트"
        />

        <BlogLink
          href="[https://yejin-notes.vercel.app/dev/posts/54749061-13a4-46fb-961f-11ce90d6ec5e](https://yejin-notes.vercel.app/dev/posts/54749061-13a4-46fb-961f-11ce90d6ec5e)"
          text="자동저장 프론트 포스트"
        />
      </Feature>

      <Feature title="환경에 따라 달라지는 코드 하이라이팅">

        <Label>문제</Label>

        <Prose>
          코드 하이라이터 Shiki의 비동기 엔진 초기화가 CSR 에디터의 동기 렌더링 흐름과 충돌해
          에디터 페이지에서 런타임 에러가 발생했습니다.
        </Prose>

        <Label>판단</Label>

        <Prose>
          한 라이브러리로 에디터와 뷰어를 모두 처리하다가 
          두 환경에서 가장 중요한 요구사항이 다르다는 점을 주목했습니다.
        </Prose>

        <Table
          head={['', '에디터', '뷰어']}
          rows={[
            ['우선순위', '실시간성 · 렌더 안정성', '하이라이팅 품질'],
            ['렌더 환경', 'CSR', 'RSC'],
            ['라이브러리', 'Highlight.js', 'Shiki'],
            ['적용 방식', '동기 렌더링', '서버에서 비동기 처리'],
          ]}
        />

        <Prose>
          에디터는 안정적인 실시간 렌더링을, 뷰어는 높은 하이라이팅 품질을
          우선해 환경에 맞는 라이브러리를 각각 선택했습니다.
        </Prose>

        <BlogLink
          href="[https://yejin-notes.vercel.app/dev/posts/cd337be1-0d0d-4933-b737-dc02fdb65bd1](https://yejin-notes.vercel.app/dev/posts/cd337be1-0d0d-4933-b737-dc02fdb65bd1)"
          text="상세 포스트"
        />
      </Feature>
    </>
  );
}