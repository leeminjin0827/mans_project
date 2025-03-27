package board.service.common;

import board.model.mapper.common.ReserVationDetailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SalesService {

    // 프로젝트 최상위 폴더 경로 반환
    String baseDir = System.getProperty("user.dir");
    // 다운로드 할 폴더 경로
    String uploadPath = baseDir + "/build/resources/main/static/sales/";

    private final ReserVationDetailMapper rvMapper;

    @Scheduled(cron = "* */1 * * * * ")
    public void test() {

        // 지점별 매출액 가져오기


    }

}
