import React, { lazy, Suspense, useState } from 'react';
import { 
  Home, Cart, CartOutline, HomeOutline, Notifications, NotificationsOutline, 
  Person, PersonOutline } from 'react-ionicons';
import { 
  BrowserRouter as Router, Switch, 
  Route, useHistory } from 'react-router-dom';
import './App.css';
import './bs.css';
import './custom.css';
const AboutPage = lazy(() => import('./pages/About'));
const HomePage = lazy(() => import('./pages/Home'));

const icons:any = {
  home: HomeOutline, cart: CartOutline, notif: NotificationsOutline,
  person: PersonOutline
};
const icon_active: any = {
  home: Home, cart: Cart, notif: Notifications,
  person: Person
};
const icon_size = 20;
const menus = ['home', 'cart', 'notif', 'person'];
const menus_link = ['/', '/cart', '/notif', '/person'];

const App: React.FC = () => {
  return(
    <Router>
      <Suspense fallback={<div>Loading...</div>}>  
        <NavigationBar />
        <Switch>
          <Route path="/cart">
            <AboutPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

const NavigationBar = () => {
  const [nav, setNav] = useState("home");
  const history = useHistory();

  return (
    <nav className="navigation mt-5">
      {/* <div className="navigation-bg"></div> */}
      <ul>
        {
          menus.map((d, i) => {
            return(<li key={i}>
              <div className={`icon p-3 m-0 ${nav === d ? "active" : ""}`} 
                onClick={() => {
                  setNav(d);
                  history.push(menus_link[i]);
                }}>
                <NavIcon name={d} active={nav === d ? true : false} />
              </div>
            </li>)
          })
        }
      </ul>
    </nav>
  );
};

const NavIcon = (props: any) => {
  const colors = {
    default: "#000",
    active: "#fff"
  };
  const GetIcon = props.active ? icon_active[props.name] : icons[props.name];
  return (<GetIcon width={`${icon_size}px`} height={`${icon_size}px`} color={props.active ? colors.active : colors.default} />);
}

export default App;
