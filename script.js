let mainQush = document.querySelector("main");
let section = document.querySelector(".section_1");
let arrayBig = [];
let qushimchaqush = async function (number) {
  let olibkel1 = await fetch(`https://api.quran.sutanlab.id/surah/${number}`);
  let jsonData1 = await olibkel1.json();
  let qush = jsonData1.data;
  let olibkel = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alaaudeenmansou.json"
  );
  let Json = await olibkel.json();
  console.log(Json);
  console.log(qush);
  let sortUzbek = sortSura(Json.quran);
  html = `<section class="section">
  <div class="div_header">
    <div class="surah_back"><</div>
    <div class="surah_name">${qush.name.transliteration.id}</div>
    <div class="surah_play">Play</div>
  </div></div>
  <div class="surah_name_arab">${qush.name.long}</div>
</section>`;
  document.querySelector(".section_1").insertAdjacentHTML("afterbegin", html);
  oyats(qush);
  tuliqAylantir(qush);
};

let qush = async function () {
  let olibKel = await fetch("https://api.quran.sutanlab.id/surah");
  let JsonData = await olibKel.json();

  let aylantir = JsonData.data;

  for (let data of aylantir) {
    let html = `<div class="div ${data.number}" id="${data.number}">
    <div class="number">${data.number}</div>
    <div class="sura_name">
      <p class="name">${data.name.transliteration.id}</p>
      <p class="author">${data.name.translation.id} <span>• ${data.numberOfVerses} ayat</span></p>
    </div>
  </div>`;
    mainQush.insertAdjacentHTML("beforeend", html);
  }

  console.log(aylantir);
};
qush();
// qushimchaqush();
function oyats(data, sort) {
  let sana1 = data.number - 1;
  let aylan = arrayBig[sana1];
  let sana = 0;
  for (aylantir of data.verses) {
    let html = `<div class="oyat_box">
    <div class="right">
      <p class="oyat_number">
        ${aylantir.number.inSurah}. <span class="oyat_name">${aylantir.text.transliteration.en}'aalameen</span>
      </p>
      <div class="oyat_about">
      <div>${aylantir.translation.en}</div>
            <div>${aylan[sana].text}</div>
            <div class="left">${aylantir.text.arab}</div>
        
      </div>
      <div class="play_music  "  id = ""><img src = "./images/play-button-arrowhead (1).png" class = "${aylantir.number.inSurah} img" id= "${aylantir.number.inSurah}">
      <audio controls class="audio  a${aylantir.number.inSurah}" id = "">
      <source src="${aylantir.audio.secondary[0]}" type="audio/mp3" />
    Your browser does not support the audio element.
     </audio></div>
    </div>
    
 
  </div> 
  
   `;
    document
      .querySelector(".surah_name_arab")
      .insertAdjacentHTML("beforeend", html);
    sana++;
  }
}

function sortSura(array) {
  let arr = [];
  let a = 1;
  for (let i = 0; i < array.length; i++) {
    if (array[i].chapter === a) {
      arr.push(array[i]);
    } else if (array[i].chapter !== a) {
      a++;
      arrayBig.push(arr);
      i--;
      arr = [];
    }
  }
  arrayBig.push(arr);
  console.log(arrayBig);
}

document.querySelector("main").addEventListener("click", (e) => {
  let number = e.target.closest("div").id;
  qushimchaqush(number);
});
document.querySelector(".section_1").addEventListener("click", (e) => {
  if (e.target.classList.contains("surah_back")) {
    document.querySelector(".section").remove();
  }
  console.log(e);
  let sana = e.target.closest("img").id;
  if (e.target.classList.contains(sana)) {
    if (e.target.nextElementSibling.paused) {
      e.target.src = "./images/pause.png";
      e.target.nextElementSibling.play();
    } else {
      e.target.nextElementSibling.pause();
      e.target.src = "./images/play-button-arrowhead (1).png";
    }
  }
});
document.querySelector;
function tuliqAylantir(data) {
  let i = 0;

  let aylantir = data.verses;
  console.log(aylantir[i].audio.secondary[0]);
  document.querySelector("#salom").src = `${aylantir[i].audio.secondary[0]}`;
  document.querySelector(".guzal").addEventListener("ended", function () {
    ++i;
    document.querySelector("#salom").src = `${aylantir[i].audio.secondary[0]}`;
    document.querySelector(".guzal").play();
  });
}
