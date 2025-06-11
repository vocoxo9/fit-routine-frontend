# 🛠️ Team - Basic 규칙

<br/>

## 1. 🗂️ 프로젝트 전반 규칙

### ✅ 협업 태도 및 일정 관리
- 연락 잘하기, 적극적인 참여
- 수시로 진행상황 공유
- 기한 내 구현이 어려울 경우, 최소 하루~이틀 전에 공유할 것
- 구현 중 겹치는 부분은 반드시 공유 후 더 나은 로직으로 병합

### ✅ 문서 관리
- 주요 문서는 `README.md` 및 `docs/` 폴더에 작성
- Notion에 작성된 내용을 기반으로 정리
- 이슈 등록 시, 이슈 템플릿 사용

### ✅ Git 규칙
- **브랜치 전략**
 : Github flow 전략
  - `main`: 항상 최신 상태 유지
  - 기능 개발: 기능명 기반 브랜치 생성
  - 개인 브랜치: `feature/...-...` 형태로 생성
  - 수정 브랜치: `fix/...-...` 형태로 생성
- **커밋 메시지 예시**
  - 작업한 내용 + 동작 (추가/수정/삭제 등)
  - `mainPage 완성`, `login 기능 수정작업`
- **PR 리뷰**
  - 오전 중 코드리뷰, 이후 피드백 반영 or 추가 작업
  - 간단 수정: PR 브랜치에 push
  - 대규모 수정: 새 브랜치에서 수정 후 새 PR

### ✅ 이슈 관리
- **이슈 등록 기준**
  - 구현 명세와 다르게 동작될 경우
  - 추가 기능이 필요한 경우
  - 코드 개선이 필요할 경우
  - 메인 병합 시 충돌 발생
- **이슈 템플릿**
  - 발생 기능, 설명, 재현 방법, 기대 결과 등 작성
  - 해결 시 Comment에 해결방안 반드시 작성

---

## 2. 🎨 Front-end 규칙

### 💡 CSS 전략
- `module.css` 방식 사용 (선택자 충돌 방지 및 컴포넌트별 스타일 관리)
- className 표기법:
  - 일반: `className={styles.div}`
  - 공통 컴포넌트 값 전달 시: `className={styles[size]}`

### ✅ 네이밍 규칙
- 변수/메서드명: `camelCase`
  - ex) `memberId`, `memberLogin`
- 클래스명: 페이지명 요소명 요소설명 (camelCase)
  - ex) `className="loginPage input inputId"`
- id명: `camelCase`
  - ex) `id="inputId"`
- 전역/지역변수: 상단에 주석으로 용도 명시

### 📁 파일/폴더 구조
- 폴더명: 소문자 사용 (단, 동일한 이름의 파일 존재 시 PascalCase 예외 허용)
- 파일명: `PascalCase`
  - ex) `MainPage.jsx`
- CSS 파일명: `페이지명.module.css`
  - ex) `MainPage.module.css`
- utils/services 파일명: `camelCase`
  - ex) `memberLogin.js`

### 📦 import 순서
1. 외부 라이브러리
2. 내장 모듈
3. 컴포넌트
4. utils
5. CSS

- 절대 경로 사용 (`src` 기준)
  - ex) `import 'reset.css' from 'assets/common/reset.css';`

---

## 3. 🧩 컴포넌트 구성 전략
- 최하위 컴포넌트는 생성하지 않고, 부수 효과 없이 단일 태그만 사용
- 해당 태그의의 스타일만 분리 (`.module.css`)
- 컴포넌트 작성 규칙
```
import ... from '...';

function Foo () {
    return (
        <>
        </>
    );
}

export default Foo;
```

---

## 4. 🧱 Back-end 규칙

### ✅ DTO / VO / Entity 명명 규칙
- DTO 클래스: 접미사 없이 작성
- VO 클래스: DB 테이블명과 동일하게 작성: `TB_MEMBER` > `Member`

### ✅ Controller Parameter 처리
- 전달값이 하나(PK): `@PathVariable`
- 여러 개 or 객체: `@RequestParam` / `@RequestBody`

### ✅ 공변성 최대 활용
- 필요한 경우 `? extends`로 읽기만 가능하게 제한, `? super`로 쓰기만 가능하게 제한 활용하기

### ✅ 예외 처리
- `@ExceptionHandler` 사용
- 예외 클래스 명확히 구분하되, 구분 어려울 경우 내부 분기 처리

### ✅ `@Nullable` 어노테이션 적극 사용
  - 모든 `null`의 여지가 있는 경우 반드시 사용
  - `org.springframework.lang.Nullable`을 import
  - 타입 앞에 붙여야 함 (메서드 앞 ❌)

```java
// 올바른 사용
public @Nullable Foo getFoo() { return foo; }
```

---

## 5. 📚 Java 코딩 컨벤션

- 캠퍼스 핵데이 Java 컨벤션 준수
- 클래스/메서드/필드에 기본적으로 `final` 사용
- DTO/VO는 불변 객체로 설계
- 파라미터/로컬 변수는 `final` 생략 가능

---

## 6. 🔧 Lombok 사용 규칙

- `@AllArgsConstructor`, `@Data` 지양
- `@Builder`는 클래스 레벨이 아닌 `private`인 생성자에 적용
- `@RequiredArgsConstructor` 사용 시 생성자 순서 오류 주의

```java
@Getter
class Person {
    private final String name;
    private final int age;
    private final int code;

    @Builder
    private Person(String name, int age, int code) {
        this.name = name;
        this.age = age;
        this.code = code;
    }
}
```
- DTO/VO 외의 서비스 클래스 등에는 Lombok 사용 지양, 생성자 직접 작성 권장

---

## 7. 🛠️ MyBatis 스타일

- XML 기반 매핑 사용  
- Mapper는 `interface` 형식  
- Annotation 기반 매핑 지양  

---

## 8. 🧪 기타 권장 사항

- 클래스/메서드/필드는 기본 `final` 선언  
- DTO/VO 등은 기본적으로 불변성 유지  

---

## ✅ REST API 설계

- RESTful한 URI 설계 원칙 준수 

- ### REST API 예시

```java
@RestController
@RequestMapping("/members")
public final class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberDto> getMember(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createMember(@RequestBody MemberDto memberDto) {
        memberService.create(memberDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMember(@PathVariable Long id, @RequestBody MemberDto memberDto) {
        memberService.update(id, memberDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```