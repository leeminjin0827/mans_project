package board.model.mapper;

import board.model.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface BoardMapper {

    //1. 입력
    public boolean save(BoardDto boardDto);

    //2. 전체 출력
    public ArrayList<BoardDto> findAll();

    //3. 개별 출력
    public  BoardDto find(int bno);

    //4. 수정
    public boolean update(BoardDto boardDto);

    //5. tkrwp
    public boolean delete(int bno);


}
