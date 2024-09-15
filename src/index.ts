import { cleanFolders } from "./cleanFolders";
import { datasetETL } from "./datasetETL";
import { downloadZipDataset } from "./downloadZipDataset";
import { unzipDataset } from "./unzipDataset";

const start = async () => {
  await cleanFolders();
  await downloadZipDataset();
  await unzipDataset();

  await datasetETL();
};

start();
