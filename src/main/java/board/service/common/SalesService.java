package board.service.common;

import board.model.dto.common.ReserVationDetailDto;
import board.model.mapper.common.ReserVationDetailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SalesService {

    // 프로젝트 최상위 폴더 경로 반환
    String baseDir = System.getProperty("user.dir");
    // 다운로드 할 폴더 경로
    String uploadPath = baseDir + "/build/resources/main/static/sales/";

    private final ReserVationDetailMapper rvMapper;
    int count = 1;

    @Scheduled(cron = "0 0 */1 * * * ")
    public void test() {
        DecimalFormat df = new DecimalFormat("###,###");
        String fileName = "매출.txt";
        String uuid = UUID.randomUUID().toString();
        String filePath = uploadPath + uuid + "_" + fileName;
        File file = new File(filePath);
        System.out.println("file.isFile() = " + file.isFile());
         String content = "매월 = 총매출액\n";
        // 지점별 매출액 가져오기
        List<ReserVationDetailDto> result = rvMapper.detailFin();
        System.out.println("result = " + result);
        for(int index = 0; index < result.size(); index++) {
            ReserVationDetailDto temp = result.get(index);
            content += temp.getFULLPRICE() + " = " + df.format(temp.getMonthprice()) + "원\n";
        }
        System.out.println(content);
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
            writer.write(content);
            writer.flush();
            writer.close();
        } catch(IOException e) {
            System.out.println(e);
        }


    }

}
