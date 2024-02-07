## init

```shell
npm init -y
npm i typescript -D
npx tsc --init
```


### Organização de pastas para models vs entity

    .
    ├── ...
    │
    ├── domain                  // Complexidade de negócio 
    │   ├── entity 
    │   │   ├── customer.ts     // Regras de negócio
    │   │   └── ...
    │   └── ..
    │
    ├── infra                   // Complexidade acidental
    │   ├── entity/model        // Mundo externo
    │   │   ├── customer.ts     // gets e sets
    │   │   └── ...
    │   └── ...
    └── ...
