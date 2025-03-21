package board.controller;

import board.model.dto.OperateDto;
import board.model.dto.StaffDto;
import board.model.dto.room.RatingDto;
import board.service.HomService;
import board.service.OperateService;
import board.service.StaffService;
import board.service.room.RatingService;
import board.service.room.RoomOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("findall")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class HomeController {

    private final OperateService operateService;
    private final StaffService staffService;
    private final RoomOptionService roomOptionService;
    private final RatingService ratingService;
    private final HomService homService;

   @GetMapping("/oper") // 등록 호텔
   public ArrayList<OperateDto> operFin(){
       System.out.println("FindAllController.operFin");

       ArrayList<OperateDto> result = operateService.findAll();
       System.out.println("result = " + result);
       return result;
   }
    // hno 살리자
    @GetMapping("/operone")// 등록 호텔 개별조회
    public OperateDto findOne(@RequestParam("hno") int hno){
        System.out.println("OperateController.findOne");
        System.out.println("hno = " + hno);

        return operateService.findOne(hno);
    }

   @GetMapping("/staffs")// 스태프 전체조회
    public ArrayList<StaffDto> staffFin(){
       System.out.println("FindAllController.staffFin");

       ArrayList<StaffDto> result = staffService.staffFindAll();
       System.out.println("result = " + result);
       return result;
   }

   // hno 살리자
    /** 직원 지점별 조회 */
    @GetMapping("/stffone")
    public ArrayList<StaffDto> staffone(@RequestParam(name = "hno") int hno) {
        ArrayList<StaffDto> result = homService.staffone(hno);
        return result;
    }

    // 이건 그대로
        // 객실등급 전체조회
        @GetMapping("/rating")
        public List<RatingDto> rating(){
            List<RatingDto> list = ratingService.ratingList();
            return list;
        } // f end


}






