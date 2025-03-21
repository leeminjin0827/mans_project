package board.config;

import board.controller.RoomReservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// 스프링 컨테이너에 빈(객체) 등록
@Configuration
// 웹소켓 매핑(웹소켓 기능 활성화)
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final RoomReservation reservation;
    @Autowired
    public WebSocketConfig(RoomReservation reservation) { this. reservation = reservation; }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // registerWebSocketHandlers() : 웹소켓 핸들러를 등록
        registry.addHandler(reservation, "/ws/reservation")
                .setAllowedOrigins("http://localhost:5173", "http://localhost:5174");
    }
}
