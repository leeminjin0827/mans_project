package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomMapper {

    // 옵션 등록 SQL
    @Insert(" insert into room( rno , opno ) values ( #{rno} , #{opno} ) " )
    boolean roomWrite(RoomDto RoomDto );

    // 옵션 전체조회 SQL
    @Select( " select * from room " )
    List<RoomDto> roomList();

    // 옵션 수정 SQL
    @Update(" update room set rno = #{rno} , opno = #{opno} where rono = #{rono} ")
    boolean roomUpdate(RoomDto RoomDto );

    // 옵션 삭제 SQL
    @Delete(" delete from room where rono = #{rono} " )
    boolean roomDelete( int rono );

} // i end
