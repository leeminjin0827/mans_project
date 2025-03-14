package board.controller.room;

import board.model.dto.room.RoomOptionDto;
import board.service.room.RoomOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room/option/set")
public class RoomOptionController {

    @Autowired
    private RoomOptionService roomOptionService;

    // 등급 옵션 목록 추가
    @PostMapping("")
    public boolean rOptionWrite( @RequestBody RoomOptionDto roomOptionDto){
        return roomOptionService.rOptionWrite( roomOptionDto );
    } // f end

    // 등급 옵션 목록 전체조회
    @GetMapping("")
    public List<RoomOptionDto> rOptionList(){
        return roomOptionService.rOptionList();
    } // f end

    // 등급 옵션 목록 수정
    @PutMapping("")
    public boolean rOptionUpdate( @RequestBody RoomOptionDto roomOptionDto ){
        return roomOptionService.rOptionUpdate( roomOptionDto );
    } // f end

    // 등급 옵션 목록 삭제
    @DeleteMapping("")
    public boolean rOptionDelete( @RequestParam("rono") int rono ){
       return roomOptionService.rOptionDelete( rono );
    } // f end

} // c end
