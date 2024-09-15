-- CreateTable
CREATE TABLE "vereadores" (
    "nome" TEXT NOT NULL,
    "nome_urna" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "dt_nascimento" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "cor_raca" TEXT NOT NULL,
    "ocupacao" TEXT NOT NULL,
    "escolaridade" TEXT NOT NULL,
    "turno" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "numero_partido" INTEGER NOT NULL,
    "sigla_partido" TEXT NOT NULL,
    "nome_partido" TEXT NOT NULL,
    "nome_coligacao" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,

    CONSTRAINT "vereadores_pkey" PRIMARY KEY ("numero","municipio","uf")
);

-- CreateTable
CREATE TABLE "prefeitos" (
    "nome" TEXT NOT NULL,
    "nome_urna" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "dt_nascimento" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "cor_raca" TEXT NOT NULL,
    "ocupacao" TEXT NOT NULL,
    "escolaridade" TEXT NOT NULL,
    "turno" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "numero_partido" INTEGER NOT NULL,
    "sigla_partido" TEXT NOT NULL,
    "nome_partido" TEXT NOT NULL,
    "nome_coligacao" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,

    CONSTRAINT "prefeitos_pkey" PRIMARY KEY ("numero","municipio","uf")
);

-- CreateTable
CREATE TABLE "vice_prefeitos" (
    "nome" TEXT NOT NULL,
    "nome_urna" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "dt_nascimento" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "cor_raca" TEXT NOT NULL,
    "ocupacao" TEXT NOT NULL,
    "escolaridade" TEXT NOT NULL,
    "turno" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "numero_partido" INTEGER NOT NULL,
    "sigla_partido" TEXT NOT NULL,
    "nome_partido" TEXT NOT NULL,
    "nome_coligacao" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,

    CONSTRAINT "vice_prefeitos_pkey" PRIMARY KEY ("numero","municipio","uf")
);
