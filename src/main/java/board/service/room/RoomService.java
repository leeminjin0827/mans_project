package board.service.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RoomDto;
import board.model.dto.room.RoomOptionDto;
import board.model.mapper.room.OptionMapper;
import board.model.mapper.room.RatingMapper;
import board.model.mapper.room.RoomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomMapper roomMapper;
    private final RfileService rfileService;

    // 객실 등록
    public boolean roomWrite(RoomDto roomDto){
        try {
            // 객실 등록
            boolean result = roomMapper.roomWrite(roomDto);
            System.out.println("result = " + result);

            // 객실 등록 후 , 사진 등록
            if( result ){
                if( roomDto.getRuploadfiles() != null && !roomDto.getRuploadfiles().isEmpty()){
                    for( MultipartFile file : roomDto.getRuploadfiles()){
                        String filename = rfileService.rFileUpload(file);
                        System.out.println("filename : " + filename);
                        if( filename != null ){
                            System.out.println(roomDto );
                            roomMapper.pictureSave(roomDto.getRono() , filename );
                        } // if end
                    } // for end
                } // if end
            } // if end
            System.out.println(result);
            return result;
        }catch (Exception e ) { return false; }
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
