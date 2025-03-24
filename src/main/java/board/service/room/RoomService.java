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
            // 업로드된 파일명을 저장할 리스트 생성
            List<String> filenames = new ArrayList<>();
            // 첨부파일 존재여부 검사
            if (roomDto.getRuploadfiles() != null && !roomDto.getRuploadfiles().isEmpty() ) {
                for(MultipartFile file : roomDto.getRuploadfiles() ){
                    if( !file.isEmpty() ){ // false : 파일이 있다. // true 이면
                        System.out.println("file : " + file);
                        String filename = rfileService.rFileUpload(file);
                        System.out.println("filename : " + filename);
                        if( filename != null ){
                            filenames.add(filename);
                        } // if end
                    } // if end
                } // for end
            } // if end
            // 업로드된 파일명이 있을경우 처리
            if( !filenames.isEmpty() ){
                // 파일명을 문자열로 합쳐서 DB에 저장
                String filenamesString = String.join("," , filenames );
                roomDto.setRimg(filenamesString);
            } // if end
            boolean result = roomMapper.roomWrite(roomDto);
            System.out.println("result = " + result);
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
