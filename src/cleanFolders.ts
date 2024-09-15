import fs from "fs";
import path from "path";

export const cleanFolders = async () => {
  const folders = [
    path.resolve(__dirname, "datasets"),
    path.resolve(__dirname, "downloads"),
  ];

  for (const folder of folders) {
    if (!fs.existsSync(folder)) return;

    fs.readdirSync(folder)
      .filter((file) => file !== ".gitkeep")
      .map(async (file) => {
        fs.unlinkSync(folder.concat("/" + file));
      });
  }
};
