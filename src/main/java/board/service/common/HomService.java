package board.service.common;

import board.model.dto.staff.StaffDto;
import board.model.mapper.common.HomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class HomService {

    private final HomMapper homMapper;

    public ArrayList<StaffDto> staffone(int hno) {
        ArrayList<StaffDto> result = homMapper.staffone(hno);
        return result;
    }
}
