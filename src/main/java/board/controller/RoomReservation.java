package board.controller;

import board.model.dto.ReservationDto;
import board.model.mapper.ReservationMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoomReservation extends TextWebSocketHandler {

    private static final List<WebSocketSession> accessList = new ArrayList<>();
    private final ReservationMapper reservationMapper;

    @Autowired
    public RoomReservation(ReservationMapper reservationMapper) { this.reservationMapper = reservationMapper; }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 클라이언트가 접속하면 세션 저장
        accessList.add(session);
        System.out.println(">> 새로운 클라이언트 접속 = " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트가 보낸 메시지를 모든 연결된 세션에 전달
        System.out.println("메시지 수신  = " + message.getPayload());

        // 현재 접속 중인 소캣 개수 출력
        System.out.println(">> 현재 소캣 접속 개수 = " + accessList.size());

        // 데이터베이스에서 예약 테이블 전체 값 가져오기
        List<ReservationDto> reservationList = reservationMapper.reservationFindAll();
        // 데이터베이스에서 지점 가져오기


        ObjectMapper mapper = new ObjectMapper();
        String str = mapper.writeValueAsString(reservationList);


        // 모든 클라이언트에게 메시지 전송
        for(int index = 0; index < accessList.size(); index++) {
            WebSocketSession temp = accessList.get(index);
            if(temp.isOpen()) {
                temp.sendMessage(new TextMessage(str));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 연결 종료 시 세션 제거
        accessList.remove(session);
        System.out.println("클라이언트 연결 종료 = " + session.getId());
    }
}
