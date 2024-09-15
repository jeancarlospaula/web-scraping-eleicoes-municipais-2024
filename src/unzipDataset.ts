import decompress from "decompress";
import fs from "fs";
import path from "path";

export const unzipDataset = async () => {
  const downloadPath = path.join(__dirname, "downloads");
  const datasetsPath = path.join(__dirname, "datasets");

  const datasetZipPath = fs
    .readdirSync(downloadPath)
    .find((file) => file.endsWith(".zip"));

  await decompress(path.join(downloadPath, datasetZipPath!), datasetsPath, {
    filter: (file) =>
      file.path.endsWith(".csv") && !file.path.includes("BRASIL"),
  });
};
