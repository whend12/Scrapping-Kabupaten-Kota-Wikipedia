const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://id.wikipedia.org/wiki/Daftar_kabupaten_dan_kota_di_Kalimantan_Barat"; //ganti url dengan url yang ingin di scrape

async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    $("table.wikitable tbody tr").each((index, element) => {
      const row = $(element);
      const cells = row.find("td");

      if (cells.length > 0) {
        const kabupatenKota = $(cells[1]).text().trim(); // Mengambil nama kabupaten/kota
        results.push(kabupatenKota);
      }
    });

    console.log(results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

scrapeData();
