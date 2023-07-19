import React, {useEffect} from 'react'
import { fetchTrendingDeals } from '../api/api';


const TrendingGames = () => {

    useEffect(() => {
        const fetchDeals = async () => {
          try {
            const deals = await fetchTrendingDeals();
            console.log('Trending deals:', deals);
          } catch (error) {
            console.error('Error fetching trending deals:', error);
          }
        };
      
        fetchDeals();
      }, []);

  return (
    <div>TrendingGames</div>
  )
}

export default TrendingGames