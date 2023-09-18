# 🔥 Next.js

> 만들어보면서 공부하자!  
> `Next.js` `JavaScript` `TypeScript` `MongoDB`

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

<br>

## 🎯 구현 목표

### 회원

> - [x] 회원, 비회원, 관리자 분리
>
> - [x] 게시판 회원 글작성
> - [x] 게시판 본인글 수정 및 삭제
>
> - [ ] 게시물 회원 댓글 작성
> - [ ] 게시물 회원 댓글 수정 및 삭제
>
> - [x] 방명록 회원/비회원 글작성
> - [x] 방명록 본인글 수정 및 삭제
> - [x] 비회원 작성 방명록 비밀번호 삭제

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

### 회원가입/로그인

> - [x] 로그인 페이지
> - [x] 회원가입 페이지
> - [x] OAuth 가입/로그인 [ `GitHub` ]
> - [x] 이메일 가입
> - [x] 이메일 로그인

### 회원

> - [x] 회원가입
> - [x] 정보확인
> - [ ] 정보수정
> - [ ] 주기적인 토큰체크

## 🎯 리팩토링 목표

### 가독성 향상

> - [ ] 인터페이스, 타입 분리
> - [x] 유저 인터페이스
> - [x] 게시물 인터페이스
> - [x] 방명록 인터페이스
> - [x] 기능 함수 분리

### 성능 개선

> - [ ] 브라우저 로딩
> - [ ] 서버 통신
> - [ ] 상태관리 라이브러리

### 이슈

> - [ ] bcrypt 사용 불가 현상
> - [ ] 배포 페이지 방명록 사용 불가 현상
> - [ ] 방명록 등록, 삭제 화면 적용 바로 안되는 현상
> - [x] DB/Session 사용 중복 코드
> - [x] fetch redirect 사용 안됨
