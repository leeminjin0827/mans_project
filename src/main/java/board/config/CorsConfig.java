package board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 스프링 컨테니어에 빈(객체) 등록, 스프링이 시작될 때 해당 클래스를 읽어드림
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    // (1) implements WebMvcConfigurer : spring mvc관련 설정값을 수정하는 인터페이스
    // (2) CORS관련 설정값 수정 / 오버라이딩(재정의)
    // addCorsMappings 메소드 재정의
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // .addMapping("/**") : 모든 스프링 컨트롤러를 매핑
        // .addMapping("/member") : member 컨트롤러만 매핑
        // .allowedOrigins("http://localhost:5173", "http://localhost:5174") : 허용할 출처(도메인)
        // .allowedMethods("GET", "POST", "PUT", "DELETE") : 허용할 HTTP 메소드
        // .allowedHeaders("*") : HTTP의 헤더정보 허용
        // .allowCredentials : HTTP의 쿠키/인증을 허용
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
