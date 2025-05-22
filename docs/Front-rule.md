# Front-rule

### 변수/메소드명
- camelCase 사용
<br>

ex) memberId | memberLogin

<hr>

### 클래스명
- 3단 표기법 사용 (페이지명 페이지명-영역/요소 기능명)
<br>

ex) className='loginPage loginPage-input idInput' <br>
ex) className='loginPage loginPage-input pwdInput' <br>
ex) className='loginPage loginPage-button loginBtn' <br>

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

<hr>

### 파일명
- PascalCase 사용
<br>

ex) MainPage.jsx

<hr>

### CSS 파일명
- 페이지명 기반
<br>

ex) MainPage.css

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