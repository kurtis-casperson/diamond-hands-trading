import  { useState, useEffect } from 'react';
import axios from 'axios';
import MarketNewsTable from './MarketNewsTable';


const HomePage = () => {
  const [marketNews, setMarketNews] = useState([])


  useEffect(()  => {
  async function getMarketNews(){
    try {
      const response = await axios.get('/api/marketNews')
      
      setMarketNews(response.data)
      
     
    } catch (error) {
      console.error(error)
    }
  
  }
  getMarketNews()
  },[])

  const marketNewsTable = marketNews.map(( news) => {
    return (
      <MarketNewsTable
        key={news['id']}
        news={news}
      />
    )
  })



  
  return (
    <>
    <div>HomePage</div>
    <h3 className='text-gray-600  text-left pl-10'>News that's leading the Market</h3>
    <div id="newsTable" className='grid lg:grid-cols-4 gap-10 p-6 text-left '>{marketNewsTable}</div>
    </>
  )
}

export default HomePage