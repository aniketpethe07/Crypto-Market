import React from "react";
import styles from "./Form.module.css";

export default function Form(props) {
  return (
    <>
      <div className={styles.mainSection}>
        <div className={styles.section1}>
          <h1>CryptoMarket</h1>
          <p>
            Connect with CryptoMarket and get access upto 100+ Cryptocurrencies.
          </p>
        </div>
        <div className={styles.section2}>
          <form
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <h1>{props.button1}</h1>
            <input
              type="email"
              placeholder="Email:"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password:"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <button
              className={styles.btn}
              type="submit"
              onClick={props.handleLogin}
            >
              {props.button1}
            </button>
            <button className={styles.btn} type="submit">
              {props.button2}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
