import React, { useEffect, useRef, useState } from 'react';
import CardProduct from '../components/cards/CardProduct';
import { GetProducts, GetPopular } from '../services'
import './page.css';
import Slider from 'react-slick';
import { Search } from 'react-ionicons';

const HomePage: React.FC = () => {
  const [d, setD] = useState([]);
  const [p, setP] = useState([]);
  const [s, setS] = useState(false);
  // const [is, setIs] = useState(0);
  const [srch, setSrch] = useState(false); // search popup

  const slider = useRef<Slider>(null);
  const skeleton_count = [1,2,3,4,5,6,7,8,9,10];

  useEffect(() => {
    GetPopular().then(
      json => {
        setP(json);
        setS(true);
        // setIs(json.length > 2 ? Math.ceil(json.length / 2) : 0);
        slider.current?.slickGoTo(Math.ceil(json.length / 2));
      }
    );

    GetProducts().then(
      json => {
        setD(json);
      }
    );

    return () => {
      setP([]);
      setD([]);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    draggable: s,
    // centerMode: is !== 0 ? true : false,
  };

  return (
    <div className="main p-4 main-bg">

      <div className={`search-popup ${srch ? 'show' : ''}`} onClick={() => {setSrch(false)}}></div>

      <div className="header mb-4 d-flex justify-content-between align-items-center">
        <div className="header-text">
          <h3 className="title m-0 h1">Discover</h3>
          <p className="subtitle m-0 h3">your products</p>
        </div>
        <img className="avatar" src="https://randomuser.me/api/portraits/women/72.jpg" alt="..." />
      </div>

      <div className="d-flex search mb-4">
        <div className="search-input">
          <input type="text" className="px-3" placeholder="..." onClick={() => {setSrch(true)}} />
        </div>
        <div className="search-button d-flex justify-content-center align-items-center">
          <Search width="20px" height="20px" />
        </div>
      </div>

      <h3 className={`${p.length > 2 ? 'mb-4' : 'mb-0'}`}>Popular Product</h3>

      <Slider ref={slider} {...settings}>
        {
          p.length === 0 && skeleton_count.map((dat, i) => {
            return (<Skeleton key={i} className="mb-5" cStyle={{width: "250px", height: "392px", borderRadius: "16px"}} />)
          })
        }
        {
          p.length > 0 && p.map((dat, i) => {
            return (<CardProduct key={i} className="mb-5 mr-3" data={dat} />)
          })
        }
      </Slider>

      <h3 className="mb-4">All Products</h3>

      <div className="row ">
        {
          d.length === 0 && skeleton_count.map((dat, i) => {
            return (
              <div key={i} className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Skeleton cStyle={{width: "100%", height: "392px", borderRadius: "16px"}} />
              </div>
            )
          })
        }
        {
          d.length > 0 && d.map((dat, i) => {
            return (
              <div key={i} className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                <CardProduct cStyle={{width: "100%", boxShadow: "var(--bx-shadow-2)"}} data={dat} />
              </div>
            )
          })
        }
      </div>

    </div>
  );
};

const Skeleton = (props: any) => {
  const className = props.className;
  const style = props.cStyle;
  return (
    <div className={`skeleton ${className ? className : ''}`} style={style}></div>
  );
}

export default HomePage;