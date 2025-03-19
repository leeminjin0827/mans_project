package board.controller;

import board.model.dto.OperateDto;
import board.model.dto.StaffDto;
import board.model.dto.room.RatingDto;
import board.service.OperateService;
import board.service.StaffService;
import board.service.room.RatingService;
import board.service.room.RoomOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("findAll")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class FindAllController {

    private final OperateService operateService;
    private final StaffService staffService;
    private final RoomOptionService roomOptionService;
    private final RatingService ratingService;

   @GetMapping("/oper") // 등록 호텔
   public ArrayList<OperateDto> operFin(){
       System.out.println("FindAllController.operFin");

       ArrayList<OperateDto> result = operateService.findAll();
       System.out.println("result = " + result);
       return result;
   }

    @GetMapping("/operone")// 등록 호텔 개별조회
    public OperateDto findOne(@RequestParam("hno") int hno){
        System.out.println("OperateController.findOne");
        System.out.println("hno = " + hno);

        return operateService.findOne(hno);
    }

   @GetMapping("/staff")// 스태프 전체조회
    public ArrayList<StaffDto> staffFin(){
       System.out.println("FindAllController.staffFin");

       ArrayList<StaffDto> result = staffService.staffFindAll();
       System.out.println("result = " + result);
       return result;
   }

    /** 직원 지점별 조회 */
    @GetMapping("/stffone")
    public ArrayList<StaffDto> staffone(@RequestParam(name = "hno") int hno) {
        ArrayList<StaffDto> result = staffService.staffFindDetail(hno);
        return result;
    }


        // 객실등급 전체조회
        @GetMapping("rating")
        public List<RatingDto> rating(){
            List<RatingDto> list = ratingService.ratingList();
            return list;
        } // f end


}






