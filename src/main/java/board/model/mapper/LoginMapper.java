package board.model.mapper;

import board.model.dto.LoginDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    /** 로그인 */
    @Select("Select staff_number from staff where id = #{id} and password = #{password}")
    @Results({
            @Result(property = "staffNumber", column = "staff_number")
    })
    LoginDto staffLogin(LoginDto loginDto);

    /** 로그아웃 */
    boolean staffLogout(int loginNumber);

}
