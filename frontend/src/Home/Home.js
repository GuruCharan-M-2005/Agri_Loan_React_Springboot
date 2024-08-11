import React, { useState, useEffect } from 'react';
import Navbbar from '../Navbar/Navbbar';
import './Home.css';
import CountUp from 'react-countup';
import Footer from '../Footer/Footer';
import CropLoanDetailsCard from './CropLoanDetailsCard.js';
import DigitalGoldLoanDetailsCard from './DigitalGoldLoanDetailsCard';
import AgriCreditCardDetailsCard from './AgriCreditCardDetailsCard';
import FarmMechanisationLoanDetailsCard from './FarmMechanisationLoanDetailsCard';
import Contact from '../Contact/Contact.js';
import Chatbot from './Chatbot.jsx';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const [thirdSectionAnimated, setThirdSectionAnimated] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeBankOption, setActiveBankOption] = useState(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  const slides = [
    '/goldloan.png',
    '/tractor.png'
  ];


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.querySelector('.second-section');
      const thirdSection = document.querySelector('.third-section');
      const fourthSection = document.querySelector('.fourth-section');
      const fifthSection = document.querySelector('.fifth-section');
      const viewportHeight = window.innerHeight;

      if (secondSection) {
        const secondSectionTop = secondSection.getBoundingClientRect().top;
        if (secondSectionTop < viewportHeight) {
          secondSection.classList.add('h1-animate');
          const bankOptions = secondSection.querySelectorAll('.bank-option');
          bankOptions.forEach((option, index) => {
            setTimeout(() => {
              option.classList.add('pop');
            }, 500 + index * 300);
          });
        }
      }

      if (thirdSection && !thirdSectionAnimated) {
        const thirdSectionTop = thirdSection.getBoundingClientRect().top;
        if (thirdSectionTop < viewportHeight) {
          thirdSection.classList.add('h1-animate');
          const ratesContainer = thirdSection.querySelector('.rates-container');
          setTimeout(() => {
            if (ratesContainer) {
              ratesContainer.classList.add('slide');
            }
          }, 1000);

          const rateOptions = thirdSection.querySelectorAll('.rate-option');
          rateOptions.forEach((option, index) => {
            setTimeout(() => {
              option.classList.add('pop');
            }, 1500 + index * 300);
          });

          setTimeout(() => {
            setThirdSectionAnimated(true);
          }, 1500 + rateOptions.length * 300);
        }
      }

      if (fourthSection) {
        const fourthSectionTop = fourthSection.getBoundingClientRect().top;
        if (fourthSectionTop < viewportHeight) {
          const statItems = fourthSection.querySelectorAll('.stat-item');
          statItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('pop');
            }, 300 * index);
          });

          const digitalLoanHeading = fourthSection.querySelector('.digital-loan-heading');
          setTimeout(() => {
            digitalLoanHeading.classList.add('pop');
            setStartCount(true);
          }, statItems.length * 300);
        }
      }

      if (fifthSection && thirdSectionAnimated) {
        const fifthSectionTop = fifthSection.getBoundingClientRect().top;
        if (fifthSectionTop < viewportHeight) {
          const flowSteps = fifthSection.querySelectorAll('.flow-step');
          flowSteps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add('animate');
            }, 200 * index); // Adjust timing for each step
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [thirdSectionAnimated]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleBankOptionClick = (optionIndex) => {
    setActiveBankOption(optionIndex);
    setShowLoanDetails(true);
  };

  const handleCloseCard = () => {
    setShowLoanDetails(false);
  };

  const renderLoanDetailsCard = () => {
    switch (activeBankOption) {
      case 0:
        return <CropLoanDetailsCard onClose={handleCloseCard} />;
      case 1:
        return <DigitalGoldLoanDetailsCard onClose={handleCloseCard} />;
      case 2:
        return <AgriCreditCardDetailsCard onClose={handleCloseCard} />;
      case 3:
        return <FarmMechanisationLoanDetailsCard onClose={handleCloseCard} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='home-background'>
        <Navbbar />
        <div className='home-content'>
          <div className='caption'>
            <div><h1>Need fast loan? Try CropCredit for your needs</h1></div>
          </div>
          <div className='display-board'>
            <div className='slideshow-container'>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide1 ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
              ))}
              <button className='prev' onClick={goToPreviousSlide}>&#10094;</button>
              <button className='next' onClick={goToNextSlide}>&#10095;</button>
            </div>
            {/* <img src='/money1.png' className='money-hand' alt='money hand' /> */}
          </div>
        </div>
      </div>
      <div className='second-section'>
        <h1>Our Services</h1>
        <div className='bank-options'>
          {['Crop Loan', 'Digital Gold Loan', 'Agri Credit Card', 'Farm Mechanisation Loan'].map((service, index) => (
            <div
              key={index}
              className='bank-option'
              onClick={() => handleBankOptionClick(index)}
            >
              <img src={`W2B${index + 1}.svg`} alt={service} />
              <p>{service}</p>
            </div>
          ))}
        </div>
      </div>
      {showLoanDetails && renderLoanDetailsCard()}


      <div className='third-section'>
        <h1>Rates & Charges</h1>
        <div className='rates-container'>
          <div className='rate-option'>
            <img src='./r1.svg' className='rate-icon' alt='Tractor Loan Icon' />
            <div className='rate-value'>11.50% <span>P.A.*</span></div>
            <p>Farm Mechanisation Loan <br></br>(Tractor Loan)</p>
          </div>
          <div className='rate-option'>
            <img src='./r2.svg' className='rate-icon' alt='Kisan Credit Card Icon' />
            <div className='rate-value'>7.00% <span>P.A.*</span></div>
            <p>Agri Credit Card <br></br>(ACC Loan)</p>
          </div>
          <div className='rate-option'>
            <img src='./r3.svg' className='rate-icon' alt='SHG Loan Icon' />
            <div className='rate-value'>7.00% <span>P.A.*</span></div>
            <p>Self Help Group <br></br>(SHG Loan)</p>
          </div>
          <div className='rate-option'>
            <img src='./r4.svg' className='rate-icon' alt='AIF Loan Icon' />
            <div className='rate-value'>9.00% <span>P.A.*</span></div>
            <p>Agriculture Infrastructure Fund</p>
          </div>
        </div>
      </div> 
<div> 
<section id="contact">
  <Contact/>
  </section>

</div>
          <Chatbot/>

      <Footer />
    </div>
    
  );
}
