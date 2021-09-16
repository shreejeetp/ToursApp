import { React, useEffect, useState } from 'react';
import './home.css';
import logo from '../../static/images/logo.svg';
import Stepper from '../../components/stepper/Stepper';
import data from '../../static/json/data.json';

function Home() {
  //consts
  const [trip, setTrip] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(0);
  let bgStyle = {
    'background-image': `radial-gradient(transparent 45%,rgba(0,0,0,0.8)),url('${trip[currentTrip]?.link}')`,
    'background-size': 'cover',
  };
  //functions
  const loadTripData = async () => {
    setTrip([...data.trip]);
  };

  //useEffects
  useEffect(() => {
    loadTripData();
  }, []);

  useEffect(() => {
    console.log(bgStyle);
    bgStyle = {
      'background-image': `radial-gradient(circle,transparent 55%,rgba(0,0,0,0.8)),url('${trip[currentTrip]?.link}')`,
    };
  }, [trip, currentTrip]);

  //return
  return (
    <div className='full-page-flex-column' style={bgStyle}>
      <div className='header'>
        <span className='header__logo'>
          <img className='header__logo-img' src={logo} alt='logo' />
          <span className='header__logo-txt'>Travel</span>
        </span>
      </div>

      <div className='home-main-content'>
        <Stepper
          length={trip.length}
          main={currentTrip}
          setTrip={setCurrentTrip}
        />
        <div className='trip-title'>
          <h1 className='trip-title__title'>{trip[currentTrip]?.name}</h1>
          <p className='trip-title__subtitle'>{trip[currentTrip]?.desc}</p>
          <a className='trip-title__button'>
            Explore
            <span className='trip-title__button__icon'>
              <i class='bi bi-arrow-right' />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
