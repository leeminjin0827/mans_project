package board.controller;

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

        // 모든 클라이언트에게 메시지 전송
        for(int index = 0; index < accessList.size(); index++) {
            WebSocketSession temp = accessList.get(index);
            if(temp.isOpen()) {
                temp.sendMessage(new TextMessage("서버 = " + message.getPayload()));
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
