package board.service.room;

import board.model.dto.room.OptionDto;
import board.model.mapper.room.OptionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionService {

    @Autowired
    private OptionMapper optionMapper;

    // 옵션 등록
    public boolean optionWrite(OptionDto optionDto){
        return optionMapper.optionWrite(optionDto);
    } // f end

    // 옵션 전체조회
    public List<OptionDto> optionList(){
        return optionMapper.optionList();
    } // f end

    // 옵션 수정
    public boolean optionUpdate(OptionDto optionDto){
        return optionMapper.optionUpdate(optionDto);
    } // f end

    // 옵션 삭제
    public boolean optionDelete(int opno){
        return optionMapper.optionDelete(opno);
    } // f end

} // c end
