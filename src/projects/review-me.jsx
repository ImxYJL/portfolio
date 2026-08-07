import reviewImg from '../assets/images/reviewme_form.gif';
import reviewmeCheck from '../assets/images/reviewme_check.gif';
import { Feature } from '../components/layout/ProjectSection';
import { Label, Prose, Flow, Table, ImagePlaceholder } from '../components/primitives';

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
  links: [{ label: 'GitHub', href: 'https://github.com/woowacourse-teams/2024-review-me' }],
  hero: { ratio: '3/2', label: 'Review-me 화면 스크린샷', src: reviewImg },
};

export function ReviewMeContent() {
  return (
    <>
      <Feature title="접근성 개선">
        <Table
          head={['영역', 'Before', 'After']}
          rows={[
            ['스크린 리더', '폼 UI에서 개별 요소를 낱개로 읽음', '`sr-only`로 의미 있는 정보 단위를 묶어서 읽도록 개선'],
            ['포커스 관리', '객관식 문항 1개에 컨테이너·체크박스·`label` 총 3번 포커싱', '`Tab` 포커스가 의미 있는 묶음에만 이동하도록 중복 제거'],
            ['동적 안내', '동적으로 나타나는 안내 문구를 스크린 리더가 인지 못함', '`aria-live`로 즉시 안내'],
          ]}
        />
        <ImagePlaceholder ratio="16/9" label="스크린 리더 동작 비교 또는 포커스 이동 시연" src={reviewmeCheck} />
      </Feature>

      <Feature title="반응형 UI 구현">
        <Label>문제: 레이아웃 깜빡임</Label>
        <Prose>화면 크기 기반 레이아웃 계산이 페인트 전에 반영되어야 하는데, `useEffect`는 페인트 이후에 실행되므로 사용자가 레이아웃이 바뀌는 순간을 목격하게 됩니다.</Prose>

        <Label>실행 타이밍 비교</Label>
        <Flow nodes={[
          { label: '렌더', body: '컴포넌트 실행\n→ DOM 업데이트' },
          { label: 'useLayoutEffect', body: '페인트 전 동기 실행\n여기서 레이아웃 계산 완료 ✓', tone: 'good' },
          { label: '페인트', body: '화면에 반영\n사용자가 보는 시점' },
          { label: 'useEffect', body: '페인트 후에야 비동기로 실행 → \n여기서 레이아웃 계산하면 깜빡일 수 있음', tone: 'warn' },
        ]} />
      </Feature>
    </>
  );
}
