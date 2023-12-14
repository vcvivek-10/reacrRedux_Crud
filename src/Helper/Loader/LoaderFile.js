import React from 'react'
import Lottie from "lottie-react";
import loginLoader from './loaderJson/loaderLogin.json'
import './loaderJson/Loader.css'

const LoaderFile = () => {
  return (
    <div className="cont" style={{ background: '#00000033', }} >
      <Lottie style={{ width: "6%", background: "transparent" }} animationData={loginLoader} />
    </div>
  )
}

export default LoaderFile
