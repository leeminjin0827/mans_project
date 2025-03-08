package board.service;

import board.model.dto.OperateDto;
import board.model.mapper.OperateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OperateService {

    @Autowired
    private OperateMapper operateMapper;

    //등록
    public  boolean conFine(OperateDto operateDto){
        System.out.println("OperateService.conFine");
        System.out.println("operateDto = " + operateDto);


        return operateMapper.conFine(operateDto);
    }

    //전체출력
    public ArrayList<OperateDto> findAll(){
        System.out.println("OperateService.findAll");

        return operateMapper.findAll();
    }

    //개별조회
    public  OperateDto findOne(int hno){
        System.out.println("OperateService.findOne");
        System.out.println("hno = " + hno);

        return operateMapper.findOne(hno);
    }

    //수정(전화번호, 소개)
    public boolean Update(OperateDto operateDto){
        System.out.println("OperateService.Update");
        System.out.println("operateDto = " + operateDto);

        return operateMapper.Update(operateDto);
    }

    //수정(점장,주소)
    public  boolean alter(OperateDto operateDto){
        System.out.println("OperateService.alter");
        System.out.println("operateDto = " + operateDto);

        return operateMapper.alter(operateDto);
    }

    //수정(상태변경)
    public boolean remove(int hno, int state){
        System.out.println("OperateService.remove");
        System.out.println("hno = " + hno);

        return operateMapper.remove(hno , state);

    }

}
