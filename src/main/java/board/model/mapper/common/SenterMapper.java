package board.model.mapper.common;

import board.model.dto.common.SenterDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SenterMapper {

    // 문의등록 SQL
    @Insert( " insert into senter( senter_name , senter_phone , senter_title , senter_content ) values( #{senterName} , #{senterPhone} , #{senterTitle} , #{senterContent} ) " )
    boolean sWrite( SenterDto senterDto );

    // 문의전체조회 SQL
    @Select( " select * from senter " )
    @Results({
            @Result(property = "senterName" , column = "senter_name" ), // DB의 user_number -> DTO의 userNumber 매핑
            @Result(property = "senterPhone" , column = "senter_phone" ),
            @Result(property = "senterTitle" , column = "senter_title" ),
            @Result(property = "senterContent" , column = "senter_content" )
    })
    List<SenterDto> sFindAll();

    // 문의개별조회 SQL
    @Select( " select * from senter where sno = #{sno} ")
    @Results({
            @Result(property = "senterName" , column = "senter_name" ),
            @Result(property = "senterPhone" , column = "senter_phone" ),
            @Result(property = "senterTitle" , column = "senter_title" ),
            @Result(property = "senterContent" , column = "senter_content" )
    })
    SenterDto sView( int sno );

    // 문의 수정 SQL
    @Update( " update senter set senter_title = #{senterTitle} , senter_content = #{senterContent} where sno = #{sno} " )
    boolean sUpdate( SenterDto senterDto );

    // 문의 삭제 SQL
    @Delete( " delete from senter where sno = #{sno} " )
    boolean sDelete( int sno );
} // i end
