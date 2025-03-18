import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function DaumAddress(props) {
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState('false');

    // const themeObj = {
    //     bgColor: '#FFFFFF', 
    //     pageBgColor: '#FFFFFF', 
    //     postcodeTextColor: '#C05850',
    //     emphTextColor: '#222222',
    // };

    // const postCodeStyle = {
    //     width: '360px',
    //     height: '480px',
    // };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
        window.opener.postMessage({message : {zonecode : zonecode, address : address}}, "*");
        window.close();
      };
    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setIsOpen(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };

    return (
        <>
            <DaumPostcode 
                style={{height : "100%"}} 
                // theme={themeObj}
                // style={postCodeStyle}
                onComplete={completeHandler}
                onClose={closeHandler}
            />
        </>
    );
}