## Rotas

<br/>

### **GET** /rental

Retorna informações sobre casas e apartamentos para alugar

- `/rental`

Por padrão retorna um array com a primeira página de resultados, ou seja, os primeiros 20 resultados no banco de dados.

- `/rental?page=<number>`

Especifica qual página de resultados buscar. Retorna um array com os 20 primeiros resultados dessa página.