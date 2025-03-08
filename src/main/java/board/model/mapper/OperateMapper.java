package board.model.mapper;


import board.model.dto.OperateDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;

@Mapper
public interface OperateMapper {

    @Insert("insert into operate(hotel_name, address, director, hotel_number, intro )" +
            "values( #{hotel_name}, #{address}, #{director}, #{hotel_number}, #{intro})")
    public boolean conFine(OperateDto operateDto);

    @Select("select * from operate")
    public ArrayList<OperateDto> findAll();

    @Select("select * from operate where hno = #{hno}")
    public  OperateDto findOne(int hno);

    @Update(" update operate set hotel_number = #{hotel_number} , intro = #{intro} where hno = #{hno} ")
    public boolean Update(OperateDto operateDto);

    @Update(" update operate set address = #{address} , director = #{director} where hno = #{hno}")
    boolean alter(OperateDto operateDto);

    @Update(" update operate set state = #{state} where hno = #{hno}")
    boolean remove(int hno, int state);


}
