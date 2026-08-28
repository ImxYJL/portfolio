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
  desc: '단순한 원시 타입부터 약관 동의, 이력서 파일, 경력사항(커스텀 객체 배열)까지 성격이 제각각인 필드를 다루는 지원서 제출 폼',
  links: [
    { label: 'GitHub', href: 'https://github.com/ImxYJL/my-ats' },
    { label: 'Live', href: 'https://my-ats-two.vercel.app/apply/1' },
  ],
  hero: { ratio: '4/3', label: '지원서 제출 화면 스크린샷', src: atsImg },
};

export function AtsContent() {
  return (
    <>
      <Feature title="복합 객체·배열 필드 폼 — 상태 변경과 검증 책임 분리">
        <Label>문제: 필드가 다양해질수록 폼 상태를 한 곳에서 일관되게 관리하기 어려워짐</Label>
        <Table
          head={['상태 관리 방식', '한계']}
          rows={[
            ['하나의 `useState` 객체로 필드 묶기', '원시 타입 필드는 computed key로 쉽게 처리할 수 있지만, 경력사항처럼 배열·커스텀 객체를 다루는 필드는 별도의 업데이트 로직이 필요'],
            ['필드별 개별 `useState`', '필드마다 `state`·`updater`가 분리돼 보일러플레이트가 늘고, 상태 변경 지점이 흩어짐'],
          ]}
        />
        <Code
          title="배열 필드 수정은 일반적인 객체 업데이트 방식으로 처리하기 어려움"
          lang="typescript"
          code={`// 배열에서 특정 필드만 바꾸는 업데이트
setForm(prev => ({
  ...prev,
  // 별도의 map 함수 사용 필수
  experiences: prev.experiences.map(exp =>
    exp.id === id ? { ...exp, [key]: value } : exp
  ),
}));
// 여기에 경험 추가/삭제까지 더하면 폼 공용 updater에 특정 필드 로직이 비대하게 쌓임`}
        />

        <Label>접근 · 의사결정</Label>
        <Prose>
          경력 로직을 별도 훅으로 뺄 수도 있었지만, 상태 전이가 여러 곳에 흩어지면 폼 전체의
          변화를 추적하기 어렵다고 봤습니다. 그래서 "상태 변경을 Action으로 한 곳에 모으면
          추적·검증이 쉬워진다"는 가설로 useReducer를 선택했습니다.
        </Prose>

        <Prose>
          또 복잡한 상태 업데이트, 유효성 상태 관리, 유효성 검증 로직이라는 폼 제작의 부담을 명확하게 나누어 관리해야겠다고 생각했습니다.
        </Prose>

        <Label>구현: 상태 변경(Reducer)과 검증(Zod) 책임을 분리</Label>
        <CodePair
          left={{
            title: 'Reducer — 상태 변경을 Action으로 중앙화',
            lang: 'typescript',
            code: `function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":  // 단순 필드
      return { ...state,
        [action.field]: action.value 
      };

    // 경력(커스텀 객체 배열 타입)은 별도 reducer에 위임
    case "ADD_EXPERIENCE":
    case "REMOVE_EXPERIENCE":
    case "UPDATE_EXPERIENCE":
      return { 
        ...state,
        experiences: experiencesReducer(
          state.experiences, action
        ) 
      };
    }
}`,
            highlights: [6, 11],
          }}
          right={{
            title: 'Zod — 타입 추론 + 검증 규칙 일원화',
            lang: 'typescript',
            code: `// 스키마 하나로 타입 추론과 검증을 함께
const experienceItem = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  ...
})

const experienceSchema = z.object({
  experiences: z.array(experienceItem),
});`,
            highlights: [10, 11, 12],
          }}
        />
        <Prose>
          폼의 값·검증 규칙은 Zod 스키마에서만, 상태 변화는 Action 목록만으로 파악할 수 있습니다.
        </Prose>

        <Label>사용처 — 컴포넌트는 도메인 액션만 호출</Label>
        <Code
          title="날것의 dispatch·액션 타입 대신 컴포넌트에서 직관적으로 사용 가능하도록 도메인 언어로 감쌈"
          lang="tsx"
          code={`const { updateExperience } = useExperienceActions();

<InputField
  value={exp.company}
  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
/>;`}
        />

        <Label>배운 점</Label>
    
        <Prose>
          상태관리 방식은 단순히 복잡도에 의해 결정되는 게 아니라 실제 요구(상태 전이 추적·테스트 용이성 등)에 맞춰
          고른다는 것을 배웠습니다. 이 규모에서는 복잡한 경력 부분만 도메인 훅으로 격리하는
          더 가벼운 구성도 충분했을 것이라는 생각도 들었습니다.
        </Prose>
      </Feature>
    </>
  );
}