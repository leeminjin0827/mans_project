package board.controller.oper;


import board.model.dto.oper.OperateDto;
import board.service.oper.OperateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/director")
@CrossOrigin("http://localhost:5173")
public class OperateController {

    @Autowired
    private OperateService operateService;

    // [등록] { "address" : "영등포역"  , "hotel_number" : "010-222-2222" , "intro" : "소개하는곳"}
    // state 안넣는 이유 : 등록을 하는것은 운영을 할때 하는것이기 때문
    //address api사용할지 고민하기
    @PostMapping("")
    public boolean conFine(OperateDto operateDto){
        System.out.println("OperateController.conFine");
        System.out.println("operateDto = " + operateDto);

        return operateService.conFine(operateDto);
    }

    // 전체출력
    @GetMapping("")
    public ArrayList<OperateDto> findAll(){
        System.out.println("OperateController.findAll");

        return operateService.findAll();
    }

    // 개별조회
    @GetMapping("/one")
    public OperateDto findOne(@RequestParam("hno") int hno){
        System.out.println("OperateController.findOne");
        System.out.println("hno = " + hno);

        return operateService.findOne(hno);
    }
    //수정(주소, 전화번호, 소개)
   @PutMapping("") //  {"hno" : "2", "hotel_number" : "010-222-2222" , "intro" : "소개하는곳" }
    public boolean Update(@RequestBody OperateDto operateDto){
        System.out.println("OperateController.Update");
        System.out.println("operateDto = " + operateDto);

        return operateService.Update(operateDto);
    }

//    //수정(주소)
//    @PutMapping("/revice")
//    public boolean alter(@RequestBody OperateDto operateDto){
//        System.out.println("OperateController.alter");
//        System.out.println("operateDto = " + operateDto);
//        return operateService.alter(operateDto);
//    }

    //수정(상태변경) 나중에 입력으로 할지 아니면 바형태로 선택하는것으로 할지 고민할것
   @DeleteMapping("")// 파람스는 2개 이상 보낼시 각각 보낼것 name으로 구별함
    public boolean remove(@RequestParam(name = "hno") int hno ,@RequestParam(name = "state") int state){
        System.out.println("OperateController.remove");
       System.out.println("hno = " + hno + ", state = " + state);
        boolean result = operateService.remove(hno, state);
       System.out.println("result : " + result);
        return  result;
    }



}//f end
