package board.controller;

import board.model.dto.ReservationDto;
import board.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // 객실 예약
    @PostMapping("")
    public boolean reservationWrite(@RequestBody ReservationDto reservationDto ){
        return reservationService.reservationWrite( reservationDto );
    } // f end

    // 객실 조회
    @GetMapping("")
    public List<ReservationDto> reservationList( @RequestParam("resname") String resname , @RequestParam("resphone") String resphone ){
        return null;
    } // f end

    // 사용자 예약 내역 조회
    @GetMapping("/view")
    public ReservationDto reservationView( @RequestParam("resname") String resname , @RequestParam("resphone") String resphone ){
        return null;
    } // f end

} // c end
