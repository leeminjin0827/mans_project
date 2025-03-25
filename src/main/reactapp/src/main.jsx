import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import './App.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = createRoot(document.querySelector("#root"));

import PermanentDrawerLeft from './hotels/header';
root.render(<PermanentDrawerLeft />);

// import SignInCard from './hotels/Login';
// root.render(<SignInCard />);

// 사진 캐러셀 테스트
// import PictyreList from './hotels/components/room/PictureList';
// root.render (<PictyreList /> );

// 사용자 페이지
// import User from './hotels/components/user';
// root.render( <User /> );

// import Graph from './hotels/detailGraph';
// root.render(<Graph/>);

