import axios from "axios";

// Aşağıdaki Fonksiyonu değiştirmeyin

export async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

/*

	ADIM 1: Aşağdıdaki getData() fonskiyonunda axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız:
  https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen data'yı(obje) geri dönmeli
	
	NOT: ipAdresinizi ipAdresimiAl fonksiyonu ile alabilirsiniz.

  NOT2: gelen datayı browser'da network tab'ından inceleyin. 
  (network tab'ından inceleyemezseniz get isteklerinin URL'ini browser'dan açıp da kontrol edebilirsiniz. 😉)

  Bu data Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor, önden içindeki verilere(key-Value ikililerine) bakmanız iyi olur).
*/

export async function getData() {
  return ipAdresimiAl()
    .then((ipAdresiniz) => {
      return axios.get(`https://apis.ergineer.com/ipgeoapi/${ipAdresiniz}`);
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("işlem başarılı");
    });
}

/*
	ADIM 2: Aşağıdaki cardOlustur fonskiyonunu argüman olarak sadece 1 nesne alacak şekilde tanımlayın.

  Bu fonksiyonda DOM metotlarını ve özelliklerini kullanarak, aşağıdaki element'i oluşturup dönün.

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/TR.png';
	
	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

export function cardOlustur(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  const flag = document.createElement("img");
  flag.src = `https://flaglog.com/codes/standardized-rectangle-120px/${data.ülkeKodu}.png`;
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  const ip = document.createElement("h3");
  ip.classList.add("ip");
  ip.textContent = data.sorgu;
  const ulke = document.createElement("p");
  ulke.classList.add("ulke");
  ulke.textContent = `${data.ülke} (${data.ülkeKodu})`;
  const enlemBoylam = document.createElement("p");
  enlemBoylam.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;
  const sehir = document.createElement("p");
  sehir.textContent = `Şehir: ${data.şehir}`;
  const saat = document.createElement("p");
  saat.textContent = `Saat dilimi: ${data.saatdilimi}`;
  const paraBirimi = document.createElement("p");
  paraBirimi.textContent = `Para birimi: ${data.parabirimi}`;
  const isp = document.createElement("p");
  isp.textContent = `ISP: ${data.isp}`;

  cardInfo.appendChild(ip);
  cardInfo.appendChild(ulke);
  cardInfo.appendChild(enlemBoylam);
  cardInfo.appendChild(sehir);
  cardInfo.appendChild(saat);
  cardInfo.appendChild(paraBirimi);
  cardInfo.appendChild(isp);

  card.appendChild(flag);
  card.appendChild(cardInfo);
  const cards = document.querySelector(".cards");
  cards.appendChild(card);
}
