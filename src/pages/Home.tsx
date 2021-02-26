import React, { useEffect, useState } from 'react';
import CardProduct from '../components/cards/CardProduct';
import { GetProducts } from '../services'
import './page.css';
import Slider from 'react-slick';
import { Search, SearchOutline } from 'react-ionicons';

const HomePage: React.FC = () => {
  const [d, setD] = useState([]);
  useEffect(() => {
    GetProducts().then(
      json => {
        setD(json);
      }
    );
  }, []);

  console.log(d);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  return (
    <div className="main p-4 main-bg">

      <div className="header mb-4 d-flex justify-content-between align-items-center">
        <div className="header-text">
          <h3 className="title m-0 h1">Discover</h3>
          <p className="subtitle m-0 h3">your products</p>
        </div>
        <img className="avatar" src="https://randomuser.me/api/portraits/women/72.jpg" />
      </div>

      <div className="d-flex search mb-4">
        <div className="search-input">
          <input type="text" className="px-3" placeholder="..." />
        </div>
        <div className="search-button d-flex justify-content-center align-items-center">
          <Search width="20px" height="20px" />
        </div>
      </div>

      <h3 className="mb-0">Popular Product</h3>

      <Slider {...settings}>
        {
          d.length > 0 && d.map((dat, i) => {
            return (<CardProduct key={i} className="mb-4 mr-3" data={dat} />)
          })
        }
      </Slider>

    </div>
  );
};

export default HomePage;