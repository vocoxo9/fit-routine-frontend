# Front-rule

### 변수/메소드명

- camelCase 사용
  <br>

ex) memberId | memberLogin

<hr>

### 클래스명

- module.css 방식을 사용하기로 하여 [ className={styles.클래스명} ] 으로 표기

<br>

1. 일반 적용 <br/>
   ex) className={ styles.div } <br>

2. 공통 컴포넌트의 전달받는 값으로 사용하는 경우 <br/>
   ex) className={ styles[size] } <br>

<hr>

### id명

- camelCase 사용
  <br>

ex) id='inputId'

<hr>

### 전역/지역변수

- 상단에 주석 표기 (변수의 용도 설명)

<hr>

### 폴더명

- 소문자로 구성
  <br/>
  (폴더 내 파일명이 같을 경우에만 파일명과 동일하게 PascalCase사용)

<hr>

### 파일명

- PascalCase 사용
  <br>

ex) MainPage.jsx

<hr>

### CSS 파일명

: module.css 사용

- 페이지명 기반.module.css
  <br>

ex) MainPage.module.css

<hr>

### utils/service 파일명

- camelCase 사용
  <br>

ex) memberLogin.js

<hr>

### import 순서

외부 라이브러리 --> 내장 모듈 --> 컴포넌트 --> utils --> css

- 경로는 절대 경로 사용 (시작경로 : src)
  <br>

ex) import 'reset.css' from 'assets/common/reset.css';

<hr>
