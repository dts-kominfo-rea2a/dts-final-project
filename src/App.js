import HomePage from './containers/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Main from './containers/Main';
function App() {
  return (
    <div className="App">
        <NavBar/>
        <HomePage/>
        <Footer/>
       
        {/* <Main/> */}
      
    </div>
  );
}

export default App;
