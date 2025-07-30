import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("https://streamtpglobal.com/eventos.html", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    const texto = $("body").text().replace(/\s+/g, " ").trim();

    res.status(200).json({ texto });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "No se pudo copiar el texto" });
  }
}