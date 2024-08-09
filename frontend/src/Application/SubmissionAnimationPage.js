import React from 'react';
import Lottie from 'react-lottie';
import loadingImage from './submitted.json'; 
// import './SubmissionAnimationPage.css';
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: loadingImage,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const SubmissionAnimationPage = () => {
  return (
    <div className="dropdown-menu1">
      <div className="loading-title">
        <h2></h2>
      </div>
      <div className="loading-animation">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    </div>
  );
};

export default SubmissionAnimationPage;
