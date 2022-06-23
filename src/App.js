import { useEffect, useState } from 'react';
import Main from './components/Main/Main';
import style from './app.module.css'
import Result from './components/Result/Result';
import Modal from './components/Modal/Modal';

function App() {
  const [words, setWords] = useState();
  const [result, setResult] = useState(null)
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(false)

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=50")
      .then(response => response.json())
      .then(response => setWords(response))
      .catch(err => console.error(err));
  }, [result])

  const getResult = (result) => {
      setResult(result);
      setShow(true);
  }
  const clear = () => {
    setShow(false);
    setStart(false);
  }

  return (
    <div className={style.App}>
      <div className={style.container}>
        <h3 className={style.pretitle}>TYPING SPEED TEST</h3>
        <h1 className={style.title}>Test your typing skills</h1>
          {words && start ?
            <Main words={words} onSubmit={getResult} /> : <button className={style.start__btn} onClick={( ) => setStart(true)}>Start</button>
          }
        {show && result && <Modal show={show} close={() => clear()}>
           <Result result={result}/>
        </Modal>}
      </div>
    </div>
  );
}

export default App;
