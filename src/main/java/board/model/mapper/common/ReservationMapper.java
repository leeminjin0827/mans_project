package board.model.mapper.common;

import board.model.dto.common.ReservationCheckDto;
import board.model.dto.oper.OperateDto;
import board.model.dto.common.ReservationDto;
import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReservationMapper {

    // 객실 예약
    @Insert("insert into reservation( resname , resphone , resstart , resend , rono )" +
            " values ( #{resname} , #{resphone} , #{resstart} , #{resend} , #{rono} )")
    boolean reservationWrite( Map<String,Object > reservationDto );

    // 지점 , 객실 등급으로 객실 리스트 조회
    @Select("select * from room where hno = #{hno} and rno = #{rno}")
    List<RoomDto> reservationList( @Param("hno") int hno , @Param("rno") int rno );

    // 중복 예약 체크
    @Select("select * from reservation where hno = #{hno} and rno = #{rno} and " +
            " ((resstart <= #{resend} and resend >= #{resstart}))")
    List<ReservationDto>reservationCheck(@Param("hno") int hno , @Param("rno") int rno , @Param("resstart") String resstart , @Param("resend") String resend );

    // 사용자 예약 내역 조회
    @Select("select * from reservation where resname = #{resname} and resphone = #{resphone}")
    List<ReservationDto> reservationView( String resname , String resphone );


    /** 지점별 예약 내역 조회 (소켓) */
    /*
    @Select("select re.*, ro.* from reservation as re " +
            "inner join room as ro " +
            "on re.rono = ro.rono " +
            "where hno = #{hno}")
     */
    @Select("select re.*, r.rvno, r.price, r.payment_date, r.detail_state, ro.* from reservation as re " +
            "inner join reservationdetail as r on re.reno = r.reno " +
            "inner join room as ro on re.rono = ro.rono " +
            "where ro.hno = #{hno} and detail_state = '정상';")
    List<ReservationDto> reservationFind(@Param("hno") int hno, @Param("date") String date);

    /** 지점별 객실 조회 (소켓) */
    @Select("select * from room where hno = #{hno}")
    List<RoomDto> findHnoRoom(@Param("hno") int hno);

    /** 지점 번호 조회 (소켓) */
    @Select("select hno, hname from operate where state = #{state}")
    List<OperateDto> findHno(@Param("state") int state);

    /** 예약 수정 (REST API) */
    @Update("update reservation set " +
            "resname = #{resname}, resphone = #{resphone}, resstart = #{resstart}, resend = #{resend}, rono = #{rono} " +
            "where reno = #{reno}")
    boolean updateReservation(ReservationDto reservationDto);

    /** 예약 삭제/취소 (REST API) */
    // @Delete("delete from reservation where reno = #{reno}")
    @Delete("update reservationdetail set detail_state = '취소' where reno = #{reno};")
    boolean deleteReservation(@Param("reno") int reno);

}
