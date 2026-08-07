# 이예진 — Frontend Developer Portfolio

React + Vite 기반 포트폴리오 웹사이트.

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 구조

```
src/
├── data/
│   └── projects.js       ← 모든 프로젝트 내용 (텍스트/표/다이어그램/코드)
├── components/
│   ├── blocks.jsx        ← 블록 프리미티브 (Flow, Table, Code, Arch 등)
│   ├── blocks.css
│   ├── sections.jsx      ← Hero, ProjectIndex, ProjectSection, Nav, Footer
│   └── sections.css
├── styles/
│   └── global.css        ← 디자인 토큰 (색·폰트·여백)
├── App.jsx
└── main.jsx
```

## 내용 수정 방법

거의 모든 내용 수정은 **`src/data/projects.js`** 한 파일에서 이루어집니다.
마크업을 건드릴 필요 없이 데이터(배열/객체)만 고치면 됩니다.

### 블록 타입
| type | 용도 |
|---|---|
| `prose` | 문단 |
| `label` | 섹션 소제목 |
| `flow` | 가로 흐름도 (tone: plain/warn/good) |
| `table` | 비교/데이터 표 (selected: 강조 행) |
| `code` | 코드블럭 |
| `codepair` | 좌우 2단 코드블럭 |
| `arch` | 좌우 대비 아키텍처 |
| `result` | 지표 결과 박스 |
| `image` | 스크린샷/GIF placeholder |
| `bloglink` | 블로그 링크 |

### 코드블럭 토큰
`lines`는 줄 배열이고, 각 줄은 토큰 배열입니다.
- 일반 텍스트: `['텍스트']`
- 색 입힌 토큰: `['클래스', '텍스트']`
  - `b` 굵게 · `hl` 강조(파랑) · `cm` 주석(회색 이탤릭) · `new` 추가(초록) · `kw` 키워드

## 디자인 토큰

색·폰트·여백은 `src/styles/global.css` 상단 `:root`에서 한 번에 관리됩니다.
프로젝트별 액센트 색은 `--acc-blog`, `--acc-here`, `--acc-ats`, `--acc-review`.

## 이미지 교체

`image` / `hero` 블록의 placeholder 자리에 실제 스크린샷을 넣으면 됩니다.
현재는 비율(ratio)과 설명만 표시된 placeholder 상태입니다.

## 인쇄(PDF)

브라우저 인쇄(Cmd/Ctrl+P) 시 자동으로 인쇄용 레이아웃이 적용됩니다.
- 네비게이션 숨김
- 프로젝트마다 새 페이지에서 시작
- 액센트 색 보존
- 섹션이 페이지 중간에 잘리지 않도록 처리

## 다크모드

현재 미지원. 모든 색이 CSS 변수 기반이라 추후 `:root` 다크 팔레트를
`@media (prefers-color-scheme: dark)`로 추가하면 됩니다.
