package board.service.common;

import board.model.dto.common.ReservationCheckDto;
import board.model.dto.common.ReservationDto;
import board.model.dto.room.RoomDto;
import board.model.mapper.common.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationMapper reservationMapper;

    // 객실 예약
    public boolean reservationWrite(ReservationDto reservationDto){
        return reservationMapper.reservationWrite( reservationDto );
    } // f end

    // 원하는 조건 객실 조회 (지점번호, 객실등급, 체크인 날짜, 체크아웃 날짜)
    public List<ReservationDto> reservationList(int hno, int rno, String resstart, String resend) {
        // 객실 조회에 필요한 조건을 DTO로 담아 전달
        List<RoomDto> rooms = reservationMapper.reservationList( hno , rno );
        System.out.println("================ 전체 객실 ================");
        System.out.println( rooms );

        // 예약이 겹치는 객실 조회
        System.out.println("reservationCheck() 호출됨!");
        List<ReservationDto> reservationRooms = reservationMapper.reservationCheck(hno , rno , resstart , resend );
        System.out.println( "예약이 겹치는 객실 : " + reservationRooms);

        // 예약이 겹치는 객실의 rono 추출
        Set<Integer> ronoSet = reservationRooms.stream()
                .map(ReservationDto::getRono)
                .collect(Collectors.toSet());
        System.out.println("rono추출 : " + ronoSet );

        // 예약 가능한 객실에서 rono 값을 가져와 ReservationDto에 매핑
        List<ReservationDto> reservationDtos = new ArrayList<>();
        for (RoomDto room : rooms) {
            if( !ronoSet.contains(room.getRono())) {
                ReservationDto reservationDto = new ReservationDto();
                reservationDto.setHno(hno);
                reservationDto.setRno(rno);
                reservationDto.setRname(room.getRname());
                reservationDto.setRono(room.getRono());
                reservationDtos.add(reservationDto);
            } // if end
        } // for end
        System.out.println( "걸러진객실 : " + reservationDtos );
        return reservationDtos;

    } // f end

    public boolean reservationReal(ReservationDto reservationDto){
        // 예약이 겹치는지 확인하기 위해 예약 테이블을 조회
        List<ReservationDto> real = reservationMapper.reservationCheck(
           reservationDto.getHno(),
           reservationDto.getRno(),
           reservationDto.getResstart(),
           reservationDto.getResend()
        );
        return !real.isEmpty(); // 예약이 있으면 true (중복 예약), 없으면 false
    } // f end
    
    // 사용자 예약 내역 조회
    public List<ReservationDto> reservationView(String resname , String resphone){
        return reservationMapper.reservationView( resname , resphone );
    } // f end
    
    /** 예약 수정 */
    public boolean updateReservation(ReservationDto reservationDto) {
        boolean result = reservationMapper.updateReservation(reservationDto);
        return result;
    }

    /** 예약 삭제 */
    public boolean deleteReservation(int reno) {
        boolean result = reservationMapper.deleteReservation(reno);
        return result;
    }

} // c end
