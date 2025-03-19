package board.controller.room;

import board.model.dto.room.RoomOptionDto;
import board.service.room.RoomOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room/option/set")
@CrossOrigin("http://localhost:5173")
public class RoomOptionController {

    @Autowired
    private RoomOptionService roomOptionService;

    // 객실별 옵션/목록 추가
    @PostMapping("")
    public boolean rOptionWrite( @RequestBody RoomOptionDto roomOptionDto){
        return roomOptionService.rOptionWrite( roomOptionDto );
    } // f end

    // 객실별 옵션 목록 전체조회
    @GetMapping("")
    public List<RoomOptionDto> rOptionList(){
        return roomOptionService.rOptionList();
    } // f end

    // 객실별 옵션 목록 삭제
    @DeleteMapping("/delete")
    public boolean rOptionListDelete( @RequestParam("rno") int rno ){
        return roomOptionService.rOptionListDelete( rno );
    } // f end

    // 객실별 옵션 삭제
    @DeleteMapping("")
    public boolean rOptionDelete( @RequestParam("rno") int rno , @RequestParam("opno") int opno ){
       return roomOptionService.rOptionDelete( rno , opno );
    } // f end

} // c end
