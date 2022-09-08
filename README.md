## Rotas

### **GET** /rental

- `/rental`

Por padrão retorna um array com a primeira página de resultados, ou seja, os primeiros 20 resultados no banco de dados.

<details>
  <summary>Queries possíveis</summary>

- `?page=<num>`

  Especifica qual página buscar

- `?bedrooms=<num>`

  Filtra imóveis por número de quartos. Um `<num>` maior ou igual à 4 retorna todos que tenham um número de quartos maior ou igual à `<num>`

- `?bathrooms=<num>`

  Filtra imóveis por número de banheiros. Um `<num>` maior ou igual à 4 retorna todos que tenham um número de banheiros maior ou igual à `<num>`

- `?parking=<num>`

  Filtra imóveis por número de vagas de estacionamento. Um `<num>` maior ou igual à 4 retorna todos que tenham um número de vagas de estacionamento maior ou igual à `<num>`

- `?hoa[min]=<num1>` & `?hoa[max]=<num2>`

  Filtra imóveis que tenham um valor de condomínio entre `<num1>` e `<num2>`

- `?rent[min]=<num1>` & `?rent[max]=<num2>`

  Filtra imóveis que tenham um valor de aluguel entre `<num1>` e `<num2>`

- `?area[min]=<num1>` & `?rent[max]=<num2>`

  Filtra imóveis que tenham uma área total entre `<num1>` e `<num2>`

- `?price[min]=<num1>` & `?price[max]=<num2>`

  Filtra imóveis que tenham um valor de condomínimo + aluguel entre `<num1>` e `<num2>`

- `?state=<id>` Ou `?state=<id>,<id>,<id>`

  Filtra imóveis que estejam nos estados específicados

- `?city=<id>` Ou `?city=<id>,<id>,<id>`

  Filtra imóveis que estejam nas cidades específicadas

- `?am=<id>` Ou `?am=<id>,<id>,<id>`

  Filtra imóveis que ofereçam os serviços específicados

</details>

<details>
  <summary>Response schema</summary>

```typescript
{
  page: number,
  pageTotal: number,
  rental: [
    {
      id: number,
      area: number,
      bedrooms: number,
      bathrooms: number,
      parking: number,
      floor: number,
      animal: boolean,
      furnished: boolean,
      hoa: number,
      rent: number,
      tax: number,
      fireInsurance: number,
      address: {
        id: number,
        latitude: number,
        longitude: number,
        neighborhood: string,
        zipcode: string,
        street: string,
        streetNumber: string,
        city: string,
        state: {
          long: string,
          short: string,
        }
      }
    },
    ...
  ]
}
```

</details>

### **GET** /amenities

- `/amenities`

Retorna todos os serviços registrados assim como suas categorias.

<details>
  <summary>Response schema</summary>

```typescript
[
  {
    id: number,
    name: string,
    category: string,
  },
  ...
]
```

</details>

- `/amenities/rental/:rentalId`

Retorna todos os serviços oferecidos em uma casa ou apartamento, caso não haja nenhum retorna um array vazio.

<details>
  <summary>Response schema</summary>

```typescript
{
  id: number,
  name: string,
  category: string,
}
```

</details>

### **GET** /cities

- `/cities`

Retorna uma lista com todas as cidades registradas no banco de dados.

<details>
  <summary>Response schema</summary>

```typescript
[
  {
    id: number,
    name: string,
    state: string,
  },
  ...
]
```

</details>

### **GET** /states

- `/states`

Retorna uma lista com todos os estados registrados no banco de dados.

<details>
  <summary>Response schema</summary>

```typescript
[
  {
    id: number,
    name: string,
    short: string,
  },
  ...
]
```

</details>
