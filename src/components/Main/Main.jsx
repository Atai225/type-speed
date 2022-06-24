import React, { useEffect, useState } from 'react';
import style from './main.module.css';
import Timer from 'react-compound-timer'



function Main({ words, onSubmit }) {
	const [typed, setTyped] = useState('');
	const [typedSymb, setTypedSymb] = useState('');
	const [symbErrors, setSymbErrors] = useState(0);
	const [currWord, setCurrWord] = useState(0);
	const [timeOut, setTimeOut] = useState(false);
	const [wrongWord, setWrongWord] = useState(null);


	const checkSymbols = (keyCode) => {
		if (words[currWord].substr(0, typedSymb.length) !== typedSymb && keyCode !== 8) {
			setSymbErrors(symbErrors + 1)
		}
	}

	const deleteSymbol = () => {
		if(typedSymb !== ''){
			setTyped(typed.slice(0, -1))
			setTypedSymb(typedSymb.slice(0, -1))
		}
		
	}

	const checkWord = () => {
		setTyped(typed + ' ')
		if (words[currWord] !== typedSymb) {
			setTyped(typed.slice(0, -typedSymb.length))
			setTypedSymb(typedSymb.slice(0, -typedSymb.length))
			setWrongWord(words[currWord])
		}else{
			setTypedSymb('')
			setCurrWord(currWord + 1)
		}
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 32) {
				checkWord();
		} else if (e.keyCode === 8) {
				deleteSymbol();
				checkSymbols(e.keyCode)
		}else if(e.keyCode >= 65 && e.keyCode <= 90){
			if (typedSymb.length !== words[currWord].length) {
				setTypedSymb(typedSymb + e.key);
				setTyped(typed + e.key)
			}
			checkSymbols(e.keyCode)
		}else{
			return null;
		}
	}

	useEffect(() => {
		if(timeOut){
			const typedChars = typed.replace(/\s/g, '')
			onSubmit({
				errors_count: symbErrors,
				typing_speed: symbErrors <= 0 ? typedChars.length : typedChars.length-symbErrors,
			})
		}
	}, [timeOut])

	return (
		<Timer direction='backward'
			initialTime={60000}
			startImmediately={false}
			checkpoints={[{
				time: 60,
				callback: () => setTimeOut(true)
			}]}>
			{({ start }) => (
				<>
						<div className={style.result}>
							<div className={style.result__timer}>
								<Timer.Seconds/> <div className={style.result__text}>sec</div>
							</div>
							<div className={style.result__mistakes}>
								{symbErrors} <div className={style.result__text}>err</div>
							</div>
						</div>
						<div className={style.type}>
							<input disabled={timeOut} value={typed} type="text" placeholder='Text to start' className={style.type__input} onKeyDown={(e) => handleKeyDown(e)} onChange={start} />
						</div>
							<div className={style.words}>
								{words.map((word, index) => {
									if(index === currWord){
										return <span key={index} className={wrongWord !== word ? style.active + ' ' + style.words__item : style.wrong + " " + style.words__item}>{word.split('').map((symbol, i) => (
											<span key={i}>{symbol}</span>
										))}</span> 
									}
									if(typed.includes(word)){
										return <span key={index} className={style.words__item + ' ' + style.completed}>{word.split('').map((symbol, i) => (
											<span key={i}>{symbol}</span>
										))}</span> 
									}
									return <span key={index} className={style.words__item}>{word.split('').map((symbol, i) => (
										<span key={i}>{symbol}</span>
									))}</span> 
								}
								)}
							</div>
				</>
			)}
		</Timer>
	)
}

export default Main