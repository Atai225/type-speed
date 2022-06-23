import React from "react";
import style from "./result.module.css";
import tRex from "../../img/dino.svg";
import turtle from "../../img/turtle.svg";

function Result({ result }) {
  return (
    <>
      <h1 className={style.result__title}>Your result</h1>
      {result.typing_speed < 140 ? (
        <div className={style.result__name}>You are a turtle</div>
      ) : (
        <div className={style.result__name}>You are a T-Rex</div>
      )}
      <div className={style.result}>
        <div className={style.result__side}>
            {result.typing_speed < 140 ? (
              <img className={style.result__img} src={turtle} alt="turtle" />
            ) : (
              <img className={style.result__img} src={tRex} alt="t-rex" />
            )}
        </div>
        <div className={style.result__info}>
          <div className={style.result__mistakes}>
            {result.errors_count} <span className={style.result__text}>errors</span>
          </div>
          <div className={style.result__speed}>
            {result.typing_speed} <span className={style.result__text}>chars/min</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
