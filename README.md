# BLACK CELL Gestão

PWA mobile-first para o controle interno da Black Cell: estoque de iPhones, clientes, vendas parceladas, cobranças e relatórios. Não há e-commerce ou catálogo público.

## Rodar localmente

1. Instale o Node.js 20 ou superior.
2. No diretório do projeto, execute `npm install`.
3. Copie `.env.example` para `.env` e preencha as variáveis quando for integrar os serviços.
4. Execute `npm run dev` e abra a URL apresentada pelo Vite.

Na primeira execução, o app cria dados de demonstração e persiste as ações no navegador, para que possa ser usado imediatamente. Para uso compartilhado entre pessoas, configure o Supabase conforme a próxima seção: uma hospedagem Vercel sozinha não compartilha dados entre celulares/computadores.

## Banco de dados / Supabase

O arquivo [supabase/schema.sql](./supabase/schema.sql) contém o esquema PostgreSQL recomendado. Crie um projeto no Supabase e execute o SQL no editor da plataforma. Cadastre no painel da Vercel `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` para o frontend, além de `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` apenas em rotas de backend. Nunca exponha a service role key no app.

### Acesso individual para cada pessoa

Git e Vercel colocam o site online, mas não criam contas nem separam os dados por pessoa. Para cada usuário entrar e ver apenas o próprio estoque, vendas e cobranças, a versão de produção precisa usar **Supabase Auth** (login) e regras de segurança do banco (RLS), vinculando cada registro ao usuário autenticado. Não use apenas o armazenamento local do navegador para esse cenário, pois os dados ficariam somente naquele aparelho.

Depois de criar o projeto Supabase, habilite login por e-mail/senha e adicione na Vercel as variáveis públicas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. As chaves privadas ficam apenas no servidor. Esse é o passo necessário antes do deploy público para impedir que uma pessoa veja os dados da outra.

## WhatsApp

`src/services/whatsapp.ts` define o contrato da integração e possui apenas um adaptador mock. Para produção, crie uma rota de backend agendada que:

- consulta parcelas em aberto cujo vencimento é hoje;
- evita novo envio se já houver registro em `whatsapp_messages` para a parcela/data;
- chama a API oficial do WhatsApp usando `WHATSAPP_ACCESS_TOKEN` e `WHATSAPP_PHONE_NUMBER_ID`;
- registra o retorno no banco.

No app, cobranças atrasadas abrem o WhatsApp com o texto pronto e são registradas no estado local. Credenciais nunca devem ser incluídas no frontend.

## PWA e iPhone

O manifest, service worker, ícone e meta tags de iOS já estão incluídos. Publique o projeto com HTTPS, abra a URL no Safari do iPhone, toque em **Compartilhar** e escolha **Adicionar à Tela de Início**. A marca `BC` atual é um placeholder porque a logo oficial não foi enviada; substitua `public/icon.svg` e o componente `Logo` ao recebê-la.

## Deploy na Vercel

Envie o repositório ao GitHub e importe-o na Vercel. Configure as variáveis do `.env.example` no painel **Environment Variables**, escolha o comando `npm run build` (detecção automática) e faça o deploy. Para a automação diária, configure um Cron Job/Vercel Cron que acione sua rota segura de cobranças.
