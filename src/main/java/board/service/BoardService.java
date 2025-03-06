package board.service;

import board.model.dto.BoardDto;

import board.model.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class BoardService {

    @Autowired
    private BoardMapper boardMapper;


    //1 등록
    public boolean save(BoardDto boardDto){
        System.out.println("BoardService.save");
        System.out.println("boardDto = " + boardDto);

        return boardMapper.save(boardDto);
    }

    //2 조회
    public ArrayList<BoardDto> findAll(){
        System.out.println("BoardService.findAll");
        System.out.println();

        return boardMapper.findAll();

    }

    //3. 개별조회
    public BoardDto find(int bno){
        System.out.println("BoardService.find");
        System.out.println("bno = " + bno);

        return boardMapper.find(bno);
    }

    //4. 수정
    public  boolean update(BoardDto boardDto){
        System.out.println("BoardService.update");
        System.out.println("boardDto = " + boardDto);

        return boardMapper.update(boardDto);
    }

    //5. 삭제
    public  boolean delete(int bno){
        System.out.println("BoardService.delete");
        System.out.println("bno = " + bno);

        return boardMapper.delete(bno);
    }

}
