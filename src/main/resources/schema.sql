drop database if exists man;
create database man;
use man;

-- create table user (
--    --사용자 번호
--    user_number int unsigned auto_increment,
--    -- 사용자 아이디
--	id varchar(30) not null unique,
--	-- 사용자 비밀번호
--	password varchar(30) not null,
--	-- 사용자 이름
--	name varchar(15) not null,
--	-- 사용자 전화번호
--	phone varchar(13),
--	-- 사용자 주소
--	address text,
--	-- 관리자 상태 0이면 일반 사용자, 1이면 관리자
--	admin_state int unsigned default 0,
--	-- 가입 날짜
--	join_date datetime default now(),
--	-- 회원탈퇴 상태 0이면 탈퇴 1이면 미탈퇴
--	drop_state int unsigned default 0,
--	constraint primary key(user_number)
-- );

-- 고객센터 테이블
-- create table senter(
--    -- 문의번호(PK)
--    sno int unsigned auto_increment ,
--     -- 문의제목
--    stitle varchar(30) not null ,
--     -- 문의내용
--     scontent longtext not null ,
--     -- 사용자번호(FK)
--     user_number int unsigned not null ,
--     constraint primary key(sno) ,
--     constraint foreign key(user_number) references user(user_number)
-- );

-- 게시판테이블
-- create table board(
--    bno int auto_increment,
--     title varchar(20) not null,
--     content longtext,
--     writer varchar(10),
--     view int default 0,
--     date datetime default now(),
--
--     primary key(bno)
-- );

-- 옵션테이블
create table options(
   -- 옵션번호
    opno int unsigned auto_increment ,
    -- 옵션명
    op_name varchar(255) not null ,
    constraint primary key(opno)
);

-- 객실등급 테이블
create table rating(
    -- 객실등급번호
    rno int unsigned auto_increment,
    -- 객실등급
    rating_name varchar(30) not null,
    -- 침대수
    bed_count int not null,
    -- 침대유형
    bed_type varchar(30) not null,
    -- 등급 금액
    price int not null,
    -- 제공옵션
    constraint primary key(rno)
);

-- 객실별 옵션 관리 테이블
create table room_options (
    -- 객실별 옵션 관리 번호
    ropno int unsigned auto_increment,
    -- 객실등급번호
    rno int unsigned ,
    -- 옵션번호
    opno int unsigned ,
    constraint primary key(ropno),
    foreign key(rno) references rating(rno) on update cascade on delete cascade,
    foreign key(opno) references options(opno) on update cascade on delete cascade
);

create table operate(
    hno int unsigned auto_increment,
    hname varchar(10) not null,
    address char(50),
    hotel_number char(12),
    intro longtext,
    state int default 0,
    mimg varchar(255) not null,
    -- 호텔 사진 이미지
    constraint primary key(hno)
);

create table staff (
	staff_number int unsigned auto_increment,
    id varchar(30) not null unique,
    password varchar(30) not null default "1234",
    name varchar(15) not null,
    phone varchar(13) not null,
    address1 varchar(100) not null,
    address2 varchar(100),
    address3 varchar(100),
    start_date date not null,
    end_date date default null,
    staff_rank int unsigned default 2,
    salary int not null,
    resignation int default 0,
    hno int unsigned default 0,
    my_photo varchar(255) not null default "default.jpg",
    constraint primary key(staff_number),
    constraint foreign key(hno) references operate(hno)
);

-- 객실 테이블
create table room(
    -- 객실번호
    rono int unsigned auto_increment,
    -- 호실
    rname varchar(5) not null ,
    -- 객실등급번호
    rno int unsigned ,
    -- 호텔번호
    hno int unsigned ,
    -- 직원번호
    staff_number int unsigned ,
    -- 회원 번호 추가 해야함 --
    constraint primary key(rono),
    foreign key(rno) references rating(rno) on update cascade on delete cascade,
    foreign key(hno) references operate(hno) on update cascade on delete cascade,
    foreign key(staff_number) references staff(staff_number)
);

create table commute (
	commute_number int unsigned auto_increment,
    now_date date not null,
    now_start time not null,
    now_end time default null,
    staff_number int unsigned not null,
    constraint primary key(commute_number),
    constraint foreign key(staff_number) references staff(staff_number)
);
-- 예약 테이블
create table reservation(
    -- 예약번호
    reno int unsigned auto_increment,
    -- 예약자 이름
    resname varchar(20) not null ,
    -- 예약자 전화번호
    resphone varchar(13) not null ,
    -- 입실날짜
    resstart date not null ,
    -- 퇴실날짜
    resend date not null ,
    -- 객실 번호
    rono int unsigned,
    constraint primary key(reno),
    foreign key(rono) references room(rono) on update cascade on delete cascade
);

create table reservationdetail (

    rvno int unsigned auto_increment,
    -- 디테일가격pk
    price int default 0,
    -- 디테일 가격(변동사항등저장)
    payment_date date not null,
    -- 지불날짜
    detail_state ENUM('정상', '환불', '취소') DEFAULT '정상', -- 상태 저장 (환불 또는 취소)
    -- 상태저장(환불또는 취소)
    reno int unsigned,
    -- rating 참조

    constraint primary key(rvno),
    foreign key(reno) references reservation(reno) on update cascade on delete cascade

);

------------------ 사진 테이블 ------------------
create table picture(
    -- 사진번호(PK)
    pno int unsigned auto_increment ,
    -- 파일명
    pnoname varchar(255) not null ,
    -- 객실번호(FK)
    rono int unsigned ,
    constraint primary key(pno),
    foreign key(rono) references room(rono) on update cascade on delete cascade
);