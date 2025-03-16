package board.service.room;

import board.model.dto.room.RoomOptionDto;
import board.model.mapper.room.RoomOptionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomOptionService {

    @Autowired
    private RoomOptionMapper roomOptionMapper;

    // 객실별 옵션 추가
    public boolean rOptionWrite(RoomOptionDto roomOptionDto ){
        return roomOptionMapper.rOptionWrite( roomOptionDto );
    } // f end

    // 객실별 옵션 목록 전체조회
    public List<RoomOptionDto> rOptionList(){
        return roomOptionMapper.rOptionList();
    } // f end

    // 객실별 옵션 등록
    public boolean rOptionUpdate( RoomOptionDto roomOptionDto ){
        return roomOptionMapper.rOptionUpdate( roomOptionDto );
    } // f end

    // 객실별 옵션 목록 삭제
    public boolean rOptionListDelete( int rno ){
        return roomOptionMapper.rOptionListDelete( rno );
    } // f end

    // 객실별 옵션 삭제
    public boolean rOptionDelete( int rno , int opno  ){
        return roomOptionMapper.rOptionDelete( rno , opno );
    } // f end

} // f end
