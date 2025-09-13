import { useState } from 'react'
import { useEffect } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [texts, setTexts] = useState([]);
  const [index, setIndex] = useState(0);

  // get texts from JSON
  useEffect(() => {
    fetch("/src/texts.json")
      .then((res) => res.json())
      .then((data) => setTexts(data.texts))
      .catch((err) => console.error("Metin yüklenemedi:", err));
  }, []);

  // change texts with loop
  useEffect(() => {
    if (texts.length === 0) return; // wait if it has not been load
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);

    }, 7000);
    return () => clearInterval(interval);
  }, [texts]);

  if (texts.length === 0) {
    return <div className="app-container">bekleyiver</div>;
  }

  return (
    <div className="app-container">
      <div className="box">
        <p className='box-text'>{texts[index]}</p>
      </div>
    </div>
  );
}

export default App
