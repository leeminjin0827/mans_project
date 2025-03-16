package board.model.mapper.room;

import board.model.dto.room.RoomOptionDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomOptionMapper {

    // 등급 옵션 목록 추가 SQL
    // 예 : rno 등급에 opno 옵션을 추가
    @Insert(" insert ignore into room_options(rno, opno) values ( #{rno}, #{opno} ) ")
    boolean rOptionWrite( RoomOptionDto roomOptionDto );

    // 등급 옵션 목록 전체조회 SQL
    @Select(" select * from room_options ro" +
            " join rating rt on ro.rno = rt.rno" +
            " join options o on ro.opno = o.opno" +
            " order by ro.rno ASC")
    @Results({
            @Result(property = "rno", column = "rno"),
            @Result(property = "opno", column = "opno"),
            @Result(property = "ratingName", column = "rating_name"),
            @Result(property = "bedCount", column = "bed_count"),
            @Result(property = "bedType", column = "bed_type"),
            @Result(property = "opName", column = "op_name")
    })
    List<RoomOptionDto> rOptionList();

    // 등급 옵션 목록 삭제 SQL
    @Delete(" delete from room_options where rno = #{rno} and opno = #{opno} ")
    boolean rOptionDelete(int rno , int opno );

} // i end
