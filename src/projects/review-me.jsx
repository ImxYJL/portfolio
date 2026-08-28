import reviewImg from '../assets/images/reviewme_form.gif';
import reviewmeCheck from '../assets/images/reviewme_check.gif';

import { Feature } from '../components/layout/ProjectSection';
import {
  Label, Prose, Flow, Table, ImagePlaceholder,
} from '../components/primitives';

export const meta = {
  id: 'review-me',
  index: '04',
  name: 'Review-me',
  accent: 'review',
  period: '2024.07 — 2025.02',
  scale: 'FE 4 · BE 4',
  role: 'FE 팀원 — 컴포넌트·페이지·접근성 개발 전반',
  stack: ['React', 'TypeScript'],
  desc: '함께 프로젝트를 진행한 개발자끼리 리뷰를 주고받을 수 있는 플랫폼',
  links: [
    {
      label: 'GitHub',
      href: '[https://github.com/woowacourse-teams/2024-review-me](https://github.com/woowacourse-teams/2024-review-me)',
    },
  ],
  hero: {
    ratio: '3/2',
    label: 'Review-me 화면 스크린샷',
    src: reviewImg,
  },
};

export function ReviewMeContent() {
  return (
    <>
      <Feature title="스크린 리더와 키보드 사용자를 위한 Wizard UI 개선">

        <Label>문제와 해결</Label>

        <Table
          head={['영역', 'Before', 'After']}
          rows={[
            [
              '스크린 리더',
              '폼 UI의 요소를 낱개로 읽음',
              '`sr-only`로 의미 있는 정보 단위로 묶어 전달',
            ],
            [
              '포커스 관리',
              '한 문항에 컨테이너·체크박스·label 총 3회 포커싱',
              '의미 있는 하나의 묶음에만 포커스',
            ],
            [
              '동적 안내',
              '동적으로 나타나는 안내를 인지하기 어려움',
              '`aria-live`로 즉시 안내',
            ],
          ]}
        />

        <ImagePlaceholder
          ratio="16/9"
          label="스크린 리더 동작 비교 또는 포커스 이동 시연"
          src={reviewmeCheck}
        />

      </Feature>

      <Feature title="화면 크기에 따른 레이아웃 깜빡임 제거">

        <Label>문제</Label>

        <Prose>
          화면 크기에 따라 레이아웃을 계산하는 로직이 `useEffect`에서 실행되면서
          사용자가 레이아웃이 변경되는 순간을 볼 수 있었습니다.
        </Prose>

        <Label>원인과 해결</Label>

        <Flow nodes={[
          {
            label: '렌더',
            body: 'DOM 업데이트',
          },
          {
            label: 'useLayoutEffect',
            body: '페인트 전에 레이아웃 계산',
            tone: 'good',
          },
          {
            label: '페인트',
            body: '계산된 레이아웃을 사용자에게 표시',
          },
        ]} />

        <Prose>
          페인트 전에 반영되어야 하는 레이아웃 계산을 `useLayoutEffect`로 이동해
          초기 렌더링 시 발생하던 깜빡임을 제거했습니다.
        </Prose>

      </Feature>
    </>
  );
}