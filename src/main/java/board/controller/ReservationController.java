package board.controller;

import board.model.dto.ReservationDto;
import board.service.ReservationService;
import lombok.RequiredArgsConstructor;
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
        return reservationService.reservationWrite( reservationDto );
    } // f end

    // 원하는 조건 객실 조회
    // [GET] : http://localhost:8081/reservation?hno=#&rno=#
    @GetMapping("")
    public List<ReservationDto> reservationList( @RequestParam("hno") int hno , @RequestParam("rno") int rno ){
        return reservationService.reservationList( hno , rno );
    } // f end

    // 사용자 예약 내역 조회
    // [GET] : http://localhost:8081/reservation/view?resname=#&resphone=#
    @GetMapping("/view")
    public List<ReservationDto> reservationView( @RequestParam("resname") String resname , @RequestParam("resphone") String resphone ){
        return reservationService.reservationView( resname , resphone );
    } // f end

} // c end
