import React,{ useState, useEffect } from 'react';

// Components
import Loader from './Loader';
import Coin from './Coin';

// API
import { getCoins } from '../services/api';

// Styles
import styles from "./Landing.module.css";

const Landing = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getCoins()
      setCoins(data)
    }
    fetchApi()
  }, [])

  const searchHandler = event => {
    setSearch(event.target.value);
  }
  
  const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={styles.mainContainer} >
      <input  className={styles.input} type="text" name="search" placeholder="Search" value={search} onChange={searchHandler} />
      {
                coins.length ?
                    <div className={styles.coinContainer}>
                        {
                            searchedCoins.map(coin => <Coin
                                key={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                price={coin.current_price}
                                marketCap={coin.market_cap}
                                priceChange={coin.price_change_percentage_24h}
                            />)
                        }
                    </div> :

                    <Loader />
      }
    </div>
  )
}

export default Landing;