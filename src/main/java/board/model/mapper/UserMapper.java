package board.model.mapper;

import board.model.dto.UserDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    
    /** 회원가입 */
    @Insert("insert into user(id, password, name, phone, address) " +
            "values(#{id}, #{password}, #{name}, #{phone}, #{address})")
    @Results({
            @Result(property = "userNumber", column = "user_number"),
            @Result(property = "adminState", column = "admin_state"),
            @Result(property = "joinDate", column = "join_date"),
            @Result(property = "dropState", column = "drop_state")
    })
    boolean _signup(UserDto userDto);

    /** 로그인 */
    @Select("select * from user")
    @Results({
            @Result(property = "userNumber", column = "user_number"),
            @Result(property = "adminState", column = "admin_state"),
            @Result(property = "joinDate", column = "join_date"),
            @Result(property = "dropState", column = "drop_state")
    })
    List<UserDto> _login();
    
}
