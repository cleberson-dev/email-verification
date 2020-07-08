DROP TABLE IF EXISTS "public"."User";
DROP TABLE IF EXISTS "public"."UserValidationToken";


CREATE TABLE "public"."User"(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email_confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE "public"."UserValidationToken"(
  user_id INT PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "public"."User" (id)
);