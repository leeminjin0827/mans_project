-- 직원
insert into staff(id, name, phone, address, start_date, staff_rank, salary, hno) values
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

-- 지점
insert into operate(address, hotel_number, intro, state) values( '강남구 선릉로85길 6' ,  '02-234-6576', '안녕하세요~~ 우리는 ~~~ 입니다~~~' , '0'  );
-- 서울 호텔 샘플 데이터
insert into operate(address, hotel_number, intro, state) values( '서울특별시 중구 세종대로 99' , '02-1234-5678', '깔끔하고 아름다운~~~', '0'  );
-- 인천 부평 호텔 샘플 데이터
insert into operate(address,hotel_number, intro, state) values( '인천광역시 부평구 부평대로 15' , '032-987-6543', '역근처의 교통의 편함과~~', '0' );
-- 지점

--
insert into user(id, password, name, phone, address) values
("admin", "admin123", "관리자", "010-0000-0000", "서울특별시 종로구"),
("qwe123", "q123456", "유재석", "010-1111-1111", "인천광역시 부평구"),
("asd123", "w123456", "강호동", "010-2222-2222", "인천광역시 부평구"),
("zxc123", "e123456", "신동엽", "010-3333-3333", "인천광역시 부평구"),
("rty123", "r123456", "서장훈", "010-4444-4444", "인천광역시 부평구"),
("fgh123", "t123456", "김종민", "010-5555-5555", "인천광역시 부평구");
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
-- 옵션 샘플

-- 객실등급 샘플
INSERT INTO rating (rating_name, bed_count, bed_type, rating_option) VALUES
('스탠다드', 1, '싱글', '1,2,3,4,5,6,7,8'),
('슈페리어', 1, '더블', '1,2,3,4,5,6,7,8'),
('디럭스', 1, '킹', '1,2,3,4,5,6,7,8,9,10'),
('트윈', 2, '싱글 2개', '1,2,3,4,5,6,7,8'),
('패밀리', 2, '퀸 1개 + 싱글 2개', '1,2,3,4,5,6,7,8,9,10'),
('프리미어', 1, '킹', '1,2,3,4,5,6,7,8,9,10'),
('주니어 스위트', 1, '퀸', '1,2,3,4,5,6,7,8,9,10'),
('스위트', 2, '킹 1개 + 싱글 1개', '1,2,3,4,5,6,7,8,9,10'),
('로얄 스위트', 2, '킹 2개', '1,2,3,4,5,6,7,8,9,10');
-- 객실등급 샘플

-- 객실 샘플
insert into room(rno , opno ) values
( 1 , 1 ), ( 2 , 1 ), ( 3 , 2 ), ( 1 , 1 ), ( 1 , 1 );
-- 객실 샘플

-- select * from board;
-- select * from senter;
select * from user;
select * from options;
select * from rating;
select * from room;
select * from operate;
select * from staff;
select * from commute;