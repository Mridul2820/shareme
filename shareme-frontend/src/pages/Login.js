import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import ShareMeVideo from '../assets/share.mp4'
import ShareMeLogo from '../assets/logowhite.png'

import { client } from '../client'

const Login = () => {
    const navigate = useNavigate()

    const responseGoogle = response => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.profileObj));
        const { name, googleId, imageUrl } = response.profileObj;
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });
    }

    useEffect(() => {
        document.title = 'Login - ShareMe'
    }, [])

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative h-full w-full">
                <video 
                    src={ShareMeVideo}
                    type="video/mp4"
                    className="h-full w-full object-cover"
                    loop
                    controls={false}
                    muted
                    autoPlay
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="py-5">
                        <img 
                            src={ShareMeLogo} 
                            alt="Logo" 
                            width="175px"
                        />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin 
                            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-mainColor flex justify-center items-center px-3 py-2 rounded-lg cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className='mr-2'/>
                                    Sign in with Google
                                </button>
                            )}  
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
