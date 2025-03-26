package board.service.common;

import board.model.dto.common.DetailMainGraphDto;
import board.model.dto.common.ReserVationDetailDto;
import board.model.mapper.common.ReserVationDetailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReserVationDetailService {

    private final ReserVationDetailMapper reserVationDetailMapper;

    public List<ReserVationDetailDto> detailFin(){
        System.out.println("ReserVationDetailController.detailFin");

        List<ReserVationDetailDto> result =reserVationDetailMapper.detailFin();
        System.out.println("result = " + result);
        return result;
    }


    public DetailMainGraphDto detailChoice(int hno){
        System.out.println("ReserVationDetailController.detailChoice");
        System.out.println("hno = " + hno);

        DetailMainGraphDto result = reserVationDetailMapper.detailChoice(hno);
        return result;
    }


}
