// APIキー（APIキーは削除しています）
apiKey = 'ddbaf08feecb56297fd2f5b525d4ac47';

// dataクラスの要素を取得
const weather = document.querySelector('.weather');

// 都市リスト
const cities = {
  Tokyo: '東京',
  Osaka: '大阪',
  Fukuoka: '福岡',
  Sapporo: '札幌',
}

// HTML出力初期化
let html = '';

// OpenWeather APIデータ取得
const openWeather = async (city, cityName) => {
  try {
    // 天気予報データを取得するためのURL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ja&units=metric&appid=${apiKey}`;

    // fetchが解決されるまで待つ
    const response = await fetch(url);

    // response.jsonが解決されるまで待つ
    const data = await response.json();
    
    /* 
    【HTMLの内容をテンプレートリテラルで登録】
    weather[0].description → 天気
    weather[0].icon → アイコン
    main.temp → 気温
    wind.speed → 風速
    */
    html += `
      <article class="p-2 border border-success">
        <h4 class="mb-3 text-decoration-underline">${cityName}の天気</h4>
        <section class="weather-data">
          <div>天気</div><div>${data.weather[0].description}</div>
          <div>アイコン</div><div><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></div>
          <div>気温</div><div>${Math.round(data.main.temp)}℃</div>
          <div>風速</div><div>${data.wind.speed} (m/s)</div>
        </section>
      </article>
    `;
  } catch (e) {
    alert(`天気情報取得に失敗しました：${e}`);
  }
};

// 全ての都市の天気データを取得して表示（即時実行関数 IIFE）
(async () => {
  for (let city in cities) {
    await openWeather(city, cities[city])
  }
  // DOM操作でdataクラスにHTMLを出力
  weather.innerHTML = html;
})();