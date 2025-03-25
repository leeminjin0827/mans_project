package board.service;

import board.model.dto.ReservationDto;
import board.model.mapper.ReservationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;
    @Autowired
    public ReservationService(ReservationMapper reservationMapper) { this.reservationMapper = reservationMapper; }

    // 객실 등록
    public boolean reservationWrite(ReservationDto reservationDto){
        return true;
    } // f end
    
    // 객실 조회
    
    // 객실 개별조회
    
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
