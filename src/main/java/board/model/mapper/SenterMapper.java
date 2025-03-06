package board.model.mapper;

import board.model.dto.SenterDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SenterMapper {

    // 문의등록 SQL
    @Insert( " insert into senter( stitle , scontent , spassword , suser ) values( #{stitle} , #{scontent} , #{spassword} , #{suser} ) " )
    boolean sWrite( SenterDto senterDto );

    // 문의전체조회 SQL
    @Select( " select * from senter " )
    List<SenterDto> sFindAll();

    // 문의개별조회 SQL
    @Select( " select * from senter where sno = #{sno} ")
    SenterDto sView( int sno );

    // 문의 수정 SQL
    @Update( " update senter set stitle = #{stitle} , scontent = #{scontent} , suser = #{suser} where sno = #{sno} " )
    boolean sUpdate( SenterDto senterDto );

    // 문의 삭제 SQL
    @Delete( " delete from senter where sno = #{sno} " )
    boolean sDelete( int sno );
} // i end
