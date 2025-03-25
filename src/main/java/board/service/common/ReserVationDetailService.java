package board.service.common;

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


}
