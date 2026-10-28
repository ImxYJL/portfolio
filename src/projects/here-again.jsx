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
  hero: { ratio: '3/2', label: 'Here, Again 캡슐 생성 흐름 (폼 A → 로딩 Fallback → 폼 B)', src: hereImg },
};

export function HereAgainContent() {
  return (
    <>
      <Feature title="3초의 AI 대기 시간을 어떻게 덜 지루하게 만들까?">

        <Label>문제: 긴 캡슐 생성 과정 기다리기</Label>

        <Flow nodes={[
          { label: '①', body: '이미지 저장을 위한 Presigned URL 세팅' },
          { label: '②', body: 'S3 업로드' },
          { label: '③', body: '캡슐 생성 요청' },
          {
            label: '④',
            body: 'AI 질문 생성\n약 3초 대기',
            tone: 'warn',
          },
        ]} />

        <Prose>
          추억 캡슐 생성을 위한 폼을 Multi-Step Form으로 구성했습니다.
          폼 A의 입력(캡슐 생성)을 서버에 전달하고 그 결과를 기반으로 폼 B(캡슐 완성)를 렌더링하는 구조였고, 서버 응답이 늦어 화면 전환이 오래 걸렸습니다.
          AI 질문 생성 및 백엔드 응답에 필요한 약 3초는 프론트에서 줄일 수 없는 시간이었기 때문에
          프론트가 추가로 소모하는 시간은 줄이고 대기 경험은 더 낫게 개선하기로 했습니다.
        </Prose>

        <Label>가설</Label>

        <Prose>
          폼 B 렌더링에 필요한 데이터가 이미 확보되어 있다면
          렌더링 과정에서 발생하는 추가 요청을 제거할 수 있습니다.
          또한 불가피한 대기가 3초 가량 이어지므로 Spinner 버튼보다 페이지 전환 수준의 Fallback으로 보여주는 편이
          사용자에게 로딩 상태를 더 명확하게 전달할 수 있다고 판단했습니다.
        </Prose>

        <Label>해결</Label>

        <Table
          head={['문제', '해결']}
          rows={[
            [
              '폼 B 렌더 중 추가 데이터 요청으로 추가 딜레이 발생',
              '서버 응답으로 받은 데이터를 TanStack Query 캐시에 미리 주입',
            ],
            [
              '버튼 내부 Spinner로만 로딩 처리',
              '폼 전환시 Suspense Fallback으로 로딩 안내',
            ],
          ]}
        />

        <Label>예상하지 못한 부작용</Label>

        <Prose>
          캐시에 데이터를 미리 주입하자 폼 B가 기다릴 Promise가 사라졌습니다.
          즉, 데이터를 조금 더 빠르게 준비한 결과 오히려 UX를 위한 Suspense Fallback이 트리거되지 않는 문제가 발생했습니다.
        </Prose>

        <Label>해결</Label>

        <Prose>
          자동 Promise 트리거에 의존하는 대신 Fallback 제어를 위한 useState 상태를 추가해 수동으로 Fallback을 띄웠습니다.
        </Prose>

        <Code
          title="Fallback 노출을 직접 제어"
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
          annotations={{
            4: '전환 상태 전달',
            5: '대기 중에는 Fallback',
            8: '완료 후 실제 폼 렌더링',
          }}
        />

        <Label>결과</Label>

        <Prose>
          불필요한 추가 요청을 제거해 폼 전환에 필요한 프론트 측 대기 시간을 줄이고,
          AI가 작업 중인 동안 사용자가 명확하게 로딩 상태를 확인할 수 있도록 개선했습니다.
        </Prose>

      </Feature>
    </>
  );
}