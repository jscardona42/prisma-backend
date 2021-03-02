/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : PostgreSQL
 Source Server Version : 120006
 Source Host           : localhost:5432
 Source Catalog        : prisma
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120006
 File Encoding         : 65001

 Date: 02/03/2021 16:30:37
*/


-- ----------------------------
-- Sequence structure for Post_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Post_id_seq";
CREATE SEQUENCE "public"."Post_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for User_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."User_id_seq";
CREATE SEQUENCE "public"."User_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Post
-- ----------------------------
DROP TABLE IF EXISTS "public"."Post";
CREATE TABLE "public"."Post" (
  "authorId" int4,
  "content" text COLLATE "pg_catalog"."default",
  "id" int4 NOT NULL DEFAULT nextval('"Post_id_seq"'::regclass),
  "published" bool NOT NULL DEFAULT false,
  "title" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of Post
-- ----------------------------
INSERT INTO "public"."Post" VALUES (1, 'Nuevo contenido', 1, 'f', 'Título nuevo');

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "public"."User";
CREATE TABLE "public"."User" (
  "id" int4 NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
  "name" text COLLATE "pg_catalog"."default",
  "email" text COLLATE "pg_catalog"."default" NOT NULL,
  "password" text COLLATE "pg_catalog"."default",
  "token" text COLLATE "pg_catalog"."default",
  "salt" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO "public"."User" VALUES (3, 'Textron', 'jcardona@tiresia.co', '$2a$10$/Gd2cSd5kGGOZSKtFKKAEu6ZANWA1aZTbDdLs1Zhoe2nRxgdLktN6', NULL, '$2a$10$/Gd2cSd5kGGOZSKtFKKAEu');
INSERT INTO "public"."User" VALUES (4, 'Usuario3', 'usuario3@gmail.com', '$2a$10$WAM9X4yfeqQu7feJRdtHSexDVNPNDCERyyfZF.RSRsuhK26ZbFLCq', NULL, '$2a$10$WAM9X4yfeqQu7feJRdtHSe');
INSERT INTO "public"."User" VALUES (6, 'Usuario 5', 'usuario5@gmail.com', '$2a$10$oacwVi0DiHWDUxmriSSjq.ECOZmt0eMPUt23nZelTLo/fRuSksKUu', NULL, '$2a$10$oacwVi0DiHWDUxmriSSjq.');
INSERT INTO "public"."User" VALUES (5, 'Usuario4', 'usuario4@gmail.com', '$2a$10$TvtuNqotkKnAMlkyLMAkke/yGaP4sumvyVj/lxu70ZrZYCGa9cvYS', NULL, '$2a$10$TvtuNqotkKnAMlkyLMAkke');
INSERT INTO "public"."User" VALUES (7, 'Usuario7', 'usuario7@gmail.com', '$2a$10$FFWpGkJcQWF8sMOZEcwgt.aS.ziP/wsgUIEuZdj0XbnCy7P8UFRQ2', NULL, '$2a$10$FFWpGkJcQWF8sMOZEcwgt.');
INSERT INTO "public"."User" VALUES (8, 'Usuario8', 'usuario8@gmail.com', '$2a$10$sj5yMPhM4DBMemLxwVT4KO5EWlpKJwHm4kJGIguoSx3vyAm7AMeLO', NULL, '$2a$10$sj5yMPhM4DBMemLxwVT4KO');
INSERT INTO "public"."User" VALUES (9, 'Usuario9', 'usuario9@gmail.com', '$2a$10$HxtKLLYUpWSEwtJTcvwOGOP2zFPAi.1tCUk7HfllQx.ZdFDn9RizW', NULL, '$2a$10$HxtKLLYUpWSEwtJTcvwOGO');
INSERT INTO "public"."User" VALUES (1, 'Usuario 1', 'usuario1@gmail.com', '$2a$10$mIuz42aR7dldwb45m4FrDuj.A6IQIQV4dT563kdOdkPCL7HpKQZvu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNDcxOTA0NCwiZXhwIjoxNjE0NzIyNjQ0fQ.okH3xY5h3oxNixaOWFc9wbm1lNMwjXBGSGdq3sx8bYs', '$2a$10$mIuz42aR7dldwb45m4FrDu');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Post_id_seq"
OWNED BY "public"."Post"."id";
SELECT setval('"public"."Post_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."User_id_seq"
OWNED BY "public"."User"."id";
SELECT setval('"public"."User_id_seq"', 13, true);

-- ----------------------------
-- Primary Key structure for table Post
-- ----------------------------
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "public"."User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Post
-- ----------------------------
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
