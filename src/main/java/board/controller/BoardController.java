package board.controller;


import board.config.LoginSession;
import board.model.dto.BoardDto;
import board.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@RequestMapping("/board")
public class BoardController {

//    HttpSession httpSession = req.getSession();

    @Autowired
    private BoardService boardService;

    // [1] 등록
    @PostMapping("")
    public boolean save(@RequestBody BoardDto boardDto){
        System.out.println("BoardController.save");
        System.out.println("boardDto = " + boardDto);



        //int result = new LoginSession().check(); 생성자로 만들어서 사용할수 있음




        return boardService.save(boardDto);

    }

    //[2] 전체조회
    @GetMapping("")
    public ArrayList<BoardDto> findAll(){
        System.out.println("BoardController.findAll");
        System.out.println();

        return boardService.findAll();
    }

    //[3] 개별조회
    @GetMapping("/view")
    public  BoardDto find(@RequestParam("bno") int bno){
        System.out.println("BoardController.find");
        System.out.println("bno = " + bno);
        return boardService.find(bno);

    }

    //[4] 수정
    @PutMapping("")
    public boolean update(@RequestBody BoardDto boardDto){
        System.out.println("BoardController.update");
        System.out.println("boardDto = " + boardDto);
        return boardService.update(boardDto);
    }

    //[5] 삭제
    @DeleteMapping("")
    public  boolean delete(@RequestParam("bno") int bno){
        System.out.println("BoardController.delete");
        System.out.println("bno = " + bno);

        return boardService.delete(bno);
    }



}
