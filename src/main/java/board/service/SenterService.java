package board.service;

//import board.aspect.SenterAspect;
import board.model.dto.SenterDto;
import board.model.mapper.SenterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SenterService {

    @Autowired
    private SenterMapper senterMapper;
    //private SenterAspect senterAspect;

    // 문의하기
    public boolean sWrite( SenterDto senterDto ){
        // 문의 제목이 2글자 미만이거나 30글자 초과일경우
//        if( senterDto.getStitle().length() < 2 || senterDto.getStitle().length() > 30 ) {
//            return 2;
//        }
//        // 작성자 이름이 10글자 초과 일 경우
//        if( senterDto.getSuser().length() > 10 ) {
//            return 3;
//        }
        return senterMapper.sWrite( senterDto );
//        if( result ) { return 1; } // true면 1 반환
//        else{ return 0; } // false면 0 반환
} // f end

    // 문의전체조회
    public List<SenterDto> sFindAll(){
        return senterMapper.sFindAll();
    } // f end

    // 문의개별조회
    public SenterDto sView( int sno ){
        return senterMapper.sView( sno );
    } // f end

    // 문의수정
    public boolean sUpdate( SenterDto senterDto ){
        return senterMapper.sUpdate( senterDto );
    } // f end

    // 문의삭제
    public boolean sDelete( int sno ){
        return senterMapper.sDelete( sno );
    } // f end
} // c end
