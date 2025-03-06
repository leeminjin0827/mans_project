package board.config;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class UserLoggin {
    /** 메소드 실행 시간 연산 함수 */
    @Around("execution(* board.service.UserService.*(..))")
    public Object timeCheck(ProceedingJoinPoint joinPoint) throws Throwable {
        // 지정한 함수 시그니처 출력
        System.out.println("[실행 메소드] : " + joinPoint.getSignature());

        // 매개변수 출력
        System.out.println("[매개변수] : " + Arrays.toString(joinPoint.getArgs()));

        // 시작 시간
        long startTime = System.currentTimeMillis();
        // 지정한 함수 실행
        Object result = joinPoint.proceed();
        // 종료 시간
        long endTime = System.currentTimeMillis();
        // 걸린 시간
        long time = endTime - startTime;
        // 시간 출력
        System.out.println("[걸린 시간] : " + time + "ms\n");

        // 지정한 함수의 반환값을 그대로 반환
        return result;
    }
}
