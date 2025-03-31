package board.controller.user;


import board.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/search")
    public Map<String, Object> searchRooms( @RequestBody Map<String,Object> reqMap   ) {
        // 예약중인
        Map<String, Object> result1 = userService.findAvailableRooms( reqMap);
        return result1;
    }
    // 예약 등록 처리
    @PostMapping("/reservation")
    public boolean createReservation(@RequestBody Map<String, Object> reservationData) {
        // 예약 데이터를 받아서 처리하는 서비스 메서드 호출
        boolean isSuccess = userService.createReservation(reservationData);
        return isSuccess;
    }

}
