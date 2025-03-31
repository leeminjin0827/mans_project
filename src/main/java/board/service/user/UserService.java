package board.service.user;

import board.controller.common.RoomReservation;
import board.model.mapper.user.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;


    public Map<String, Object> findAvailableRooms(Map<String, Object> reqMap) {


        // 객실 조회
        List<Map<String, Object>> result1 = userMapper.findAvailableRooms(reqMap);
        System.out.println("result1 = " + result1);

        // 응답 맵 초기화
        Map<String, Object> result = new HashMap<>();

        // 객실 수 계산
        result.put("size", result1.size());

        // hno와 rno 값 안전하게 가져오기 (예외 처리 추가)
        String hno = reqMap.get("hno") != null ? reqMap.get("hno").toString() : "0";
        String rno = reqMap.get("rno") != null ? reqMap.get("rno").toString() : "0";
        try {
            result.put("hno", hno); // 지점 번호
            result.put("rno", rno); // 객실 등급 번호

            // 호텔 이름과 객실 등급 이름 조회
            String hotelName = userMapper.findHotelName(Integer.parseInt(hno));
            String ratingName = userMapper.findRatingName(Integer.parseInt(rno));

            result.put("hname", hotelName); // 호텔 이름
            result.put("rname", ratingName); // 객실 등급 이름
            // 객실 사진
            result.put("pnoname" , userMapper.findRnoNameByRono( Integer.parseInt( result1.get(0).get("rono").toString() )  ));
            return result;

        } catch (NumberFormatException e) {
            result.put("hname", "Invalid Hotel");
            result.put("rname", "Invalid Rating");
            System.err.println("Invalid number format: " + e.getMessage());

            return null;
        }

    }

    private final RoomReservation roomReservation;
    // 예약 등록 처리
    public boolean createReservation(Map<String, Object> reservationData) {
        try {
            // 예약 데이터를 DB에 저장
            List<Map<String, Object>> result1 = userMapper.findAvailableRooms(reservationData);

            List<Integer> list = new ArrayList<>();
            result1.forEach( map ->{
                int rono= Integer.parseInt( map.get("rono").toString() );
                list.add(rono);
            });
            int randomValue = 0;
            if (!list.isEmpty()) {
                Random random = new Random();
                // list에서 난수로 하나 추출
                int randomIndex = random.nextInt(list.size());
                randomValue = list.get(randomIndex);
                System.out.println("난수로 추출된 값: " + randomValue);
            } else {
                System.out.println("리스트가 비어있습니다.");
            }
            reservationData.put("rono" , randomValue);
            int result = userMapper.insertReservation(reservationData);

            // 디테일 , 가격 , 현재날짜 , 상태 , reno
            // 가격 : rating 에서 가격 가져오기

            int price = userMapper.findRoomPrice(Integer.parseInt(reservationData.get("rno").toString()));
            // 현재날짜 : 시스템 날짜 .
            String currentDate = LocalDate.now().toString();
            // 상태 : 정상
            String detail_state = "정상";
            // reno : 예약번호
            int reno = Integer.parseInt(reservationData.get("reno").toString());

            Map<String,Object> reservationDetailData = new HashMap<>();
            reservationDetailData.put("price", price);
            reservationDetailData.put("payment_date", currentDate);
            reservationDetailData.put("detail_state", detail_state);
            reservationDetailData.put("reno", reno);

            int rowsAffected = userMapper.insertReservationDetail(reservationDetailData);

            // 메시지 보내기 : handleTextMessage

            TextMessage message1 = new TextMessage("선택한 지점:"+reservationData.get("hno"));
            roomReservation.handleMessage(null, message1);

            TextMessage message2 = new TextMessage("지점 별 예약:"+reservationData.get("hno")+":"+currentDate);
            roomReservation.handleMessage(null, message2);



            return result > 0; // 저장 성공 여부 반환
        } catch (Exception e) {
            // 예외 처리
            System.err.println("예약 등록 중 오류 발생: " + e.getMessage());
            return false;
        }
    }


}
