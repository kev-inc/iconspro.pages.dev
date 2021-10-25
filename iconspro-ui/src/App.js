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

  return (
    <div className="container">
      <form onSubmit={search} class="mb-4">
        <h3 class="is-size-3">IconsPro Search</h3>
        <div class="field is-grouped">
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
            <a class="button is-info" onClick={search}>
              Search
            </a>
          </p>
        </div>
      </form>

      {results.map((item, index) => (
        <a
          class="m-4"
          href={`https://img.icons8.com/${item["platform"]}/${size}/${color}/${item["commonName"]}.png`}
          target="_blank"
        >
          <img
            src={`https://img.icons8.com/${item["platform"]}/64/${
              color.length > 0 ? color : "000000"
            }/${item["commonName"]}.png`}
            alt={item["id"]}
          />
        </a>
      ))}

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
        <div className="content has-text-centered">
          <p>Icons from icons8.com</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
