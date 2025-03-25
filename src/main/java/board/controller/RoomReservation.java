package board.controller;

import board.model.dto.OperateDto;
import board.model.dto.ReservationDto;
import board.model.dto.room.RoomDto;
import board.model.mapper.ReservationMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class RoomReservation extends TextWebSocketHandler {

    private static final List<WebSocketSession> accessList = new ArrayList<>();
    private final ReservationMapper reservationMapper;

    // 문자를 숫자로 변환해주는 함수
    public Integer changeStringToInt(String str) {
        Integer result = null;
        if(str.equals("지점 번호")) {
            // 운영중인 지점만 줘야하기 때문에 0을 반환
            result = 0;
        }
        return result;
    }

    // 보내온 값이 문자열인지 JSON인지 확인하는 함수
    public boolean isJson(String str) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.readTree(str);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Autowired
    public RoomReservation(ReservationMapper reservationMapper) { this.reservationMapper = reservationMapper; }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 클라이언트가 접속하면 세션 저장
        accessList.add(session);
        System.out.println(">> 새로운 클라이언트 접속 = " + session.getId() + "\n");
    }


    @Override
    // 클라이언트가 보낸 메시지를 모든 연결된 세션에 전달
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String str = null;
        String payload = null;
        // JSON을 String으로 바꿔주는 클래스
        ObjectMapper mapper = new ObjectMapper();
        // 브라우저가 보낸 값을 확인하는 부분
        boolean checkJson = isJson(message.getPayload());
        if(checkJson) {
            payload = mapper.readValue(message.getPayload().trim(), String.class);
        } else {
            payload = message.getPayload().trim();
        }
        System.out.println("메시지 수신\n>> " + payload);

        // 지점 번호 보내주기
        if(payload.equals("지점 번호")) {
            List<OperateDto> hno = reservationMapper.findHno(0);
            System.out.println("지점 번호 : \n" + hno);
            str = mapper.writeValueAsString(hno);
        }

        try {
            String[] payloads = payload.split(":");
            System.out.println("payloads[1] = " + payloads[1]);
            // 선택한 지점의 객실 정보 보내주기
            if(payloads[0].equals("선택한 지점") && payloads[1].matches("\\d")) {
                int hno = Integer.parseInt(payloads[1]);
                List<RoomDto> result = reservationMapper.findHnoRoom(hno);
                System.out.println("지점별 객실 정보 : \n" + result);
                str = mapper.writeValueAsString(result);
            }
            // 선택한 지점의 예약 내역 정보 보내주기
            else if(payloads[0].equals("지점 별 예약") && payloads[1].matches("\\d")) {
                int hno = Integer.parseInt(payloads[1]);
                // LocalDateTime now = LocalDateTime.now();
                // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                // String date = now.format(formatter);
                // System.out.println("현재 날짜 = " + date);
                // List<ReservationDto> result = reservationMapper.reservationFind(hno, date);
                List<ReservationDto> result = reservationMapper.reservationFind(hno, payloads[2]);
                List<ReservationDto> processedData = new ArrayList<>();
                for(int index = 0; index < result.size(); index++) {
                    ReservationDto dto = result.get(index);
                    LocalDate checkIn = LocalDate.parse(dto.getResstart());
                    LocalDate nowDate = LocalDate.parse(payloads[2]);
                    LocalDate checkOut = LocalDate.parse(dto.getResend());
                    if(!nowDate.isBefore(checkIn) && nowDate.isBefore(checkOut)) {
                        processedData.add(dto);
                    }
                }
                if(processedData.isEmpty()) {
                    ReservationDto rd = new ReservationDto();
                    rd.setReno(0);
                    processedData.add(rd);
                }
                System.out.println(processedData);
                str = mapper.writeValueAsString(processedData);
            }
        } catch(Exception e) {
            System.out.println(e);
            System.out.println(":이 없음\n");
        }

        // 현재 접속 중인 소캣 개수 출력
        System.out.println(">> 현재 소캣 접속 개수 = " + accessList.size() + "\n");

        // 데이터베이스에서 예약 테이블 전체 값 가져오기
        // List<ReservationDto> reservationList = reservationMapper.reservationFindAll();
        // 데이터베이스에서 지점 가져오기

        // String str = mapper.writeValueAsString(reservationList);


        // 모든 클라이언트에게 메시지 전송
        for(int index = 0; index < accessList.size(); index++) {
            WebSocketSession temp = accessList.get(index);
            if(temp.isOpen()) {
                temp.sendMessage(new TextMessage(str));
            }
        }
        System.out.println("메시지 수신 완료");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 연결 종료 시 세션 제거
        accessList.remove(session);
        System.out.println("클라이언트 연결 종료 = " + session.getId() + "\n");
    }
}
