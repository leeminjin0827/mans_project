package board.model.mapper.room;

import board.model.dto.room.RoomOptionDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomOptionMapper {

    // 등급 옵션 목록 추가 SQL
    @Insert(" insert into room_options(rno, opno) values ( #{rno}, #{opno} ) ")
    boolean rOptionWrite(@Param("rno") int rno, @Param("opno") int opno);

    // 등급 옵션 목록 전체조회 SQL
    @Select(" select r.rono, r.rno, rt.rating_name, rt.bed_count, rt.bed_type, o.op_name from room r " +
            "join rating rt on r.rno = rt.rno " +
            "join room_options ro on r.rono = ro.rono " +
            "join options o on ro.opno = o.opno " +
            "order by r.rno ASC")
    @Results({
            @Result(property = "rono", column = "rono"),
            @Result(property = "rno", column = "rno"),
            @Result(property = "ratingName", column = "rating_name"),
            @Result(property = "bedCount", column = "bed_count"),
            @Result(property = "bedType", column = "bed_type"),
            @Result(property = "opName", column = "op_name")
    })
    List<RoomOptionDto> rOptionList();

    // 등급 옵션 목록 수정 SQL

    // 등급 옵션 목록 삭제 SQL
    @Delete(" delete from room_options where rono = #{rono} ")
    boolean rOptionDelete(int rono);

} // i end
