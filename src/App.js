import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [showingRef, setShowingRefTo] = useState(true);

  return (
    <div className='page'>

      <div className='msg'>Clicking outside of the ref will remove the ref.</div>
      {showingRef && (
        <RefComp 
          close={() => setShowingRefTo(false)}
        />
      )}

      <button onClick={() => window.location.reload()}>Reset</button>
    </div>
  );
}

const RefComp = (props) => {
  const [showingDiv, setShowingDivTo] = useState(true);
  const ref = useRef(null);
  
  // close ref on clicking outside the ref
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current.contains(e.target)) return;
      props.close();
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      props.close(false);
    } 

  },[]);
  
  return (
    <div className='ref' ref={ref}>
      <div
        className='btn1'
        onClick={() => setShowingDivTo(!showingDiv)} 
      >
        toggle the div below (I don't have problems)
      </div>

      {showingDiv && (
        <div 
          className='btn2'
          onClick={() => setShowingDivTo(false)} 
        >
          Remove myself (I have problems)
        </div>
      )}
    </div>
  );
}


export default App;
