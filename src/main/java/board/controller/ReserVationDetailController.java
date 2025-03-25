package board.controller;

import board.model.dto.ReserVationDetailDto;
import board.service.ReserVationDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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



}// c end
