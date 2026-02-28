-- CreateTable
CREATE TABLE "Planta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "especie" TEXT,
    "habitat" TEXT NOT NULL,
    "riesgo" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagenUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
