import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const delay = (ms: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

export const downloadZipDataset = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 720 });

  (await page.createCDPSession()).send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: path.resolve(__dirname, "downloads"),
  });

  await page.goto("https://dadosabertos.tse.jus.br");

  await page.evaluate(async () => {
    const link = Array.from(document.querySelectorAll("a")).find(
      (link) => link.innerText.trim() === "Conjuntos de dados"
    );

    link?.click();
  });

  await page.waitForSelector("a");

  await page.evaluate(async () => {
    const link = Array.from(document.querySelectorAll("a")).find((link) =>
      link.innerHTML.includes("Candidatos")
    );

    link?.click();
  });

  await page.waitForSelector("a");

  await page.evaluate(async () => {
    const link = Array.from(document.querySelectorAll("a")).find((link) =>
      link.innerHTML.includes("Candidatos - 2024")
    );

    link?.click();
  });

  const candidatosPageButton = await page.waitForSelector(
    '#dataset-resources .resource-list .resource-item a[title="Candidatos"]'
  );

  await candidatosPageButton?.click();

  await page.waitForSelector("a");

  await page.evaluate(async () => {
    const link = Array.from(document.querySelectorAll("a")).find(
      (link) => link.innerText.trim() === "Ir para recurso"
    );

    link?.click();
  });

  const downloadPath = path.join(__dirname, "downloads");

  let isDatasetDownloaded = fs
    .readdirSync(downloadPath)
    .find((file) => file.endsWith(".zip"));

  while (!isDatasetDownloaded) {
    isDatasetDownloaded = fs
      .readdirSync(downloadPath)
      .find((file) => file.endsWith(".zip"));
  }

  await delay(5000);

  browser.close();
};
