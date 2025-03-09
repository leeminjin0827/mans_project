package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RatingDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RatingMapper {

    // 옵션 등록 SQL
    @Insert(" insert into rating( rating_name , bed_count , bed_type , rating_option ) values ( #{ratingName} , #{bedCount} , #{bedType} , #{ratingOption} ) " )
    boolean ratingWrite(RatingDto ratingDto );

    // 옵션 전체조회 SQL
    @Select( " select * from rating " )
    @Results({
            @Result(property = "ratingName" , column = "rating_name" ),
            @Result(property = "bedCount" , column = "bed_count" ),
            @Result(property = "bedType" , column = "bed_type" ),
            @Result(property = "ratingOption" , column = "rating_option" )
    })
    List<RatingDto> ratingList();

    // 옵션 수정 SQL
    @Update(" update rating set rating_name = #{ratingName} , bed_count = #{bedCount} , bed_type = #{bedType} , rating_option = #{ratingOption} where rno = #{rno} ")
    boolean ratingUpdate(RatingDto ratingDto );

    // 옵션 삭제 SQL
    @Delete(" delete from rating where rno = #{rno} " )
    boolean ratingDelete( int rno );

} // i end