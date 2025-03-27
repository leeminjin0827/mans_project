package board.controller.common;

import board.model.dto.common.ReservationCheckDto;
import board.model.dto.common.ReservationDto;
import board.model.dto.room.RoomDto;
import board.service.common.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // 객실 예약
    // [POST] : { "resname" : "#" , "resphone" : "#" , "resstart" : "#" , "resend" : "#" , "rono" : "#" }
    @PostMapping("")
    public boolean reservationWrite(@RequestBody ReservationDto reservationDto ){
        // 중복 예약 체크
        boolean real = reservationService.reservationReal(reservationDto);
        if( real ){
            return false;
        } // if end
        // 예약 처리
        boolean result = reservationService.reservationWrite(reservationDto);
        return result;

    } // f end

    // 원하는 조건 객실 조회
    // [GET] : http://localhost:8081/reservation?hno=#&rno=#
    @GetMapping("")
    public List<ReservationDto> reservationList(@RequestParam int hno , @RequestParam int rno , @RequestParam String resstart , @RequestParam String resend ){
        System.out.println("GET 요청: hno=" + hno + ", rno=" + rno + ", resstart=" + resstart + ", resend=" + resend);
        return reservationService.reservationList( hno , rno , resstart , resend );
    } // f end

    // 사용자 예약 내역 조회
    // [GET] : http://localhost:8081/reservation/view?resname=#&resphone=#
    @GetMapping("/view")
    public List<ReservationDto> reservationView( @RequestParam String resname , @RequestParam String resphone ){
        return reservationService.reservationView( resname , resphone );
    } // f end

    /** 예약 수정 */
    @PutMapping("")
    public boolean updateReservation(@RequestBody() ReservationDto reservationDto) {
        boolean result = reservationService.updateReservation(reservationDto);
        return result;
    }

    /** 예약 삭제 */
    @DeleteMapping("")
    public boolean deleteReservation(@RequestParam(name = "reno") int reno) {
        boolean result = reservationService.deleteReservation(reno);
        return result;
    }

} // c end
