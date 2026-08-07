## 프로젝트 개요

프론트엔드 개발자 포트폴리오. React + Vite + **Emotion**. 정적 사이트.
스타일링은 순수 CSS(BEM)에서 Emotion(styled + ThemeProvider)으로 전환됨.

## 파일 구조와 역할

```
src/
├── theme.js                        ← 디자인 토큰(색·폰트·radius). ThemeProvider로 주입.
├── styles/
│   ├── GlobalStyles.jsx            ← reset·base + 토큰을 CSS 변수로 emit + @media print 오버라이드.
│   └── mixins.js                   ← keepColor(인쇄 배경 보존), avoidBreak 등 공용 css 스니펫.
├── components/
│   ├── primitives/                 ← 공용 블록 프리미티브 (styled + 로직 한 파일).
│   │   ├── Flow / Table / Code / CodePair / Arch / Result /
│   │   │   ImagePlaceholder / BlogLink / shared(Label·Prose·Eyebrow)
│   │   └── index.js                ← 프리미티브 배럴 export.
│   └── layout/                     ← Nav / Hero / ProjectIndex / ProjectSection / Footer / base(Wrap·Section·Rule)
├── projects/                       ← 프로젝트별 파일. 메타 + JSX 콘텐츠를 한 파일에.
│   ├── blog.jsx / here-again.jsx / ats.jsx / review-me.jsx
│   │       각 파일: `export const meta = {...}` + `export function XxxContent()`
│   └── index.js                    ← meta + Content 컴포넌트를 projects 배열로 조립.
└── App.jsx                         ← projects/metas를 받아 Nav·Hero·ProjectIndex·ProjectSection 렌더.
```

**원칙: 콘텐츠와 프레젠테이션 분리 유지.** 프리미티브(Flow/Table/Code 등)는 계속
공용으로 재사용하고, 각 프로젝트 파일은 이들을 `<Feature>` 안에서 JSX로 직접
조합한다(과거의 `block.type` 디스패처는 제거됨). 새 프로젝트 추가 시 마크업을
복붙하지 말고 `projects/`에 파일을 추가하고 `projects/index.js`에 등록한다.

### 인쇄 대비 토큰 처리 (중요)
- surface/text/line 토큰(`--bg`, `--text-2/3`, `--line` 등)은 인쇄 시 값이 달라져야
  하므로(흰 배경·진한 본문) `GlobalStyles`에서 CSS 변수로 emit 하고 `@media print`로
  덮어쓴다. styled 컴포넌트는 이 토큰들을 `var(--bg)` 형태로 참조한다.
- accent/warn/good/font/radius 처럼 인쇄에서도 고정인 값은 `theme` 객체로 직접 참조
  (`theme.color.accent.blog.fg` 등). 이 구분을 지켜야 인쇄 회귀가 안 난다.

## 디자인 결정 배경 (왜 이렇게 했는지)

### 피해야 할 것: "AI가 만든 포트폴리오" 톤
- 웜 크림 배경(#F4F1EA류) + 세리프 헤딩 + 테라코타 액센트(#D97757류) 조합은
  AI 생성 디자인의 기본값으로 알려져 있고, Claude 특유의 인터랙션 색과 겹쳐서
  "Claude가 만든 것 같다"는 인상을 준다. → 의도적으로 회피.
- 결과: 베이스는 중성 페이퍼톤(#F5F5F3, 웜 언더톤 제거), 헤딩은 세리프 대신
  Space Grotesk(기하학적 산세리프), 뮤트 텍스트는 웜 그레이가 아닌 쿨/중성 그레이.

### 텍스트 대비 문제 (반복 이슈였음)
- 초기 버전에서 뮤트 텍스트(`--text-3`, `--text-4`)가 배경과 대비가 너무 낮아
  안 보인다는 피드백이 여러 번 나왔음. 값을 낮출 때는(더 진하게) WCAG AA 기준
  (4.5:1 이상)을 염두에 두고 조정할 것. 현재 `--text-4: #6B6E67`.
- 글자 크기도 실제 브라우저 100~125% 배율에서 라벨/캡션류가 너무 작다는 피드백
  반영 완료 (라벨 .72→.84rem 등). 앞으로 크기를 낮출 때는 실제 배율 테스트 고려.

### 프로젝트별 액센트 컬러
- 4개 프로젝트(Blog/Here Again/ATS/Review-me)에 각각 뮤트 톤 배정:
  세이지 / 더스티블루 / 클레이 / 라벤더그레이 (`--acc-*`, `--acc-*-bg` 변수).
- 텍스트 자체에는 액센트 컬러를 쓰지 않음(가독성 우선) — 프로젝트 섹션 배경,
  인덱스 번호, 프로젝트명 좌측 보더, 흐름도 강조 노드에만 사용.

### 레이아웃 — "문서 같다"는 피드백에 대한 대응
- 모든 섹션이 동일한 리듬의 단일 컬럼이면 "AI가 적당히 예쁘게 만든 문서"처럼
  보인다는 지적이 있었음. 완전한 비대칭 레이아웃은 가독성과 인쇄(PDF) 안정성을
  해칠 위험이 있어 절충: **프로젝트 인트로만 2단 그리드**(왼쪽 이름+설명,
  오른쪽 메타 정보), feature 블록 내부(코드/표/다이어그램)는 풀 폭 유지.
- 이유: feature 콘텐츠는 코드블럭·비교표처럼 폭이 필요한 요소가 많아서
  좁은 컬럼에 넣으면 인쇄 시 잘리거나 가로 스크롤이 생김.

### 코드블럭
- 초기에는 색상 토큰을 배열로 직접 관리(`[['hl', 'text']]` 형태)했는데
  중첩이 복잡해지며 깨지는 문제가 있어 **Prism.js**로 교체함(`primitives/Code.jsx`).
  `<Code>`는 plain string `code` + `highlights`(줄 번호 배열) + `annotations`
  (줄별 주석 객체) props 형식. 프로젝트 파일에서 이 형식으로 넘길 것.

### 스크린샷/이미지
- 프로젝트 `meta.hero`와 본문의 `<ImagePlaceholder>`는 둘 다 `src`가 있으면
  실제 이미지, 없으면 placeholder(점선 박스)를 보여주는 조건 분기 구조.
- 이미지는 `object-fit: contain` + `background: transparent`로 처리 —
  원본 비율을 유지하면서 잘리지 않게 하고, 여백은 배경과 자연스럽게 섞이도록 함
  (처음엔 `cover`로 크롭됐었고, 그다음엔 회백색 레터박스였다가 투명으로 변경).

### 다크모드
- 아직 미지원. 필요 요청 없었고, 포트폴리오는 인쇄(PDF)가 1차 용도라
  우선순위 낮음. surface/text/line 토큰이 `GlobalStyles`에서 CSS 변수로
  emit 되므로, 나중에 `@media (prefers-color-scheme: dark)`로 그 변수 팔레트를
  덮으면 됨 (구조상 어렵지 않음).

## 인쇄(PDF) 대응 — 항상 함께 검증할 것

이 포트폴리오는 브라우저 인쇄(Cmd/Ctrl+P)로 PDF 출력하는 것이 주요 용도 중
하나. 레이아웃/CSS 변경 시 반드시 인쇄 모드(`@media print`)도 함께 확인:
- 프로젝트 전환 시 새 페이지로 시작 (`ProjectSection`의 `@media print` → `page-break-before: always`)
- 네비게이션 숨김 (`Nav`의 `@media print { display: none }`)
- 액센트 배경색 보존 여부 확인 (`mixins.js`의 `keepColor` → `print-color-adjust: exact`)
- 섹션이 페이지 중간에 잘리지 않도록 (`avoidBreak` → `page-break-inside: avoid`)
- 인트로 2단 그리드는 인쇄 시 1단으로 전환되는지 확인 (`ProjectSection`의 `Intro`)

## 작업 시 유의사항

- 텍스트/표/다이어그램 내용 수정 요청이 오면 먼저 해당 `projects/*.jsx`를 볼 것.
  프리미티브(`primitives/*`)·레이아웃(`layout/*`) 파일은 구조/스타일 변경이
  필요할 때만 건드림.
- 글자 크기나 색상을 낮추는(옅게 하는) 방향의 변경은 과거에 반복적으로
  가독성 문제를 일으켰으므로 신중하게 — 특히 `text3`, `text4` (theme.js) /
  `--text-3`, `--text-4` (CSS 변수).
- 새로운 블록 타입이 필요하면 `primitives/`에 styled 컴포넌트로 추가하고
  `primitives/index.js`에 export, 프로젝트 파일에서 JSX로 조합해 사용한다.