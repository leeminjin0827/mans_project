package board.model.mapper;

import board.model.dto.ReserVationDetailDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;


import java.util.List;

@Mapper
public interface ReserVationDetailMapper {

    @Insert("select price, payment_date, detail_state, reno from reservationdetail where rvno = #{rvno}")
    public List<ReserVationDetailDto> detailFin();


}
