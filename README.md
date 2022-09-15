
# Getting Started

### 1 - Create a Postgres Database
### 2 - Run the SQL queries below (this part will be integrated to the code later 😉)
#### Units
```
CREATE TABLE IF NOT EXISTS UNITS (
  ID SERIAL      PRIMARY KEY NOT NULL,
  DESCRIPTION    VARCHAR(36),
  UNIT           VARCHAR(6) UNIQUE NOT NULL,
  ALLOW_DECIMALS BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO UNITS (DESCRIPTION, UNIT, ALLOW_DECIMALS)
           VALUES ('GRAMA'         , 'G'     , FALSE)
                 ,('JOGO '         , 'JOGO'  , FALSE)
                 ,('LITRO'         , 'LT'    , TRUE )
                 ,('MEGAWATT HORA' , 'MWHORA', FALSE)
                 ,('METRO'         , 'METRO' , TRUE )
                 ,('METRO CUBICO'  , 'M3'    , TRUE )
                 ,('METRO QUADRADO', 'M2'    , TRUE )
                 ,('MIL UNIDADES'  , '1000UN', FALSE)
                 ,('PARES'         , 'PARES' , FALSE)
                 ,('QUILATE'       , 'QUILAT', FALSE)
                 ,('QUILOGRAMA'    , 'KG'    , TRUE )
                 ,('UNIDADE'       , 'UN'    , FALSE);
```
#### Categories
```
CREATE TABLE IF NOT EXISTS CATEGORIES(
  ID SERIAL   PRIMARY KEY  NOT NULL,
  DESCRIPTION VARCHAR(128) NOT NULL
);
```
#### Products
```
CREATE TABLE PRODUCTS(
   ID             SERIAL PRIMARY KEY NOT NULL
  ,NAME           VARCHAR(255)  NOT NULL
  ,COST           NUMERIC(10,2) NOT NULL DEFAULT 0
  ,PRICE          NUMERIC(10,2) NOT NULL
  ,QUANTITY       NUMERIC(10,2) NOT NULL
  ,BARCODE        VARCHAR(255)  
  ,DESCRIPTION    VARCHAR(255)  NOT NULL DEFAULT ''
  ,ID_CATEGORY    INTEGER  references categories(id) NOT NULL
  ,ID_UNIT        INTEGER  references units(id)      NOT NULL
  ,EXPIRATIONDATE DATE          
  ,ID_SUPPLIER    INTEGER  
  ,LIQUIDWEIGHT   NUMERIC(10,2) 
  ,BRUTEWEIGHT    NUMERIC(10,2) 
  ,WIDTH          NUMERIC(10,2) 
  ,HEIGHT         NUMERIC(10,2) 
  ,LENGTH         NUMERIC(10,2) 
);
```

### 3 - Configure your database in ./src/config/env.ts
#### It should look like this (remove the brackets):
```
const config = {
  PgUser: process.env.PG_USER || "postgres",
  PgHost: process.env.PG_HOST || "[your_host]", //possibly localhost
  PgDatabase: process.env.PG_DATABASE || "[your_database]",
  PgPassword: process.env.PG_PASSWORD || "[your_postgres_password]",
  PgPort: (process.env.PG_PORT || [your_postgres_port]) as number,
}
```

#### this part will be moved later to a .env file