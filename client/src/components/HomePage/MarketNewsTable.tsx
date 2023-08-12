

const MarketNewsTable = ({news}: any) => {


  return (
    <div className="flex flex-row flex-nowrap justify-between p-8 border-2 border-green-500">
      <div className="w-1/4 pr-4">
        <img src={news.image} alt="Image" className="max-w-full" />
      </div>
      <div className="w-2/4">
        <p className="text-black text-sm">{news.summary}</p>
        <h2 className= "text-black text-lg font-semibold mb-4">{news.headline}</h2>
        <p className="text-gray-600 bottom-2 right-2">{news.source}</p>
      </div>
    </div>
  );
};

export default MarketNewsTable;
