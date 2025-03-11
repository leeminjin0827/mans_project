import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = createRoot(document.querySelector("#root"));

// import StaffPage from './hotels/Staff.jsx';
// root.render(<StaffPage />);

// 사이드바
import PermanentDrawerLeft from './hotels/header';
root.render( <PermanentDrawerLeft /> )

// 객실
// import ParlorPage from './hotels/Parlor';
// root.render( <ParlorPage /> );
