package board.model.mapper.common;

import board.model.dto.staff.StaffDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface HomMapper {

    @Select("select name, phone ,address1,start_date, staff_rank from staff where hno = #{hno}" )
    public ArrayList<StaffDto> staffone(int hno);



}
