

const MarketNewsTable = ({news}: any) => {


  return (
 
    <div >
        <h2 className= "text-black text-lg font-semibold mb-4 border-2 border-spacing-2 border-green-500 rounded-md">{news.headline}</h2>
      <div className=" pr-4">
        <img src={news.image} alt="Image" className="max-w-full" />
        <p className="text-black text-sm">{news.summary}</p>
      </div>
      <div >
        <p className="text-gray-600 bottom-2 right-2">{news.source}</p>
      </div>
      </div>

      //   <div className="grid grid-rows-4 grid-flow-col gap-4">
      //   <img src={news.image} className="row-start-2 row-span-2 ..." />
      //   <p className=" text-black text-sm row-start-2 row-span-2 ...">{news.summary}</p>
      //   <div className=" text-black text-lg font-semibold mb-4row-end-3">{news.headline}</div>
      //   <p className="row-start-2 row-end-3 ...">{news.source}</p>
      // </div>
     
  );
};

export default MarketNewsTable;
