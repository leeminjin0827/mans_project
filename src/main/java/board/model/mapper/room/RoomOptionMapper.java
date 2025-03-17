package board.model.mapper.room;

import board.model.dto.room.RoomOptionDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomOptionMapper {

    // 객실별 옵션 목록 그 자체 추가 SQL
    @Insert(" insert ignore into room_options(rno, opno) values ( #{rno}, #{opno} ) ")
    boolean rOptionWrite( RoomOptionDto roomOptionDto );

    // 등급 옵션 목록 전체조회 SQL
    @Select("SELECT rop.ropno, rop.rno, rop.opno, rt.rating_name, rt.bed_count, rt.bed_type, o.op_name " +
            "FROM room_options rop " +
            "JOIN rating rt ON rop.rno = rt.rno " +
            "JOIN options o ON rop.opno = o.opno " +
            "ORDER BY rop.rno ASC")
    @Results({
            @Result(property = "ropno", column = "ropno"),
            @Result(property = "rno", column = "rno"),
            @Result(property = "opno", column = "opno"),
            @Result(property = "ratingName", column = "rating_name"),
            @Result(property = "bedCount", column = "bed_count"),
            @Result(property = "bedType", column = "bed_type"),
            @Result(property = "opName", column = "op_name")
    })
    List<RoomOptionDto> rOptionList();

    // 객실별 옵션 등록 SQL
    @Update(" update room_options set opno = #{opno} where rno = #{rno} ")
    boolean rOptionUpdate( RoomOptionDto roomOptionDto );

    // 객실별 옵션 목록 삭제 SQL
    @Delete(" delete from room_options where rno = #{rno}")
    boolean rOptionListDelete( int rno );

    // 객실별 옵션 목록 옵션 삭제 SQL
    @Delete(" delete from room_options where ropno = #{ropno} and opno = #{opno} ")
    boolean rOptionDelete(int rno , int opno );
    
    // 객실별 옵션 목록 그 자체 삭제


} // i end
