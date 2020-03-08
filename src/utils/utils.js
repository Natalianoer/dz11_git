export async function fetchAPI() {
  let response = await fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/23");
  // let response = await fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/picture");
  let user = await response.json();
  if (response.status == 200) {
      console.log(response);
      user.then(data=>{
      //console.log(data);
      let pictureArtist = document.getElementById("picture");
      let imageArtist = document.createElement("img");
      imageArtist.className = "imageArtist";
      pictureArtist.appendChild(imageArtist);
      imageArtist.src = data.picture;
    });
  }
  else
    throw new Error(response.status);
}
