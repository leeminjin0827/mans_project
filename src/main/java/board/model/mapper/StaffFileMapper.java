package board.model.mapper;

import board.model.dto.StaffDto;
import org.apache.ibatis.annotations.*;

@Mapper
public interface StaffFileMapper {

    /** 파일 업로드 */
    @Update("update staff set my_photo = #{myPhoto} where staff_number = #{staffNumber}")
    boolean uploadPhoto(StaffDto staffDto);

    /** 파일 경로 찾기 */
    @Select("select my_photo from staff where staff_number = #{staffNumber}")
    @Results({
            @Result(property = "myPhoto", column = "my_photo")
    })
    String getFilePath(@Param("staffNumber") int staffNumber);

}
