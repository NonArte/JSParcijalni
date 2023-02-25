const url =
  "https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=";

async function getData(term) {
  const data = await fetch(url + term);
  const response = await data.json();
  return response;
}

function search(ev) {
  ev.preventDefault();
  const formData = new FormData(form);
  const text = formData.get("text");
  let term = text;
  form.reset();
  const body = document.querySelector("#result");

  getData(term).then((res) => {
    console.log("getData", getData(term));
    if (res.results.length > 1) {
      clear();
      res.results.forEach((el) => {
        const dl = document.createElement("dl");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        const a = document.createElement("a");
        a.setAttribute("href", `${el.artistLinkUrl}`);
        a.setAttribute("target", "_blank");
        a.innerText = el.artistName;
        dd.innerText = el.primaryGenreName;
        body.appendChild(dl);
        dl.appendChild(dt);
        dt.appendChild(a);
        dl.appendChild(dd);
      });
    } else {
      console.log("ne ne ne");
    }
  });
}
function clear() {
  const body = document.querySelectorAll("dl");
  for (let i = 0; i < body.length; i++) {
    body[i].remove();
  }
}

form.addEventListener("submit", (ev) => search(ev));
