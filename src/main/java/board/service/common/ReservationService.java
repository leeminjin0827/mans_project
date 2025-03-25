package board.service.common;

import board.model.dto.common.ReservationDto;
import board.model.mapper.common.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationMapper reservationMapper;

    // 객실 예약
    public boolean reservationWrite(ReservationDto reservationDto){
        return reservationMapper.reservationWrite( reservationDto );
    } // f end

    // 원하는 조건 객실 조회
    public List<ReservationDto> reservationList( int hno , int rno ){
        return reservationMapper.reservationList( hno , rno );
    } // f end
    
    // 사용자 예약 내역 조회
    public List<ReservationDto> reservationView( String resname , String resphone ){
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
