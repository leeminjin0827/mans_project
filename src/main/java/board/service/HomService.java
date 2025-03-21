package board.service;

import board.model.dto.StaffDto;
import board.model.mapper.HomMapper;
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
