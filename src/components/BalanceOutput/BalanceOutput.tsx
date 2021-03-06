import React, { ReactElement } from "react";
import { convertWeiToEther } from "../../helpers/converters";
import Loader from "../Loader";
import styles from "./BalanceOutput.module.scss";

interface Props {
  wei: number | null;
  balanceLoading: boolean;
  exchangeRateUSD: number | undefined;
  exchangeRatesLoading: boolean;
  exchangeRatesError: string | null;
}

/* Shows balance and value in USD */
export default function BalanceOutput({
  balanceLoading,
  wei,
  exchangeRateUSD,
  exchangeRatesLoading,
  exchangeRatesError
}: Props): ReactElement {

  let ether, valueUSD;
  if (wei !== null) {
    ether = convertWeiToEther(wei); // convert from wei to Ether
    if (typeof exchangeRateUSD !== 'undefined') {
      valueUSD = (ether * exchangeRateUSD || 0);
    }
  }
  return (
    <div className={styles.balance}>
      {balanceLoading ? <Loader /> : <>
        <div className={styles.balance__container}>
          <div className={styles.balance__label}>Balance</div>
          <div className={styles.balance__balanceUnit}>
            <div data-testid="balance-value" className={styles.balance__value}>{ether?.toFixed(4)}</div>
            <div className={styles.balance__unit}>Ether</div>
          </div>
        </div>
        {exchangeRatesLoading ? <Loader /> :
          <>
            {exchangeRatesError ? <div>Error occurred while fetching USD value.</div> : <div className={styles.balance__container}>
              <div className={styles.balance__label}>Ether Value</div>
              <div className={styles.balance__balanceUnit}>
                <div data-testid="usd-value" className={styles.balance__value}>{valueUSD?.toFixed(2)}</div>
                <div className={styles.balance__unit}>$</div>
              </div>
              <div className={styles.balance__label}>Rate: {exchangeRateUSD}$/ETH</div>
            </div>}
          </>}
      </>}
    </div>
  );
}
