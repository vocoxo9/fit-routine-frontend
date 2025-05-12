# Java 규칙

## 코딩 컨벤션

코드를 작성할 땐 [캠퍼스 핵데이 Java 코딩 컨벤션](https://naver.github.io/hackday-conventions-java/)을 따라야 합니다.

## Null 처리 규칙

반환 타입, 필드 타입, 파라미터 타입 등 코드 상에 존재하는 모든 타입은 `null` 일 가능성이 있다면, 반드시 `@Nullable` 어노테이션을 붙여야 합니다. 해당 어노테이션은 `org.springframework.lang` 에 위치합니다.

예시는 다음과 같습니다:

```java
import org.springframework.lang.Nullable;

public final class Container {
    private @Nullable Foo foo;

    public void setFoo(@Nullable Foo foo) {
        this.foo = foo;
    }

    public @Nullable Foo getFoo() {
        return foo;
    }
}
```

단, 이 어노테이션은 항상 타입 앞에 붙여야 합니다. 메서드 앞에 붙이지 마세요:

```java
// 올바른 사용
public @Nullable Foo getFoo() {
	return foo;
}

// 잘못된 사용
@Nullable
public Foo getFoo() {
	return foo;
}
```

또한 그렇기 때문에, 반대로 `@Nullable` 어노테이션이 붙지 않은 타입은 `null`일 가능성이 존재해선 안됩니다.

## REST API 규칙 준수

REST API 규칙을 지켜야 합니다. 이 부분에 대해선 각자 학습이 필요합니다.

## Lombok 스타일

### Annotation 규칙

`@AllArgsConstructor`, `@Data`를 최대한 지양합시다. 또한 `@Builder`를 생성자 레벨이 아닌 클래스 레벨에 붙이는 것도 지양합시다. 그 외에도 **Lombok**엔 문제되는 부분이 꽤
있어 조심해서 다뤄야 하는데, 다음 글 읽어보시면 좋을 것 같습니다.

- [Why you should not use Lombok](https://ppbruna.medium.com/why-you-should-not-use-lombok-f7556662e8c3)
- [Lombok 사용상 주의점](https://kwonnam.pe.kr/wiki/java/lombok/pitfall)

따라서 생성자를 직접 `private`로 작성하고, `@Builder`를 다는 것이 최선으로 보입니다.

```java
@Getter
class Person {
    private final String name;
    private final int age;
    private final int code;

    // 여기서 중요한 점은, `private`로 선언하여 빌더로만 생성할 수 있도록 하는 것입니다.
    @Builder
    private Person(String name, int age, int code) {
        this.name = name;
        this.age = age;
        this.code = code;
    }
}

// 각 값이 무엇을 의미하는지 단번에 파악할 수 있음.
Person person = Person.builder()
        .name("홍길동")
        .age(30)
        .code(82)
        .build();
```

### DTO, VO 외 사용 지양

부수 효과를 방지하기 위해 **DTO**, **VO** 외 사용을 지양합니다. 대신 직접 작성하도록 합니다.

예시는 다음과 같습니다:

```java
// 나쁜 사용
@Service
@RequiredArgsConstructor
public final class MemberService {
    private final MemberMapper memberMapper;
}

// 바른 사용
@Service
public final class MemberService {
    private final MemberMapper memberMapper;
    
    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }
}
```

## Mybatis 스타일

**인터페이스**와 **XML 기반 매핑**을 사용합니다. **클래스**와 **Annotation 기반 매핑**은 사용하지 않습니다.

## 기타 권고 사항

다음 내용은 반드시 지켜야 하는 것은 아닙니다.

### final 기본 사용

- 모든 클래스/메서드/필드는 기본적으로 `final`로 선언한다.
- 필요한 경우에만 `non-final`로 변경한다.
- 예외: 파라미터, 로컬 변수에는 `final`이 큰 의미가 없다.

### 불변성 우선

- **DTO**, **VO** 등의 데이터를 표현하는 객체는 기본적으로 불변으로 설계한다.
- 필요한 경우, 필요한 부분만 가변으로 전환한다.
- `Lombok`을 사용하는 경우, 필드를 `final`로 선언하면 불변이다.
