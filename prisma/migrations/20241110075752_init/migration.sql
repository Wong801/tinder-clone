-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "SwipeActionEnum" AS ENUM ('PASS', 'LIKE');

-- CreateTable
CREATE TABLE "mst_genders" (
    "gender_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "value" TEXT NOT NULL,

    CONSTRAINT "mst_genders_pkey" PRIMARY KEY ("gender_id")
);

-- CreateTable
CREATE TABLE "mst_zodiacs" (
    "zodiac_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "value" TEXT NOT NULL,

    CONSTRAINT "mst_zodiacs_pkey" PRIMARY KEY ("zodiac_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "username" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    "pin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "user_profile_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "gender_id" UUID,
    "zodiac_id" UUID,
    "full_name" TEXT,
    "photo" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bio" TEXT,
    "birthDate" DATE,
    "location" TEXT,
    "hometown" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_profile_id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "user_preference_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "gender_id" UUID NOT NULL,
    "radius" INTEGER NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_preference_id")
);

-- CreateTable
CREATE TABLE "matched_users" (
    "matched_user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "matcher_id" UUID NOT NULL,
    "expired_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matched_users_pkey" PRIMARY KEY ("matched_user_id")
);

-- CreateTable
CREATE TABLE "user_actions" (
    "user_action_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "from_user_id" UUID NOT NULL,
    "to_user_id" UUID NOT NULL,
    "action" "SwipeActionEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_actions_pkey" PRIMARY KEY ("user_action_id")
);

-- CreateTable
CREATE TABLE "user_premium_requests" (
    "user_action_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_processed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_premium_requests_pkey" PRIMARY KEY ("user_action_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mst_genders_value_key" ON "mst_genders"("value");

-- CreateIndex
CREATE UNIQUE INDEX "mst_zodiacs_value_key" ON "mst_zodiacs"("value");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_key" ON "user_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_premium_requests_user_id_key" ON "user_premium_requests"("user_id");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "mst_genders"("gender_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_zodiac_id_fkey" FOREIGN KEY ("zodiac_id") REFERENCES "mst_zodiacs"("zodiac_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "mst_genders"("gender_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matched_users" ADD CONSTRAINT "matched_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matched_users" ADD CONSTRAINT "matched_users_matcher_id_fkey" FOREIGN KEY ("matcher_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_actions" ADD CONSTRAINT "user_actions_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_actions" ADD CONSTRAINT "user_actions_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_premium_requests" ADD CONSTRAINT "user_premium_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
