import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './features/LoginSlice';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {

  // 리덕스(전역변수(상태)) 불러오기
  const dispatch = useDispatch();

  const [idError, setIdError] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  // 추가
  // 아이디와 비밀번호를 가지고 있는 코드
  const [info, setInfo] = useState({id : "", password : ""});
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    if (idError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });
  };

  // 로그인 버튼 클릭 시 실행되는 코드
  // const validateInputs = () => {
  //   const id = document.getElementById('id');
  //   const password = document.getElementById('password');

  //   let isValid = true;

  //   if (!id.value || !/\S+@\S+\.\S+/.test(id.value)) {
  //     setIdError(true);
  //     setIdErrorMessage('유효한 아이디를 입력하세요');
  //     isValid = false;
  //   } else {
  //     setIdError(false);
  //     setIdErrorMessage('');
  //   }

  //   if (!password.value) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('비밀번호를 입력해주세요');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }

  //   return isValid;
  // };
  //추가
  // 아이디와 비밀번호를 변수에 담는 코드
  const changeInput = (event) => {
    setInfo({...info, [event.target.name] : event.target.value});
  }
  // 서버에 로그인 요청 하는 코드
  const loginReq = async () => {
    //validateInputs();
    try {
      const response = await axios.post("http://localhost:8081/staff/login", info, {withCredentials : true});
      console.log(response.data);
      if(response.data) {
        const response2 = await axios.get("http://localhost:8081/staff/info", {withCredentials : true});
        console.log(response2.data);
        if(!(response2.data == null)) {
          alert("로그인 성공");
          dispatch(login(response2.data));
          if(response2.data.staffRank > 0) {
            navigate("/reservation/room");
          } else if(response2.data.staffRank == 0) {
            navigate("/home");
          }
        } else {
          alert("로그인 실패");
        }
      } else {
        alert("로그인 실패");
      }
    } catch(e) {
      console.log(e);
    }
  }

  // console.log(info);

  return (
    <Card variant="outlined" sx={{position : "absolute", top : "50%", left : "50%", transform : "translate(-50%, -50%)"}}>
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            로그인
        </Typography>
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
            <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="id">아이디</FormLabel>
                </Box>
                <TextField
                    error={idError}
                    helperText={idErrorMessage}
                    id="id"
                    type="id"
                    name="id"
                    placeholder="hotelsXXXX"
                    autoComplete="id"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={idError ? 'error' : 'primary'}
                    value={info.id}
                    onChange={changeInput}
                />
            </FormControl>
            <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="password">비밀번호</FormLabel>
                </Box>
                <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    variant="outlined"
                    color={passwordError ? 'error' : 'primary'}
                    value={info.password}
                    onChange={changeInput}
                />
            </FormControl>
            <Box sx={{textAlign : "end"}}>
                <Button disableFocusRipple tabIndex={-1} variant="text" color="black" onClick={() => {alert("관리자에게 문의하세요");}}>아이디 / 비밀번호 찾기</Button>
            </Box>
            <Button type="button" disableFocusRipple fullWidth variant="contained" onClick={loginReq}>
                로그인
            </Button>
        </Box>
    </Card>
  );
}