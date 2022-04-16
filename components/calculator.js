import { useState } from "react";

const times = 12;

export default function Calculator({ data }) {
  const { currencySymbol, rate } = data;
  data.rate = data.rate ?? 0.095;

  const [capital, setCapital] = useState(0);
  const [result, setResult] = useState(0);

  const _calc = () => {
    let r = parseFloat(capital * Math.pow(1 + (rate / 10000), 1/times)).toFixed(2);
    setResult(r);
    return r;
  };

  return (
    <>
      <div className="money-send">
        <div className="calculator-inner  text-left">
          <div className="single-cal">
            <div className="inner-form">
              <form action="#">
                <label>Valor inicial</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Monto"
                  onChange={(e) => {
                    setCapital(e.target.value);
                  }}
                  onSubmit={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      _calc();
                  }}
                />
                {/*
                                <select onChange={(e) => { setCurrencySymbol(e.target.value) }} value={currencySymbol}>
                                    <option value="USD">USD</option>
                                    <option value="Bs.">BS.</option>
                                </select>
                                */}
              </form>
            </div>
            <button className="cale-btn" onClick={_calc}>
              Calcular
            </button>
            <div className="inner-form">
              <form action="#">
                <label className="text-light-green">Valor final</label>
                <h3 className="text-green">
                  {currencySymbol} {result} *
                </h3>
              </form>
            </div>
            <div className="inner-form-text">
              <div className="rate-text">
                <span>
                  {" "}
                  <strong>{(rate / 10000).toFixed(4)}</strong> Tasa mensual
                </span>
                <span>
                  {" "}
                  <strong>(*)</strong> Plazo mensual
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
