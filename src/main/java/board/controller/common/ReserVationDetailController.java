package board.controller.common;

import board.model.dto.common.DetailMainGraphDto;
import board.model.dto.common.ReserVationDetailDto;
import board.service.common.ReserVationDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/detail")
@RequiredArgsConstructor
public class ReserVationDetailController {

    private final ReserVationDetailService reserVationDetailService;

    @GetMapping("")
    public List<ReserVationDetailDto> detailFin(){
        System.out.println("ReserVationDetailController.detailFin");

        List<ReserVationDetailDto> result = reserVationDetailService.detailFin();
        System.out.println("result = " + result);
        return result;
    }

    @GetMapping("/choice")
    public DetailMainGraphDto detailChoice(@RequestParam("hno") int hno){
        System.out.println("ReserVationDetailController.detailChoice");
        System.out.println("hno = " + hno);

        DetailMainGraphDto result = reserVationDetailService.detailChoice(hno);
        return  result;
    }



}// c end
