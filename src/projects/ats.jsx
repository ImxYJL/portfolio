import atsImg from '../assets/images/ats.png';
import { Feature } from '../components/layout/ProjectSection';
import { Label, Prose, Table, Code, CodePair } from '../components/primitives';

export const meta = {
  id: 'ats',
  index: '03',
  name: '지원서 제출 폼',
  accent: 'ats',
  period: '2025.07',
  scale: '1인 개발',
  role: null,
  stack: ['React', 'TypeScript', 'Zod'],
  desc: '이름, 약관 동의, 이력 상세, 이력서 파일 등 타입이 제각각인 필드와 유효성 검증이 필요한 지원서 제출 폼',
  links: [
    { label: 'GitHub', href: 'https://github.com/ImxYJL/my-ats' },
    { label: 'Live', href: 'https://my-ats-two.vercel.app/apply/1' },
  ],
  hero: { ratio: '4/3', label: '지원서 제출 화면 스크린샷', src: atsImg },
};

export function AtsContent() {
  return (
    <>
      <Feature title="useReducer + Zod 기반 폼 상태 설계">
        <Label>문제: 핸들러 하나에 수많은 업데이트 로직이 누적됨</Label>
        <Code
          title="useState 단일 객체 — 필드별 분기가 한 함수에 쌓임"
          lang="typescript"
          code={`const handleChange = (type, value, id?) => {
  // 1. 파일 업로드
  if (type === 'resume') {
    const file = value.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { ... }
    setForm(prev => ({ ...prev, resume: file }));
  }

  // 2. 배열 내부 수정 (깊은 복사 지옥)
  else if (type === 'update_exp') {
    setForm(prev => ({ ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, company: value } : exp)
    }));
  }
  // 필드가 추가될 때마다 if-else가 무한히 길어짐...
};`}
        />

        <Label>상태 관리 장단점 비교</Label>
        <Table
          head={['접근법', '장점', '단점', '']}
          selected={2}
          rows={[
            ['하나의 `useState`에서 객체로 관리', '구현 단순', '필드별 업데이트·검증 `if`문 누적 → 위 코드처럼 복잡도 증가', ''],
            ['필드별 개별 `useState`', '필드 격리 가능, 직관적', '필드마다 `state`·`updater`·`validator` 3종 추가 → 관리 비용 폭증', ''],
            ['`useReducer` + `Zod`', '업데이트 복잡도와 검증 복잡도를 분리', '—', '✓'],
          ]}
        />

        <Label>해결: 역할 분리</Label>
        <CodePair
          left={{
            title: 'useReducer — "무엇을" 바꿀지만 명시',
            lang: 'typescript',
            code: `// 각 업데이트 로직이 Action으로 분리
// → 액션 목록만 읽으면 전체 파악
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return { ...state,
        [action.field]: action.value };
    case "UPDATE_EXPERIENCE":
      return { ...state,
        experiences: state.experiences
          .map(exp => exp.id === action.id
            ? { ...exp, [action.key]: action.value }
            : exp) };
  }
}`,
            highlights: [5, 8],
          }}
          right={{
            title: 'Zod — 필드 정의 + 검증 일원화',
            lang: 'typescript',
            code: `// 스키마 하나로 타입 추론 + 검증 규칙
const experienceSchema = z.object({
  experiences: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
  }))
});

// 검증: 필드별 스키마만 추출
const shape = schema.shape[field];
const result = shape.safeParse(value);`,
            highlights: [13, 14],
          }}
        />

        <Label>사용처</Label>
        <Code
          title="핸들러 — dispatch로 의도만 전달"
          lang="tsx"
          code={`const updateExperience = (id, key, value) => {
  dispatch({ type: "UPDATE_EXPERIENCE", id, key, value });
};

// 실제 사용
<InputField
  value={exp.company}
  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
/>;`}
          highlights={[2]}
        />

        <Label>설계 원칙</Label>
        <Prose>`Action` 타입을 통해 필드별 상태 업데이트 로직을 확인할 수 있고, 특정 필드 수정이 다른 필드에 영향을 주지 않습니다. `type`과 `validator` 관리를 `Zod` 스키마 하나로 일원화했습니다.</Prose>
      </Feature>
    </>
  );
}
