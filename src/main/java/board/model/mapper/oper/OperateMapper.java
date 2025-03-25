package board.model.mapper.oper;


import board.model.dto.oper.OperateDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;

@Mapper
public interface OperateMapper {

    @Insert("insert into operate( address,  hotel_number, intro , mimg )" +
            "values( #{address}, #{hotel_number}, #{intro} , #{mimg} ) ")
    public boolean conFine(OperateDto operateDto);

    @Select("select * from operate")
    public ArrayList<OperateDto> findAll();

    @Select("select * from operate where hno = #{hno}")
    public  OperateDto findOne(int hno);

    @Update(" update operate set address = #{address}, hotel_number = #{hotel_number} , intro = #{intro} where hno = #{hno} ")
    public boolean Update(OperateDto operateDto);

//    @Update(" update operate set address = #{address} where hno = #{hno} ")
//    boolean alter(OperateDto operateDto);

    @Update(" update operate set state = #{ state } where hno = #{ hno }")
    boolean remove(OperateDto operateDto);// 여기까지는 값이 제대로 옴


}
