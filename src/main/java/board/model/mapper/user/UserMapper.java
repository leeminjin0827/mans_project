package board.model.mapper.user;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {

    @Select("SELECT r.rono, r.rname, r.rfiles " +
            " FROM room r" +
            " LEFT JOIN reservation res ON r.rono = res.rono" +
            " AND (" +
            "   (res.resstart < #{checkoutDate} AND res.resend > #{checkinDate})" + // 예약 날짜가 체크인/체크아웃 날짜와 겹치는지 확인
            " )" +
            " WHERE r.hno = #{hno} AND r.rno = #{rno}" +
            " AND res.reno IS NULL" // 예약되지 않은 객실만 선택
    )
    List<Map<String, Object>> findAvailableRooms(Map<String, Object> reqMap);

    @Select("select hname from operate where hno = #{hno} ")
    String findHotelName(int hno);


    @Select("select rating_name from rating where rno = #{rno} ")
    String findRatingName(int rno);

    // 예약 데이터 삽입
    @Insert("insert into reservation (resname, resphone, resstart, resend, rono) values " +
            "( #{name} , #{phoneNumber} , #{checkinDate}, #{checkoutDate}, #{rono} )")
    @Options(useGeneratedKeys = true, keyProperty = "reno", keyColumn = "reno")
    int insertReservation(Map<String, Object> reservationData);

    @Insert("select price from rating where rno = #{ rno }")
    int findRoomPrice(int rno);

    // 예약 상세 정보 삽입
    @Insert("INSERT INTO reservationdetail (price, payment_date, detail_state, reno) " +
            "VALUES (#{price}, #{payment_date}, #{detail_state}, #{reno})")
    int insertReservationDetail(Map<String, Object> reservationDetailData);

}