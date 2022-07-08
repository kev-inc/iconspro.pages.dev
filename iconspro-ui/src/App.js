import { useState } from "react";
import "bulma/css/bulma.min.css";

function App() {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [size, setSize] = useState(64);
  const [color, setColor] = useState("");
  const [limit] = useState(60);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOffset(0);
    const resp = await fetch(
      `https://iconspro-api.kevc.workers.dev/search?term=${term}&amount=${limit}&offset=${offset}`
    ).then((resp) => resp.json());
    setResults(resp["icons"]);
    setLoading(false);
  };

  const getMore = async () => {
    setLoading(true);
    setOffset(offset + limit);
    const resp = await fetch(
      `https://iconspro-api.kevc.workers.dev/search?term=${term}&amount=${limit}&offset=${offset}`
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
    <div className="container">
      <div class="mb-4">
        <div className="level py-4">
          <div className="level-left">
            <div className="level-item">

              <h3 class="is-size-3">IconsPro Search</h3>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">

              <label class="checkbox subtitle">
                Not seeing anything? Try dark mode
                <input type="checkbox" className="ml-2" checked={isDarkMode} onClick={e => setIsDarkMode(e.target.checked)}/>
              </label>
            </div>
          </div>
        </div>

        <form class="field is-grouped" onSubmit={search}>
          <p className="control is-expanded">
            <input
              class="input"
              type="text"
              name="term"
              id="term"
              placeholder="Search icons"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </p>
          <p class="control">
            <div class="select">
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value={32}>32px</option>
                <option value={64}>64px</option>
                <option value={128}>128px</option>
                <option value={256}>256px</option>
                <option value={512}>512px</option>
              </select>
            </div>
          </p>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="#000000"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <p class="control">
            <input type='submit' class="button is-info" />
          </p>
        </form>
      </div>

      <div className='columns is-mobile is-multiline is-1'>
        {results.map((item, index) => (
          <div className='column is-3-mobile is-2-tablet is-1-desktop ' key={index}>
            <div className={`card is-clickable ${isDarkMode && 'has-background-dark'}`} onClick={() => openImage(item["platform"], item["commonName"])}>
              <div className="card-image p-3">
                <figure className="image is-square">
                  <img
                    src={`https://img.icons8.com/${item["platform"]}/128/${color.length > 0 ? color : "000000"
                      }/${item["commonName"]}.png`}
                    alt={item["id"]}
                  />
                </figure>

              </div>
            </div>
          </div>
        ))}
      </div>


      {loading && (
        <div className="py-4">
          <progress class="progress is-small is-primary" max="100">
            15%
          </progress>
        </div>
      )}

      {results.length > 0 && (
        <button class="button is-light is-fullwidth" onClick={getMore}>
          Show more
        </button>
      )}
      <footer>
        <div className="content has-text-centered py-4">
          <p>Icons from <a href="https://icons8.com/">icons8.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
