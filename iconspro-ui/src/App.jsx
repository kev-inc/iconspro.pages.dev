import { useState } from "react";

function App() {


  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(64);
  const [color, setColor] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(60);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    const newQuery = e.target.query.value
    const newColor = e.target.color.value.replaceAll("#", "")
    const newSize = e.target.size.value

    setColor(newColor)
    setSize(newSize)
    setQuery(newQuery)
    setLoading(true);
    setOffset(0);
    const resp = await fetch(
      `https://iconspro-api.kevc.workers.dev/search?term=${newQuery}&amount=${limit}&offset=${offset}`
    ).then((resp) => resp.json());
    setResults(resp['icons'])
    setLoading(false);
  };

  const getMore = async () => {
    setLoading(true);
    setOffset(offset + limit);
    const resp = await fetch(
      `https://iconspro-api.kevc.workers.dev/search?term=${query}&amount=${limit}&offset=${offset + limit}`
    ).then((resp) => resp.json());
    let temp = results;
    temp = temp.concat(resp["icons"]);
    setResults(temp);
    setLoading(false);
  };

  const openImage = (platform, name) => {
    window.open(`https://img.icons8.com/${platform}/${size}/${color.length > 0 ? color : "000000"}/${name}.png`)
  }

  return (
    <div>
      <div className="text-xl font-semibold p-4 mb-4 border text-blue-500 bg-slate-50 text-center">
        IconsPro
      </div>

      <div className="container mx-auto">
        <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" checked={isDarkMode} onClick={e => setIsDarkMode(e.target.checked)} id="default-toggle" class="sr-only peer" />
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900">Dark Mode (for light icons)</span>
        </label>
        <form onSubmit={search}>

          <div className="flex gap-4 items-end">
            <div className='grow'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Search for icons</label>
              <input
                type="text"
                id="query"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <div className='col-span-2'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Icon Color</label>
              <input
                type="text"
                id="color"
                placeholder="#000000"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Icon Size</label>
              <select id="size" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value={32}>32px</option>
                <option value={64}>64px</option>
                <option value={128}>128px</option>
                <option value={256}>256px</option>
                <option value={512}>512px</option>
              </select>
            </div>

            <div>
              <input type="submit" className="button rounded text-white bg-blue-500 py-2 px-4 font-medium cursor-pointer" value="Search" />
            </div>

          </div>

        </form>

        <div className='grid grid-cols-12 gap-8 py-4'>
          {results.map((item, index) => (
            <div key={index} className={`cursor-pointer rounded ${isDarkMode ? 'bg-neutral-900' : 'bg-white'}`} onClick={() => openImage(item["platform"], item["commonName"])}>
              <img
                src={`https://img.icons8.com/${item["platform"]}/128/${color.length > 0 ? color : "000000"
                  }/${item["commonName"]}.png`}
                alt={item["id"]}
              />
            </div>
          ))}


        </div>
        <div>
          {loading && (
            <div class="text-center p-4">
              <div role="status">
                <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>

        <div className='text-center mt-4'>
          {results.length > 0 && (
            <button className="button py-2 px-4 rounded bg-blue-500 text-white font-medium" onClick={getMore}>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
