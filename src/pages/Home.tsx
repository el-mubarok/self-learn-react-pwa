import React, { useEffect, useRef, useState } from 'react';
import CardProduct from '../components/cards/CardProduct';
import { GetProducts, GetPopular } from '../services'
import './page.css';
import Slider from 'react-slick';
import { FileTrayOutline, Filter, Search, SyncOutline } from 'react-ionicons';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [d, setD] = useState([]);
  const [p, setP] = useState([]);
  const [ad, setAd] = useState([]); // all data
  const [s, setS] = useState(false);
  const [more, hasMore] = useState(true);
  const [srch, setSrch] = useState(false); // search popup
  const [lp, setLp] = useState(0);
  const [srt, setSrt] = useState(0); // sort value
  const [srtp, setSrtp] = useState(false); // sort popup

  const slider = useRef<Slider>(null);
  const skeleton_count = Array.from({length: 10});
  const sort = ["Latest Products","Most Popular","Lowest Price","Highest Price",
  ];

  useEffect(() => {
    GetPopular().then(
      json => {
        setP(json);
        setS(true);
        slider.current?.slickGoTo(Math.ceil(json.length / 2));
      }
    );

    GetProducts(20).then(
      json => {
        setAd(json);
        setReady(true);
      }
    );

    return () => {
      setP([]);
      setD([]);
      setAd([]);
    };
  }, []);

  if(ad.length > 0 && d.length === 0){
    setD(ad.slice(0, 10));
    setLp(10);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    draggable: s,
  };
  
  const fetchMoreData = () => {
    if(ad.length > 0 && ready){
      let offset = lp + 5;
      let get_d = (ad.length - offset) >= 0 ? ad.slice(lp, offset) : null;
      setTimeout(() => {
        if(get_d){
          setD(d.concat(get_d));
          setLp(offset);
        }else{
          hasMore(false);
        }

      }, 1500);
    }
  }

  const sortProducts = (key: number, mode: string = "asc") => {
    let sort_key = ["id", "", "price", "price"];
    let data_temp: any = d;
    // set current data to 0
    setD([]);

    // begin sort
    data_temp.sort((a: any, b: any) => {
      if(mode === "asc" && key !== 3){
        if (a[sort_key[key]] < b[sort_key[key]])
          return -1;
        if (a[sort_key[key]] > b[sort_key[key]])
          return 1;
      }

      if(mode === "desc" || key === 3){
        if (a[sort_key[key]] > b[sort_key[key]])
          return -1;
        if (a[sort_key[key]] < b[sort_key[key]])
          return 1;
      }
      return 0;
    });
    setD(data_temp);
    // console.log(data_temp);
  }

  // console.log(d);

  return (
    <div className={`main p-4 main-bg ${srch ? 'has-search' : ''}`} >

      <div 
        className={`search-popup ${srch || srtp ? 'show' : ''}`} 
        onClick={() => {
          setTimeout(() => {
            setSrch(false);
            setSrtp(false);
          }, 250)
        }}>
        {
          srtp && (
            <div className="p-4 sort d-flex flex-column align-items-center justify-content-center">
              <p className="fs-1 mb-5">
                Sort products by
              </p>
              <ul>
                {
                  sort.map((_dat, i) => {
                    return <li><p className={`${srt === i ? 'selected' : ''}`} onClick={() => {
                      setSrt(i);
                      sortProducts(i, (i === 0 ? 'desc' : 'asc'));
                    }}>{_dat}</p></li>
                  })
                }
              </ul>
            </div>
          )
        }
      </div>

      <div className="header mb-4 d-flex justify-content-between align-items-center">
        <div className="header-text">
          <h3 className="title m-0 h1">Discover</h3>
          <p className="subtitle m-0 h3">your products</p>
        </div>
        <img className="avatar" src="https://randomuser.me/api/portraits/women/72.jpg" alt="..." />
      </div>

      <div className={`d-flex search mb-4 ${srch ? 'active' : ''}`}>
        <div className={`search-input ${srch ? 'focus' : ''}`}>
          <input type="text" className="px-3" placeholder="search here" onClick={() => {setSrch(true)}} />
        </div>
        <div className={`search-button d-flex justify-content-center align-items-center ${srch ? 'focus' : ''}`}>
          <Search width="20px" height="20px" />
        </div>
      </div>

      <h3 className={`${p.length > 2 ? 'mb-4' : 'mb-4'}`}>Popular Product</h3>

      <Slider ref={slider} {...settings}>
        {
          p.length === 0 && skeleton_count.map((dat, i) => {
            return (<Skeleton key={i} className="mb-3" cStyle={{width: "250px", height: "392px", borderRadius: "16px"}} />)
          })
        }
        {
          p.length > 0 && p.map((dat, i) => {
            return (<CardProduct key={i} className="mb-3 mr-3" data={dat} />)
          })
        }
      </Slider>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3 className="mb-0">All Products</h3>
        <div className="d-flex align-items-center">
          <p className="mb-0 me-3">
            {sort[srt]}
          </p>
          <div className={`button d-flex justify-content-center align-items-center ${srch ? 'focus' : ''}`} onClick={() => setSrtp(true)}>
            <Filter width="20px" height="20px" />
          </div>
        </div>
      </div>

      {/* animate__animateds animate__heartBeats animate__infinites  */}
      <InfiniteScroll
        dataLength={d.length}
        next={() => fetchMoreData()}
        hasMore={more}
        loader={<div className="fs-5 line-height-1 mt-3 text-center d-flex justify-content-center align-items-center mb-0">
          <SyncOutline
            color={'#000000'} 
            rotate 
            height="20px"
            width="20px"
          />
          <span className="ms-2">Fetching ...</span>
        </div>}
        endMessage={<div className="fs-5 line-height-1 mt-3 text-center d-flex justify-content-center align-items-center mb-0">
          <FileTrayOutline
            color={'#000000'} 
            shake
            height="20px"
            width="20px"
          />
          <span className="ms-2">Whoa there is no more data.</span>
        </div>}
      >
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
      </InfiniteScroll>


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