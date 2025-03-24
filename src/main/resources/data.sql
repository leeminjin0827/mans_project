-- 지점
-- 서울 호텔 샘플 데이터
insert into operate(address, hotel_number, intro, state , mimg) values( '강남구 선릉로85길 6' ,  '02-234-6576', '안녕하세요~~ 우리는 ~~~ 입니다~~~' , '0' ,'default.jpg' );
-- 서울 호텔 샘플 데이터
insert into operate(address, hotel_number, intro, state, mimg) values( '서울특별시 중구 세종대로 99' , '02-1234-5678', '깔끔하고 아름다운~~~', '0', 'default2.jpg' );
-- 인천 부평 호텔 샘플 데이터
insert into operate(address,hotel_number, intro, state, mimg) values( '인천광역시 부평구 부평대로 15' , '032-987-6543', '역근처의 교통의 편함과~~', '0','default3.jpg' );
-- 지점

-- 1강남점 /2중구점 /3부평점

--
--insert into user(id, password, name, phone, address) values
--("admin", "admin123", "관리자", "010-0000-0000", "서울특별시 종로구"),
--("qwe123", "q123456", "유재석", "010-1111-1111", "인천광역시 부평구"),
--("asd123", "w123456", "강호동", "010-2222-2222", "인천광역시 부평구"),
--("zxc123", "e123456", "신동엽", "010-3333-3333", "인천광역시 부평구"),
--("rty123", "r123456", "서장훈", "010-4444-4444", "인천광역시 부평구"),
--("fgh123", "t123456", "김종민", "010-5555-5555", "인천광역시 부평구");
--

-- 고객센터 샘플
-- insert into senter ( stitle , scontent , user_number ) values
-- ( "불편합니다" ,  "불편함" , 1 ),
-- ( "불편합니다" ,  "불편함" , 1 ),
-- ( "불편합니다" ,  "불편함" , 1 ),
-- ( "불편합니다" ,  "불편함" , 1 ),
-- ( "불편합니다" ,  "불편함" , 1 );
-- 고객센터 샘플

-- 게시판 샘플
-- insert into board(title, content) values('그림' , '이름');
-- 게시판 샘플

-- 옵션 샘플
insert into options( op_name ) values
('와이파이'),('OTT'),('PC'),('에어컨'),('욕실용품'),
('드라이기'),('피트니스'),('커피머신'),('발코니'),('브런치(이용권)');


-- 객실등급 샘플
INSERT INTO rating (rating_name, bed_count, bed_type) VALUES
('스탠다드', 1, '싱글'),
('슈페리어', 1, '더블'),
('디럭스', 2, '싱글 1개 , 더블 1개'),
('패밀리', 2, '퀸 1개 + 싱글 1개');

insert into room_options (rno, opno) values
-- (스탠다드)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
-- (슈페리어)
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8),
-- (디럭스) 추가 옵션 9
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9),
-- (패밀리) 추가 옵션 9, 10
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10);

-- 직원
insert into staff(id, name, phone, address1, start_date, staff_rank, salary, hno) values
("hotels1958", "김민준", "010-1947-5823", "서울 강남구", "2020-02-10", 0, 4300, 1),
("hotels3691", "이서준", "010-3658-9172", "서울 강남구", "2020-02-10", 1, 3900, 1),
("hotels7243", "김도윤", "010-7281-4396", "서울 강남구", "2020-02-10", 2, 2800, 1),
("hotels8561", "서우진", "010-8539-6174", "서울 강남구", "2020-02-10", 2, 3600, 1),
("hotels2493", "김하윤", "010-2417-9368", "서울 강남구", "2020-02-10", 2, 3700, 1),
("hotels6713", "이지안", "010-6792-1348", "서울 강남구", "2020-02-10", 2, 2900, 1),
("hotels4875", "김서연", "010-4823-7591", "서울 강남구", "2020-02-10", 2, 3300, 1),
("hotels9368", "박지호", "010-9317-6825", "서울 중구", "2022-06-06", 1, 4200, 2),
("hotels5231", "최서현", "010-5284-3167", "서울 중구", "2022-06-06", 2, 2700, 2),
("hotels8143", "정우진", "010-8162-4379", "서울 중구", "2022-06-06", 2, 3400, 2),
("hotels3795", "강하늘", "010-3746-9528", "서울 중구", "2022-06-06", 2, 3800, 2),
("hotels6972", "박서윤", "010-6941-7253", "서울 중구", "2022-06-06", 2, 2900, 2),
("hotels8413", "윤서준", "010-8472-1395", "서울 중구", "2022-06-06", 2, 3700, 2),
("hotels2347", "한지민", "010-2358-4791", "인천 부평구", "2024-01-08", 1, 4200, 3),
("hotels7582", "오예린", "010-7593-8264", "인천 부평구", "2024-01-08", 1, 4200, 3),
("hotels9167", "신우석", "010-9142-6738", "인천 부평구", "2024-01-08", 2, 3700, 3),
("hotels6284", "조윤아", "010-6273-8495", "인천 부평구", "2024-01-08", 2, 2900, 3),
("hotels5894", "문지후", "010-5831-9472", "인천 부평구", "2024-01-08", 2, 3200, 3),
("hotels7631", "배수진", "010-7629-3148", "인천 부평구", "2024-01-08", 2, 3500, 3),
("hotels8457", "황도현", "010-8493-5726", "인천 부평구", "2024-01-08", 2, 3600, 3);

update staff set end_date = "2025-02-05", resignation = 1 where staff_number = 4;
update staff set end_date = "2025-03-07", resignation = 1 where staff_number = 14;

insert into room ( rname , rno , hno , staff_number ) values
-- 기존 샘플
    -- 강남
    ("101호",1,1,3),("102호",1,1,5),("103호",1,1,7),("104호",1,1,4),("105호",1,1,5),("201호",1,1,3),("202호",1,1,4),("203호",1,1,5),("204호",2,1,5),("205호",2,1,6),
    ("301호",2,1,3),("302호",2,1,5),("303호",2,1,7),("304호",2,1,4),("305호",3,1,6),("401호",3,1,6),("402호",3,1,3),("403호",3,1,7),("404호",4,1,1),("405호",4,1,2),
    -- 중구
    ("101호",1,2,9),("102호",1,2,11),("103호",1,2,13),("104호",1,2,12),("105호",1,2,13),("201호",1,2,10),("202호",1,2,13),("203호",1,2,12),("204호",2,2,13),("205호",2,2,11),
    ("301호",2,2,13),("302호",2,2,10),("303호",2,2,9),("304호",2,2,12),("305호",3,2,9),("401호",3,2,10),("402호",3,2,11),("403호",3,2,10),("404호",4,2,9),("405호",4,2,12),
    -- 부평
    ("101호",1,3,16),("102호",1,3,16),("103호",1,3,19),("104호",1,3,16),("105호",1,3,19),("201호",1,3,17),("202호",1,3,18),("203호",1,3,19),("204호",2,3,17),("205호",2,3,18),
    ("301호",2,3,20),("302호",2,3,18),("303호",2,3,20),("304호",2,3,18),("305호",3,3,20),("401호",3,3,16),("402호",3,3,16),("403호",3,3,17),("404호",4,3,20),("405호",4,3,20);


-- 직원

-- 출퇴근
insert into commute(now_date, now_start, now_end, staff_number) values
("2025-03-08", "9:00:00", "18:00:00", 1),
("2025-03-08", "9:00:00", "18:00:00", 2),
("2025-03-08", "9:00:00", "18:00:00", 3),
("2025-03-08", "9:00:00", "18:00:00", 4),
("2025-03-08", "9:00:00", "18:00:00", 5),
("2025-03-08", "9:00:00", "18:00:00", 6),
("2025-03-08", "9:00:00", "18:00:00", 7),
("2025-03-08", "9:00:00", "18:00:00", 8),
("2025-03-08", "9:00:00", "18:00:00", 9),
("2025-03-08", "9:00:00", "18:00:00", 10),
("2025-03-08", "11:00:00", "20:00:00", 11),
("2025-03-08", "11:00:00", "20:00:00", 12),
("2025-03-08", "11:00:00", "20:00:00", 13),
("2025-03-08", "11:00:00", "20:00:00", 14),
("2025-03-08", "11:00:00", "20:00:00", 15),
("2025-03-08", "11:00:00", "20:00:00", 16),
("2025-03-08", "11:00:00", "20:00:00", 17),
("2025-03-08", "11:00:00", "20:00:00", 18),
("2025-03-08", "11:00:00", "20:00:00", 19),
("2025-03-08", "11:00:00", "20:00:00", 20);
-- 출퇴근

-- 예약 내역
insert into reservation (resname, resphone, resstart, resend, rono) values
('김민수', '010-1234-5678', '2025-01-01', '2025-01-03', 42),
('이서연', '010-2345-6789', '2025-01-04', '2025-01-06', 17),
('박지훈', '010-3456-7890', '2025-01-07', '2025-01-10', 58),
('최유진', '010-4567-8901', '2025-01-10', '2025-01-13', 6),
('정현우', '010-5678-9012', '2025-01-13', '2025-01-16', 31),
('한예림', '010-6789-0123', '2025-01-16', '2025-01-19', 12),
('오지호', '010-7890-1234', '2025-01-19', '2025-01-22', 45),
('강민석', '010-8901-2345', '2025-01-22', '2025-01-25', 23),
('윤다은', '010-9012-3456', '2025-01-25', '2025-01-28', 50),
('조성빈', '010-1230-4567', '2025-01-28', '2025-01-31', 4),
('배수정', '010-2340-5678', '2025-02-01', '2025-02-04', 36),
('권지후', '010-3450-6789', '2025-02-04', '2025-02-07', 21),
('신유나', '010-4560-7890', '2025-02-07', '2025-02-10', 9),
('조하윤', '010-5670-8901', '2025-02-10', '2025-02-13', 53),
('임도현', '010-6780-9012', '2025-02-13', '2025-02-16', 19),
('문지훈', '010-7890-0123', '2025-02-16', '2025-02-19', 30),
('서하은', '010-8900-1234', '2025-02-19', '2025-02-22', 8),
('이강민', '010-9010-2345', '2025-02-22', '2025-02-25', 56),
('전혜린', '010-1231-3456', '2025-02-25', '2025-02-28', 14),
('홍승우', '010-2341-4567', '2025-02-28', '2025-03-02', 39),
('고예진', '010-3451-5678', '2025-03-02', '2025-03-05', 2),
('나도윤', '010-4561-6789', '2025-03-05', '2025-03-08', 48),
('박서준', '010-5671-7890', '2025-03-08', '2025-03-11', 33),
('배연우', '010-6781-8901', '2025-03-11', '2025-03-14', 27),
('유민지', '010-7891-9012', '2025-03-14', '2025-03-17', 57),
('정우성', '010-8901-0123', '2025-03-17', '2025-03-20', 11),
('차윤서', '010-9011-1234', '2025-03-20', '2025-03-23', 22),
('황도훈', '010-1232-2345', '2025-03-23', '2025-03-26', 41),
('김예린', '010-2342-3456', '2025-03-26', '2025-03-29', 5),
('서준호', '010-3452-4567', '2025-03-29', '2025-03-31', 29);
update reservation set resstart = "2025-03-24", resend = "2025-03-26" where reno = 4;
update reservation set resstart = "2025-03-24", resend = "2025-03-26" where reno = 11;
update reservation set resstart = "2025-03-24", resend = "2025-03-26" where reno = 14;
-- 예약 내역

-- select * from board;
-- select * from senter;
--select * from user;
select * from options;
select * from rating;
select * from room;
select * from operate;
select * from staff;
select * from commute;