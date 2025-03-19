package board.service;

import board.model.dto.OperateDto;
import board.model.mapper.OperateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OperateService {


    private final OperateMapper operateMapper;
    private final FileService fileService;

    //등록
    public  boolean conFine(OperateDto operateDto){
        System.out.println("OperateService.conFine");
        System.out.println("operateDto = " + operateDto);
        try{
            if (operateDto.getUploadfile() == null){
            }else {
                String filename = fileService.fileUpload(operateDto.getUploadfile());
                operateDto.setMimg(filename);
                System.out.println("filename = " + filename);
            }
            boolean result = operateMapper.conFine(operateDto);
            System.out.println("result = " + result);
            System.out.println("operateDto = " + operateDto);
            return result;
        } catch (Exception e) {
            return false;
        }


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

    //수정(전화번호, 소개 ,주소)
    public boolean Update(OperateDto operateDto){
        System.out.println("OperateService.Update");
        System.out.println("operateDto = " + operateDto);

        return operateMapper.Update(operateDto);
    }

    //수정(주소)
//    public  boolean alter(OperateDto operateDto){
//        System.out.println("OperateService.alter");
//        System.out.println("operateDto = " + operateDto);
//
//        return operateMapper.alter(operateDto);
//    }

    //수정(상태변경)
    public boolean remove(int hno, int state){
        System.out.println("OperateService.remove");
        System.out.println("hno = " + hno + ", state = " + state);

        OperateDto operateDto = new OperateDto(); // dto 만들어서 dto에 값을 넣으니 해결됨
        operateDto.setHno(hno);
        operateDto.setState(state);
        return operateMapper.remove( operateDto);

    }

}
