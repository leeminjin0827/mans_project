package board.controller.room;

import board.model.dto.room.OptionDto;
import board.service.room.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room/option")
// http://localhost:8081/room/option
// http://localhost:8081/room/option?opno=#
// POST // { "opName" : "#" }
// PUT // { "opno" : # , "opName" : "#" }

public class OptionController {  

    @Autowired
    private OptionService optionService;

    // 옵션 등록
    @PostMapping("")
    public boolean optionWrite( @RequestBody OptionDto optionDto ){
        boolean result = optionService.optionWrite(optionDto);
        return result;
    } // f end

    // 옵션 전체조회
    @GetMapping("")
    public List<OptionDto> optionList(){
        List<OptionDto> list = optionService.optionList();
        return list;
    } // f end

    // 옵션 수정
    @PutMapping("")
    public boolean optionUpdate( @RequestBody OptionDto optionDto ){
        boolean result = optionService.optionUpdate(optionDto);
        return result;
    } // f end

    // 옵션 삭제
    @DeleteMapping("")
    public boolean optionDelete( @RequestParam("opno") int opno){
        boolean result = optionService.optionDelete(opno);
        return result;
    } // f end



} // c end
