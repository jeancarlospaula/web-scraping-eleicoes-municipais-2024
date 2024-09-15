import path from "path";
import fs from "fs";
import csv from "csvtojson";
import { db } from "./database/prisma";

function parseDateBR(date: string) {
  const parts = date.split("/");

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  const formattedDate = `${year}-${month}-${day}`;

  return new Date(formattedDate);
}

const calculateAge = (born: string, target: string) => {
  const bornDate = parseDateBR(born);
  const targetDate = parseDateBR(target);

  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();

  const bornMonth = bornDate.getMonth();
  const bornDay = bornDate.getDate();

  let age = targetDate.getFullYear() - bornDate.getFullYear();

  if (
    targetMonth < bornMonth ||
    (targetMonth === bornMonth && targetDay < bornDay)
  ) {
    age--;
  }

  return age;
};

async function* processDataCSV(csvPath: string) {
  const readStream = fs.createReadStream(csvPath, {
    encoding: "latin1",
  });

  const csvStream = await csv({
    delimiter: ";",
  }).fromStream(readStream);

  type Cargo = "VEREADOR" | "PREFEITO" | "VICE-PREFEITO";

  for await (const row of csvStream) {
    const formattedData = {
      cargo: row.DS_CARGO as Cargo,
      data: {
        uf: row.SG_UF,
        municipio: row.NM_UE,
        numero: Number(row.NR_CANDIDATO),
        turno: Number(row.NR_TURNO),
        idade: row.DT_NASCIMENTO
          ? calculateAge(row.DT_NASCIMENTO, row.DT_ELEICAO)
          : null,
        nome: row.NM_CANDIDATO,
        nome_urna: row.NM_URNA_CANDIDATO,
        numero_partido: Number(row.NR_PARTIDO),
        sigla_partido: row.SG_PARTIDO,
        nome_partido: row.NM_PARTIDO,
        nome_coligacao: row.NM_COLIGACAO,
        dt_nascimento: row.DT_NASCIMENTO || null,
        genero: row.DS_GENERO,
        escolaridade: row.DS_GRAU_INSTRUCAO,
        estado_civil: row.DS_ESTADO_CIVIL,
        cor_raca: row.DS_COR_RACA,
        ocupacao: row.DS_OCUPACAO,
      },
    };

    yield formattedData;
  }
}

export async function datasetETL() {
  const startDate = new Date();

  console.time("datasetETL");

  const datasetsPath = path.join(__dirname, "datasets");

  const datasets = fs
    .readdirSync(datasetsPath)
    .filter((file) => path.extname(file) === ".csv");

  const contagem = {
    VEREADOR: 0,
    PREFEITO: 0,
    "VICE-PREFEITO": 0,
    TOTAL: 0,
  };

  for (const dataset of datasets) {
    console.log(`Iniciado processamento do arquivo ${dataset}.`);
    console.time(dataset);

    const csvPath = path.join(datasetsPath, dataset);

    const lineIterator = processDataCSV(csvPath);

    for await (const row of lineIterator) {
      const query = {
        where: {
          numero_municipio_uf: {
            numero: row.data.numero,
            municipio: row.data.municipio,
            uf: row.data.uf,
          },
        },
        create: row.data,
        update: row.data,
      };

      if (row.cargo === "VEREADOR") {
        await db.vereadores.upsert(query);
        contagem["VEREADOR"]++;
      }

      if (row.cargo === "PREFEITO") {
        await db.prefeitos.upsert(query);
        contagem["PREFEITO"]++;
      }

      if (row.cargo === "VICE-PREFEITO") {
        await db.vicePrefeitos.upsert(query);
        contagem["VICE-PREFEITO"]++;
      }

      contagem["TOTAL"]++;
    }

    console.log(`Arquivo ${dataset} processado e salvo no banco.`);
    console.timeEnd(dataset);
  }

  const deleteQuery = {
    where: {
      updated_at: {
        lt: startDate,
      },
    },
  };

  const [
    { count: vereadoresDeletados },
    { count: prefeitosDeletados },
    { count: vicePrefeitosDeletados },
  ] = await Promise.all([
    db.vereadores.deleteMany(deleteQuery),
    db.prefeitos.deleteMany(deleteQuery),
    db.vicePrefeitos.deleteMany(deleteQuery),
  ]);

  console.table(contagem);

  console.table({
    "VEREADORES DELETADOS": vereadoresDeletados,
    "PREFEITOS DELETADOS": prefeitosDeletados,
    "VICE-PREFEITOS DELETADOS": vicePrefeitosDeletados,
  });

  console.timeEnd("datasetETL");
}
