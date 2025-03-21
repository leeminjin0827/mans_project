package board.model.mapper;

import board.model.dto.StaffDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

@Mapper
public interface HomMapper {

    @Select("select name, phone ,address1,start_date, staff_rank from staff where hno = #{hno}" )
    public ArrayList<StaffDto> staffone(int hno);



}
