package board.service.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RoomDto;
import board.model.dto.room.RoomOptionDto;
import board.model.mapper.room.OptionMapper;
import board.model.mapper.room.RatingMapper;
import board.model.mapper.room.RoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomMapper roomMapper;

    // 객실 등록
    public boolean roomWrite(RoomDto roomDto){
        return roomMapper.roomWrite(roomDto);
    } // f end

    // 객실 전체조회
    public List<RoomDto> roomList(){
        return roomMapper.roomList();
    } // f end

    // 객실 수정
    public boolean roomUpdate(RoomDto roomDto){
        return roomMapper.roomUpdate(roomDto);
    } // f end

    // 객실 삭제
    public boolean roomDelete(int rono ){
        return roomMapper.roomDelete(rono);
    } // f end

} // c end
