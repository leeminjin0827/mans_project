package board.model.mapper.staff;

import board.model.dto.staff.StaffDto;
import org.apache.ibatis.annotations.*;

import java.util.ArrayList;

@Mapper
public interface StaffMapper {

    /** 직원 등록 */
    @Insert("insert into staff(id, name, phone, address1, address2, address3, start_date, staff_rank, salary, hno, my_photo) values " +
            "(#{id}, #{name}, #{phone}, #{address1}, #{address2}, #{address3}, #{startDate}, 2, #{salary}, #{hno}, #{myPhoto})")
    boolean staffRegister(StaffDto staffDto);

    /** 직원 전체 조회 */
    @Select("select * from staff")
    @Results({
            @Result(property = "staffNumber", column = "staff_number"),
            @Result(property = "startDate", column = "start_date"),
            @Result(property = "endDate", column = "end_date"),
            @Result(property = "staffRank", column = "staff_rank"),
            @Result(property = "myPhoto", column = "my_photo")
    })
    ArrayList<StaffDto> staffFindAll();

    /** 직원 지점별 조회 */
    @Select("select * from staff where hno = #{hno}")
    @Results({
            @Result(property = "staffNumber", column = "staff_number"),
            @Result(property = "startDate", column = "start_date"),
            @Result(property = "endDate", column = "end_date"),
            @Result(property = "staffRank", column = "staff_rank"),
            @Result(property = "myPhoto", column = "my_photo")
    })
    ArrayList<StaffDto> staffFindDetail(int hno);

    /** 직원 수정(사진 포함) */
    @Update("update staff set " +
            "password = #{password}, name = #{name}, phone = #{phone}, " +
            "address1 = #{address1}, address2 = #{address2}, address3 = #{address3}, " +
            "start_date = #{startDate}, staff_rank = #{staffRank}, " +
            "salary = #{salary}, hno = #{hno}, my_photo = #{myPhoto} " +
            "where staff_number = #{staffNumber}")
    boolean staffUpdateAll(StaffDto staffDto);

    /** 직원 수정(사진 미포함) */
    @Update("update staff set " +
            "password = #{password}, name = #{name}, phone = #{phone}, " +
            "address1 = #{address1}, address2 = #{address2}, address3 = #{address3}, " +
            "start_date = #{startDate}, staff_rank = #{staffRank}, " +
            "salary = #{salary}, hno = #{hno} " +
            "where staff_number = #{staffNumber}")
    boolean staffUpdate(StaffDto staffDto);

    /** 직원 삭제 */

    @Update("update staff set end_date = #{endDate}, resignation = 1 where staff_number = #{staffNumber}")
    boolean staffDelete(@Param("staffNumber") int staffNumber,@Param("endDate") String endDate);
}
