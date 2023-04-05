import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="logo">
          <div className="logo-img">
            로고
          </div>
        </div>
        <Btns></Btns>
      </div>
    </div>
  );
}

function Btns(){

  function test(){
    console.log("테스트용");
  }

  return (
    <div className="btns">
      <button className="btn" onClick={test}>버튼1</button>
      <button className="btn">버튼2</button>
      <button className="btn">버튼3</button>
    </div>
  );
}

export default App;
