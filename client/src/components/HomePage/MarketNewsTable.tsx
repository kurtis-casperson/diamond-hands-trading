

const MarketNewsTable = ({news}: any) => {


  return (
    <>

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
      </>
  );
};

export default MarketNewsTable;
