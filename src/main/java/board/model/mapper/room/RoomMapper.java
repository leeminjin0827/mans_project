package board.model.mapper.room;

import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomMapper {

    // 객실 등록 SQL
    @Insert(" insert into room(rname,rno,hno,staff_number) " +
            "values ( #{rname} , #{rno} , #{hno} , #{staffNumber} ) ")
    @Options(useGeneratedKeys = true , keyProperty = "rono") // 자동생성된 rono값을 roomDto에 바로 반영
    boolean roomWrite(RoomDto roomDto);

    // 사진 등록 SQL
    @Insert(" insert into picture( pnoname , rono )values( #{filename} , #{rono} ) ")
    boolean pictureSave ( @Param("rono") int rono , @Param("filename") String filename );

    // 객실 전체조회 SQL
    @Select(" select r.rono, r.rname, r.rno, r.hno, r.staff_number, rt.rating_name, rt.bed_count, rt.bed_type, sno.name, o.op_name from room r " +
            "join rating rt on r.rno = rt.rno " +
            "join operate ope on r.hno = ope.hno " +
            "join staff sno on r.staff_number = sno.staff_number " +
            "join room_options ro on r.rno = ro.rno " +
            "join options o on ro.opno = o.opno " +
            "left join picture p on r.rono = p.rono " +
            "order by r.rono ASC")
    @Results({
            @Result(property = "rono", column = "rono"),
            @Result(property = "rno", column = "rno"),
            @Result(property = "hno", column = "hno"),
            @Result(property = "staffNumber", column = "staff_number"),
            @Result(property = "rimg", column = "rimg"),
            @Result(property = "ratingName", column = "rating_name"),
            @Result(property = "bedCount", column = "bed_count"),
            @Result(property = "bedType", column = "bed_type"),
            @Result(property = "opName", column = "op_name"),
            @Result(property = "rimg", column = "filename" , javaType = List.class, many = @Many(select = "selectRoomImages"))
    })
    List<RoomDto> roomList();

    // 사진 조회 SQL
    @Select("select filename from picture where rono = #{rono}")
    List<String> selectRoomImg( int rono );

    // 객실 수정 SQL
    @Update(" update room set rname = #{rname} , rno = #{rno} , staff_number = #{staffNumber} where rono = #{rono} ")
    boolean roomUpdate(RoomDto roomDto);

    // 객실 삭제 SQL
    @Delete(" delete from room where rono = #{rono} ")
    boolean roomDelete(int rono);

} // i end
