import React, { Component } from 'react';
import styles from './Credit.module.css';

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      month: '',
      year: '',
      cvc: ''
    };
  }

  handelChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });

    const len = Number(e.target.value.length);
    if (
      e.target.name === 'card1' ||
      e.target.name === 'card2' ||
      e.target.name === 'card3' ||
      e.target.name === 'card4'
    ) {
      let cnt = Number(e.target.id);
      if (cnt < 4 && len === 4) {
          cnt++;
          document.getElementById(cnt).focus();
      }
      else if(cnt === 4 && len === 4){
        document.getElementById("month").focus();
      }
    }
    else if (e.target.name === 'month'){
        if(len === 2){
            document.getElementById("year").focus();
        }
    }
    else if (e.target.name === 'year'){
        if(len === 2){
            document.getElementById("cvc-input").focus();
        }
    }
  };

  handelKey = (e) => {
    let len = Number(e.target.value.length);

    if (e.keyCode === 8 && len === 0) {
        if (
            e.target.name === 'card2' ||
            e.target.name === 'card3' ||
            e.target.name === 'card4'
          ) {
            let cnt = Number(e.target.id);
            cnt--;
            document.getElementById(cnt).focus();
          }
        else if (e.target.name === 'month'){
            document.getElementById(4).focus();
        }
        else if (e.target.name === 'year'){
                document.getElementById("month").focus();
        }
        else if (e.target.name === 'cvc'){
                document.getElementById("year").focus();
        }
    }
  };

  handelPaste = (e) => {
    const pasteData = e.clipboardData.getData('text/plain');
    let count = 1;
    for (let i = 0; i <= 12; count++) {
      const val = pasteData.slice(i, (i += 4));
      document.getElementById(count).value = val;
    }
    e.preventDefault();
  };

  handleClear = (e) => {
    this.setState({
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      month: '',
      year: '',
      cvc: ''
    });
  };

  render() {
    return (
      <div className={styles.checkout_form}>
        {/* 16 Digit Card Number */}
        <div className={styles.card_number} id="card-container">
          <input
            type="text"
            name="card1"
            className={styles.input}
            maxLength={4}
            id="1"
            placeholder="0000"
            value={this.state.card1}
            onChange={this.handelChange}
            onKeyDown={this.handelKey}
            onPaste={this.handelPaste}
          />
          <input
            type="text"
            name="card2"
            className={styles.input}
            maxLength={4}
            id="2"
            placeholder="0000"
            value={this.state.card2}
            onChange={this.handelChange}
            onKeyDown={this.handelKey}
          />
          <input
            type="text"
            name="card3"
            className={styles.input}
            maxLength={4}
            id="3"
            placeholder="0000"
            value={this.state.card3}
            onChange={this.handelChange}
            onKeyDown={this.handelKey}
          />
          <input
            type="text"
            name="card4"
            className={styles.input}
            maxLength={4}
            id="4"
            placeholder="0000"
            value={this.state.card4}
            onChange={this.handelChange}
            onKeyDown={this.handelKey}
          />
        </div>
        <div className={styles.card_grp}>
          <div className={styles.expiry_date}>
              {/* Month */}
            <input
              type="text"
              id="month"
              name = "month"
              maxLength="2"
              className={styles.expiry_input}
              placeholder="00"
              value={this.state.month}
              onChange={this.handelChange}
              onKeyDown={this.handelKey}
            />
            {/* Year */}
            <input
              type="text"
              id="year"
              name = "year"
              maxLength="2"
              className={styles.expiry_input}
              placeholder="00"
              value={this.state.year}
              onChange={this.handelChange}
              onKeyDown={this.handelKey}
            />
          </div>
          {/* CVC */}
          <div className={styles.cvc}>
            <input
              type="text"
              id="cvc-input"
              name = "cvc"
              maxLength="3"
              className={styles.cvc_input}
              placeholder="CVC"
              value={this.state.cvc}
              onChange={this.handelChange}
              onKeyDown={this.handelKey}
            />
            <div className={styles.cvc_img}>
              ?
              <div className={styles.img}>
                <img src="https://i.imgur.com/2ameC0C.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <button className={styles.btn} id="clear" onClick={this.handleClear}>
          CLEAR
        </button>
      </div>
    );
  }
}

export default CreditCard;
