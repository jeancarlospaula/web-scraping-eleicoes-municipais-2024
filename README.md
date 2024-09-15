# Web Scrapping Eleições 2024

### Como rodar? 
- Clonar o repositório
- Rodar `npm install`
- Renomer `.env.example` para `.env`
- Rodar `docker compose up`
- Rodar `npx prisma migrate dev`
- Rodar `npm run dev`

Após todos os dados serem extraídos, limpos e salvos, basta acessar o Metabase e realizar a análise em:
- `http://localhost:3000`