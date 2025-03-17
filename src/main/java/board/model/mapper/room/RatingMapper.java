package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RatingDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RatingMapper {

    // 객실등급 등록 SQL
    @Insert(" insert into rating( rating_name , bed_count , bed_type ) values ( #{ratingName} , #{bedCount} , #{bedType} ) " )
    boolean ratingWrite(RatingDto ratingDto );

    // 객실등급 전체조회 SQL
    @Select( " select * from rating " )
    @Results({
            @Result(property = "ratingName" , column = "rating_name" ),
            @Result(property = "bedCount" , column = "bed_count" ),
            @Result(property = "bedType" , column = "bed_type" ),
    })
    List<RatingDto> ratingList();

    // 객실등급 수정 SQL
    @Update(" update rating set rating_name = #{ratingName} , bed_count = #{bedCount} , bed_type = #{bedType} where rno = #{rno} ")
    boolean ratingUpdate(RatingDto ratingDto );

    // 객실등급 삭제 SQL
    @Delete(" delete from rating where rno = #{rno} " )
    boolean ratingDelete( int rno );

} // i end