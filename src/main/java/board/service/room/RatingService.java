package board.service.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RatingDto;
import board.model.mapper.room.OptionMapper;
import board.model.mapper.room.RatingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingMapper ratingMapper;

    // 옵션 등록
    public boolean ratingWrite(RatingDto ratingDto){
        return ratingMapper.ratingWrite(ratingDto);
    } // f end

    // 옵션 전체조회
    public List<RatingDto> ratingList(){
        return ratingMapper.ratingList();
    } // f end

    // 옵션 수정
    public boolean ratingUpdate(RatingDto ratingDto){
        return ratingMapper.ratingUpdate(ratingDto);
    } // f end

    // 옵션 삭제
    public boolean ratingDelete(int rno){
        return ratingMapper.ratingDelete(rno);
    } // f end

} // c end
