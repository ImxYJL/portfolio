import hereImg from '../assets/images/hereagain.png';
import { Feature } from '../components/layout/ProjectSection';
import { Label, Prose, Flow, Table, Code } from '../components/primitives';

export const meta = {
  id: 'here-again',
  index: '02',
  name: 'Here, Again',
  accent: 'here',
  period: '2025.05 — 06',
  scale: 'FE 2 · BE 2',
  role: 'FE 리드 — 전체 페이지/UI 설계 및 백엔드 커뮤니케이션 주도',
  stack: ['React', 'TypeScript'],
  desc: '추억이 담긴 사진을 AI가 분석해 질문을 만들어주고, 타임캡슐로 묻어 주는 서비스',
  links: [],
  hero: { ratio: '3/2', label: 'Here, Again 메인 화면 스크린샷', src: hereImg },
};

export function HereAgainContent() {
  return (
    <>
      <Feature title="Multi-Step Form 상태 설계">
        <Label>캡슐 생성 비동기 플로우</Label>
        <Flow nodes={[
          { label: '① Presigned URL 세팅', body: '이미지 업로드 준비' },
          { label: '② S3 업로드', body: '서버에 이미지 저장' },
          { label: '③ 캡슐 생성', body: '1차 데이터로 서버에 캡슐 생성 요청' },
          { label: '④ AI 질문 생성', body: '~3초 대기\n프론트가 줄일 수 없는 구간', tone: 'warn' },
        ]} />

        <Label>최적화와 부작용</Label>
        <Table
          head={['단계', '적용', '부작용']}
          rows={[
            ['캐시 선주입', '③의 응답으로 받은 Form B 렌더용 데이터를 `setQueryData`로 주입 → Form B 렌더 중 추가 요청 방지', 'Form B가 기다릴 `promise`가 사라짐 → `Suspense` Fallback도 트리거되지 않음'],
            ['수동 전환 제어', '`isTransitioning` 상태 플래그로 Fallback 직접 제어', '`Suspense`가 `promise`를 보고 자동으로 하던 일을 수동으로 체크'],
          ]}
        />

        <Label>실제 코드: 수동 전환 제어</Label>
        <Code
          title="페이지 컴포넌트 — isTransitioning 플래그로 3분기"
          lang="tsx"
          code={`{
  step === STEP1 ? (
    <CapsuleInfoForm
      isTransitioning={isTransitioning}
      setIsTransitioning={setIsTransitioning}
      onComplete={handleStepChange}
    />
  ) : isTransitioning ? (
    <LoadingFallback fallbackText="질문을 준비하고 있어요..." />
  ) : (
    <QuestionForm capsuleId={capsuleId} />
  );
}`}
          highlights={[4, 5, 8]}
          annotations={{ 4: '부모가 플래그 주입', 5: 'setter도 주입', 8: '수동 Fallback 분기' }}
        />
      </Feature>
    </>
  );
}
