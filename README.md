# 🔥 Dev-Simplepage

## 목표

> 만들어보면서 공부하자!
> 기본기 다지기

<br>

**사용 언어**<br>
`JavaScript` `TypeScript`<br>
**라이브러리**<br>
`React` `NextAuth` `bcryptjs`<br>
**프레임워크**<br>
`Next.js`<br>
**DB**<br>
`MongoDB`<br>
[**배포**](https://dev-simplepage.vercel.app/)<br>
`vercel`<br>
**상태관리**<br>
`Recoil`

<br>

## 📂 프로젝트 생성

```bash
npx create-next-app@latest --typescript
```

<br>

## 🛠️ MongoDB 설치

```bash
npm install mongodb
npm install mongodb@4 # 낮은 버전이 필요할 수 있다.
```

## bcrypt

```bash
npm install @mapbox/node-pre-gyp
npm install bcryptjs
npm install @types/bcryptjs
```

<br>

## 라이브러리 설치

```bash
npm install recoil # 리코일
```

<br>

## 🎯 구현 목표

### 회원권한

> - [x] 회원, 비회원, 관리자 분리
> - [x] 게시판 회원 글작성
> - [x] 게시판 본인글 수정 및 삭제
> - [x] 게시물 회원 댓글 작성
> - [x] 게시물 회원 댓글 수정 및 삭제
> - [x] 방명록 회원/비회원 글작성
> - [x] 방명록 본인글 수정 및 삭제
> - [x] 비회원 작성 방명록 비밀번호 삭제

### 공지사항

> - [x] 공지사항 목록
> - [x] 공지사항 등록
> - [x] 공지사항 중요도 설정
> - [ ] 공지사항 수정
> - [ ] 공지사항 삭제

### 게시판

> - [x] 게시물 목록
> - [x] 게시물 등록
> - [x] 게시물 수정
> - [x] 게시물 삭제
> - [ ] 게시물 좋아요
> - [ ] 게시물 이미지 추가
> - [ ] 게시물 마크다운

### 댓글 (게시물)

> - [x] 댓글 목록
> - [x] 댓글 등록
> - [x] 댓글 수정
> - [x] 댓글 삭제
> - [ ] 게시물 삭제시 해당 댓글 삭제

### 방명록

> - [x] 방명록 목록
> - [x] 방명록 등록
> - [x] 방명록 삭제

### 회원가입/회원정보/로그인

> - [x] 로그인 페이지
> - [x] 회원가입 페이지
> - [x] 이메일 가입
> - [x] 이메일 로그인
> - [x] 회원가입
> - [x] 정보확인
> - [x] 정보수정
> - [ ] 주기적인 토큰체크

## 🎯 리팩토링 목표

### 코드 가독성 향상

> - [x] 인터페이스, 타입 분리
> - [x] 유저 인터페이스
> - [x] 게시물 인터페이스
> - [x] 방명록 인터페이스
> - [x] 기능 함수 분리

### 성능 개선

> - [x] 등록버튼 여러번 클릭 막기
> - [ ] 브라우저 로딩
> - [ ] 서버 통신
> - [ ] 상태관리 라이브러리
> - [ ] 목록 불러오기 최적화

### 이슈

> - [ ] 회원정보 이름 수정 후 곧바로 적용되지 않는 현상
>       🧨
> - [x] 배포 페이지 방명록 사용 불가 현상<br>
>       🧨 api 폴더에 대문자가 들어가면 안됨
> - [x] DB/Session 사용 중복 코드<br>
>       🧨 중복되는 코드 분리
> - [x] fetch redirect 사용 안됨<br>
>       🧨 fetch에서 반환하고 getRouter()로 받아서 사용
> - [x] 댓글 등록, 삭제 화면 적용 바로 안되는 현상
>       🧨 컴포넌트 통합 및 useEffect를 통한 리스트 갱신
> - [x] bcrypt 사용 불가 현상
>       🧨 `@mapbox/node-pre-gyp` `bcryptjs` `@types/bcryptjs` 설치로 해결
> - [x] bcrypt 적용 후 비밀번호 확인 없이 로그인 되던 현상
>       🧨 비밀번호 비교가 제대로 되지 않음, `.compare(기존 비밀번호, 입력한 비밀번호)`
