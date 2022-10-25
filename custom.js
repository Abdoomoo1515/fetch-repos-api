//Main Variables

let theInput = document.querySelector(".get__repos input");
let btn = document.querySelector(".get__button");
let dataSection = document.querySelector(".show__data");

btn.onclick = () => {
  getRepos();
};
let getData = async (apiLink) => {
  let myData = await fetch(apiLink);
  let response = await myData.json();

  return response;
};
function getRepos() {
  if (theInput.value == "") {
    dataSection.innerHTML = "<span>please write Github username</span>";
  } else {
    getData(`https://api.github.com/users/${theInput.value}/repos`).then((data) => {
      
      dataSection.innerHTML = '';

      //loop on repos
      data.forEach(el => {

        let mainDiv = document.createElement('div');
        mainDiv.className = 'd_flex';
        let subDiv = document.createElement('div');
        subDiv.className = 'subDiv';
        let repoName = document.createTextNode(el.name);
        //append text to mainDiv
        mainDiv.appendChild(repoName);

        let theUrl = document.createElement('a');
        theUrl.className = 'visit_link';
        let urlText = document.createTextNode('Visit');
        //add the text to link
        theUrl.appendChild(urlText);

        //add the href to link
        theUrl.href = `https://github.com/${theInput.value}/${el.name}`;
        //add target blanck
        theUrl.setAttribute('target','_blank');
        //add the url to mainDiv
        subDiv.appendChild(theUrl);
        //create stars span
        let stars = document.createElement('span');
        stars.className = 'stars';
        let starsNum = document.createTextNode(`stars ${el.stargazers_count}`);

        stars.appendChild(starsNum);
        //append stars to the mainDiv
        subDiv.appendChild(stars);
        mainDiv.appendChild(subDiv);
        dataSection.appendChild(mainDiv);
      });

      theInput.value = "";
    });
    
  }
}
