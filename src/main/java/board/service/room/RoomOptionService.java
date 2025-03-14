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

    // 등급 옵션 목록 추가
    public boolean rOptionWrite(RoomOptionDto roomOptionDto ){
        return roomOptionMapper.rOptionWrite( roomOptionDto );
    } // f end

    // 등급 옵션 목록 전체조회
    public List<RoomOptionDto> rOptionList(){
        return roomOptionMapper.rOptionList();
    } // f end

    // 등급 옵션 목록 수정
    public boolean rOptionUpdate( RoomOptionDto roomOptionDto ){
//        return roomOptionMapper.rOptionUpdate( roomOptionDto );
        return true;
    } // f end

    // 등급 옵션 목록 삭제
    public boolean rOptionDelete( int rono ){
        return roomOptionMapper.rOptionDelete( rono );
    } // f end

} // f end
