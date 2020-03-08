// export const doc = document.addEventListener('DOMContentLoaded', initPlayer);
export function docAPI() {
  document.addEventListener('DOMContentLoaded', initPlayer);
  function initPlayer() {
      DZ.init({
          appId: '395144',
          channelUrl: 'http://mypleerNoer.com/channel.html',
          player: {
              container: 'dz-root',
              width: 450,
              height: 450,
              format: 'square',
              onload: function () {
              }
          }
      });
  }
}

export async function fetchAPI() {
  //let response = await fetch("https://cors-anywhere.herokuapp.com/https://e-cdns-images.dzcdn.net/images/cover/19ab30161fa33322d3b9e43da4b8fb5d/450x450-000000-100-1-1.jpg");
  let urlFetch = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/artist/picture";
  let response = await fetch(urlFetch);
  // let user = await response.json();
  if (response.status == 200) {
      console.log(response);
      response.json().then(data=>{
      console.log(data);
      let pictureArtist = document.getElementById("picture");
      let imageArtist = document.createElement("img");
      imageArtist.className = "imageArtist";
      pictureArtist.appendChild(imageArtist);
      imageArtist.src = data.picture;
      //console.log(data.preview);
    });
  }
  else
    throw new Error(response.status);
}



export function inputPleer() {
  let inputSearchName = document.getElementById("inputSearchName");
  let inputSearchTrack = document.getElementById("inputSearchTrack");
  let searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        let request = new XMLHttpRequest();
        let url = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=artist:'";
      //  let urlTrack = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=track:'";
        if(inputSearchTrack.value != "" && inputSearchName.value != "") {
          url += inputSearchName.value + "'" + "track:'" + inputSearchTrack.value + "'";
        }
        else if (inputSearchName.value != "") {
            url += inputSearchName.value + "'";
        }
        else if (inputSearchTrack.value != "") {
            url += "'" + "track:'" + inputSearchTrack.value + "'";
        }
        //console.log(url);

        fetchAPI();
        request.open('GET', url);
        request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let array = JSON.parse(request.responseText);
            if(typeof array.data[0] != "undefined"){
                DZ.player.playTracks([array.data[0].id]);
            }
            else{
                alert("К сожаления ничего не найдено");
            }
        }
    });
    request.send();
    });
  }
}
//inputPleer();
