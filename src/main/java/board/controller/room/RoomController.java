package board.controller.room;

import board.model.dto.room.RatingDto;
import board.model.dto.room.RoomDto;
import board.model.dto.room.RoomOptionDto;
import board.service.room.RatingService;
import board.service.room.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@CrossOrigin("http://localhost:5173")
// http://localhost:8081/room

public class RoomController {

    @Autowired
    private RoomService roomService;

    // 객실 등록
    // Content-Type : multipart/form-data
    // http://localhost:8081/room { "rname" , "rno" , "hno" , "staffNumber" , "rfiles" }
    @PostMapping("")
    public boolean roomWrite( RoomDto roomDto ){
        boolean result = roomService.roomWrite(roomDto);
        return result;
    } // f end

    // 객실 전체조회
    // http://localhost:8081/room
    @GetMapping("")
    public List<RoomDto> roomList(){
        List<RoomDto> list = roomService.roomList();
        return list;
    } // f end

    // 객실 수정
    // { "rono" : 1 , "rno" : 9 , "staff_number" : 2 }
    @PutMapping("")
    public boolean roomUpdate( @RequestBody RoomDto roomDto ){
        boolean result = roomService.roomUpdate(roomDto);
        return result;
    } // f end

    // 객실 삭제
    @DeleteMapping("")
    public boolean roomDelete( @RequestParam("rono") int rono){
        boolean result = roomService.roomDelete(rono);
        return result;
    } // f end

} // c end
