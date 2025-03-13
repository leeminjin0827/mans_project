package board.controller.room;


import board.model.dto.room.RatingDto;
import board.service.room.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room/rating")
@CrossOrigin("http://localhost:5173")
// http://localhost:8081/room/rating
// http://localhost:8081/room/rating?rno=#
// POST { "ratingName" : "#" , "bedCount" : # , "bedType" : "#" , "ratingOption" : "#" }
// PUT { "rno" : # , "ratingName" : "#" , "bedCount" : # , "bedType" : "#" , "ratingOption" : "#" }

public class RatingController {

    @Autowired
    private RatingService ratingService;

    // 객실등급 등록
    @PostMapping("")
    public boolean ratingWrite( @RequestBody RatingDto ratingDto ){
        boolean result = ratingService.ratingWrite(ratingDto);
        return result;
    } // f end

    // 객실등급 전체조회
    @GetMapping("")
    public List<RatingDto> ratingList(){
        List<RatingDto> list = ratingService.ratingList();
        return list;
    } // f end

    // 객실등급 수정
    @PutMapping("")
    public boolean ratingUpdate( @RequestBody RatingDto ratingDto ){
        boolean result = ratingService.ratingUpdate(ratingDto);
        return result;
    } // f end

    // 객실등급 삭제
    @DeleteMapping("")
    public boolean ratingDelete( @RequestParam("rno") int rno){
        boolean result = ratingService.ratingDelete(rno);
        return result;
    } // f end

} // c end
