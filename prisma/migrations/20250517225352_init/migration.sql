-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SeasonType" AS ENUM ('PEAK', 'MID', 'OFF');

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,
    "peak_season_price_in_cents" INTEGER NOT NULL,
    "mid_season_price_in_cents" INTEGER NOT NULL,
    "off_season_price_in_cents" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_rentals" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "season_id" TEXT NOT NULL,
    "schedule_code" TEXT NOT NULL,
    "total_amount_in_cents" INTEGER NOT NULL,
    "status" "RentalStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT,

    CONSTRAINT "car_rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "type" "SeasonType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "drive_license" TEXT NOT NULL,
    "drive_license_expiry" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stocks_brand_model_key" ON "stocks"("brand", "model");

-- CreateIndex
CREATE UNIQUE INDEX "car_rentals_schedule_code_key" ON "car_rentals"("schedule_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_rentals" ADD CONSTRAINT "car_rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_rentals" ADD CONSTRAINT "car_rentals_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_rentals" ADD CONSTRAINT "car_rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
