-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "asal_sekolah" TEXT,
    "email" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_email_key" ON "Mahasiswa"("email");
