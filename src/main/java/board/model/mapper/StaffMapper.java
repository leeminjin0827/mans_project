package board.model.mapper;

import board.model.dto.StaffDto;
import org.apache.ibatis.annotations.*;

import java.util.ArrayList;

@Mapper
public interface StaffMapper {

    /** 직원 등록 */
    @Insert("insert into staff(id, name, phone, address, start_date,staff_rank, salary) values " +
            "(#{id}, #{name}, #{phone}, #{address}, #{startDate}, 2, #{salary})")
    boolean staffRegister(StaffDto staffDto);

    /** 직원 전체 조회 */
    @Select("select * from staff")
    @Results({
            @Result(property = "staffNumber", column = "staff_number"),
            @Result(property = "startDate", column = "start_date"),
            @Result(property = "endDate", column = "end_date"),
            @Result(property = "staffRank", column = "staff_rank")
    })
    ArrayList<StaffDto> staffFindAll();

    /** 직원 지점별 조회 */
    ArrayList<StaffDto> staffFindDetail();

    /** 직원 수정 */
    @Update("update staff set " +
            "password = #{password}, name = #{name}, phone = #{phone}, " +
            "address = #{address}, start_date = #{startDate}, staff_rank = #{staffRank}, " +
            "salary = #{salary}, hno = #{hno} " +
            "where staff_number = #{staffNumber}")
    boolean staffUpdate(StaffDto staffDto);

    /** 직원 삭제 */

    @Update("update staff set end_date = #{endDate}, resignation = 1 where staff_number = #{staffNumber}")
    boolean staffDelete(int staffNumber, String endDate);
}
