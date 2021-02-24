import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));

const App: React.FC = () => {
  return(
    <Router>
      <Suspense fallback={<div>Loading...</div>}>  
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
