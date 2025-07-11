# Fit-Routine
* [주요 개발 기능](#-주요-개발-기능)
* [개발 환경](#개발-환경)
* [프로젝트 구조](#프로젝트-구조)

<br><br>

## 팀명 : I UNION I
> KH 정보교육원 (디지털컨버전스) 공공데이터 융합 자바개발자 양성과정<br>개발기간 : 2025.04.21 ~ 2025.06.18

<br><br>

## 📌 주요 개발 기능
- 프로젝트
    - 이슈 관리
    - 화면설계서 작성
    - 공공데이터 가공 및 가공 내역서 작성
- UI
    - 헤더 및 푸터 제작
    - 운동 목적 입력 페이지
    - 반복일 입력 페이지
    - 운동 추천 페이지
    - 운동 수정 페이지
- 기능 개발
    - 운동 추천 기능
    - 운동 루틴 등록 기능
    - 운동 루틴 수정 기능
    - 운동 루틴 삭제 기능

<br><br>

## 개발 환경

| 항목 | 내용 |
|:----------:|---|
| **백엔드**    | ![Java](https://img.shields.io/badge/JAVA-007396?logo=java&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=spring&logoColor=white) ![MyBatis](https://img.shields.io/badge/MyBatis-1F6E43?logo=java&logoColor=white) ![Lombok](https://img.shields.io/badge/Lombok-EA1B1B?logo=java&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?logo=spring&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white) |
| **프론트엔드** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) |
| **개발 툴**   | ![IntelliJ IDEA](https://img.shields.io/badge/IDE-IntelliJ-2C2255?logo=intellij&logoColor=white) ![VS Code](https://img.shields.io/badge/IDE-VS%20Code-007ACC?logo=visualstudiocode&logoColor=white)                                                      |
| **서버**     | ![Apache Tomcat](https://img.shields.io/badge/Apache%20Tomcat-F8DC75?logo=apachetomcat&logoColor=black)                                                                                                                   |
| **UI 라이브러리** | ![Toastify](https://img.shields.io/badge/Toastify-FF6F61?logo=toastdotnet&logoColor=white) ![React Icons](https://img.shields.io/badge/React%20Icons-61DAFB?logo=react&logoColor=black) ![FullCalendar](https://img.shields.io/badge/FullCalendar-3788d8?logo=fullcalendar&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white) |
| **코드 품질 도구** | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)                                                                                                     |
| **데이터베이스** | ![Oracle DB](https://img.shields.io/badge/Oracle%20DB-F80000?logo=oracle&logoColor=white)                                                                                                                              |
| **협업 도구**  | ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white) ![ERD Cloud](https://img.shields.io/badge/ERD%20Cloud-0052CC?logo=database&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white) |



<br><br>

## 프로젝트 구조
```
📦 fit-routine-backend
├── .github/ # GitHub 워크플로우 및 설정 파일
├── .gradle/ # Gradle 관련 캐시 및 설정
├── .idea/ # IntelliJ 설정
├── gradle/ # Gradle 래퍼 스크립트
├── 📂src
│   └── 📂main
│       ├── 📂java
│       │   └── 📂 kr.co.khedu.fitroutine
│       │       ├── 📂 auth/           # 인증/인가 관련
│       │       ├── 📂 blog/           # 블로그 기능
│       │       ├── 📂 config/         # 공통 설정 파일
│       │       ├── 📂 diet/           # 식단 기능
│       │       ├── 📂 exercise/       # 운동 기능
│       │       ├── 📂 member/         # 회원 기능
│       │       ├── 📂 post/           # 게시글 기능
│       │       ├── 📂 security/       # 토큰 관련
│       │       ├── 📂 storage/        # 이미지 관련 기능
│       │       ├── 📂 todo/           # Todo 기능
│       │       └── Application.java 
│       └── 📂 resources
│           ├── 📂 mapper                # SQL 
│           ├── application.properties   # 애플리케이션 설정
│           ├── data.sql                 # 초기 데이터 삽입 SQL
│           └── schema.sql               # DB 스키마 정의 SQL
├── .gitignore
└── build.gradle                         # Gradle 빌드 스크립트
```
