package board.model.mapper;

import board.model.dto.LoginDto;
import board.model.dto.StaffDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    /** 로그인 */
    @Select("Select " +
            "staff_number, id, name, phone, " +
            "address1, address2, address3, " +
            "start_date, end_date, staff_rank, salary, " +
            "resignation, hno, my_photo from staff " +
            "where id = #{id} and password = #{password}")
    @Results({
            @Result(property = "staffNumber", column = "staff_number"),
            @Result(property = "startDate", column = "start_date"),
            @Result(property = "endDate", column = "end_date"),
            @Result(property = "staffRank", column = "staff_rank"),
            @Result(property = "myPhoto", column = "my_photo")
    })
    StaffDto staffLogin(StaffDto staffDto);

    /** 로그아웃 */
    boolean staffLogout(int loginNumber);

}
