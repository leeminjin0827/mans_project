package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public interface OptionMapper {

    // 옵션 등록 SQL
    @Insert(" insert into options( op_name ) values ( #{opName} ) " )
    boolean optionWrite(OptionDto optionDto );

    // 옵션 전체조회 SQL
    @Select( " select * from options " )
    @Results({
            @Result(property = "opName" , column = "op_name" )
    })
    List<OptionDto> optionList();

    // 옵션 수정 SQL
    @Update(" update options set op_name = #{opName} where opno = #{opno} ")
    boolean optionUpdate(OptionDto optionDto );

    // 옵션 삭제 SQL
    @Delete(" delete from options where opno = #{opno} " )
    boolean optionDelete( int opno );

} // i end
