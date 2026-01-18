# 🚀 HUBTI - Portal de APIs e Automações

![HUBTI Banner](https://img.shields.io/badge/HUBTI-Portal%20de%20APIs-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-cyan?style=for-the-badge&logo=tailwindcss)

## 📖 Sobre o Projeto

Portal de APIs da **HUBTI** - Uma empresa focada em **automações**, **inteligência artificial** e **APIs de alta qualidade**. Oferecemos serviços de integração para eliminar todas as fricções na adoção de novas tecnologias.

Este projeto é um **portfólio completo** que demonstra nossas capacidades e integrações disponíveis para empresas que buscam soluções tecnológicas modernas e robustas.

## ✨ Destaques

### 🌟 AAA+++ - IA Studio Powered by Minimax
Nossa plataforma de IA mais avançada! Gere conteúdo com tecnologia de ponta:
- 🎨 **Geração de Imagens** - Transforme ideias em imagens incríveis
- 🎬 **Geração de Vídeos** - Crie vídeos profissionais com IA
- 🎵 **Geração de Áudio** - Sintetize voz e áudio de alta qualidade
- 📝 **Geração de Texto** - Crie textos, artigos e conteúdo com IA avançada

### 💚 AA++ - Gerador de PIX QR Code
Solução completa e segura para pagamentos PIX:
- 🔄 Geração instantânea de QR Code
- 📋 Código PIX Copia e Cola
- ✅ 100% compatível com padrão BACEN
- 🚀 Fácil integração em qualquer sistema

## 🔌 Integrações Disponíveis

### ⚽ Football API
Dados em tempo real de competições, times e partidas de futebol do mundo todo.
- Integração com Football-Data.org
- Competições globais
- Partidas ao vivo
- Estatísticas completas

### 🚴 Transporte Público (CityBikes)
Informações sobre sistemas de bicicletas compartilhadas em cidades globais.
- 500+ cidades
- Dados em tempo real
- Disponibilidade de estações
- Cobertura mundial

### 📺 YouTube Downloader
Download de vídeos do YouTube de forma rápida e eficiente.
- Download em alta qualidade
- Suporte a múltiplos formatos
- Extração de áudio (MP3)
- Interface simples e intuitiva

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com SSR e App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Estilização moderna e responsiva
- **Lucide React** - Ícones modernos e elegantes
- **QRCode** - Geração de QR Codes
- **Axios** - Cliente HTTP para requisições

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/socialbot114-cell/Hubti.git

# Entre no diretório
cd Hubti

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas chaves de API

# Execute em modo de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Executar em produção
npm start
```

## 🔑 Configuração de APIs

Este projeto utiliza as seguintes APIs:

1. **Football API** - [football-data.org](https://www.football-data.org/)
   - Obtenha sua chave gratuita em: https://www.football-data.org/client/register

2. **Minimax AI** - [platform.minimax.io](https://platform.minimax.io/)
   - Cadastre-se e obtenha sua API key

3. **CityBikes** - [api.citybik.es](https://api.citybik.es/)
   - API pública, sem necessidade de autenticação

4. **YouTube Downloader** - Implementação customizada
   - Para uso em produção, considere integrar com ytdl-core

## 🔧 Troubleshooting

Encontrou algum problema? Consulte nosso **[Guia de Troubleshooting](TROUBLESHOOTING.md)** com:
- ✅ Soluções para erros comuns
- 🐛 Como debugar problemas de API
- 📝 Logs detalhados e exemplos
- 🧪 Como testar endpoints diretamente

**Problemas comuns:**
- ❌ **API de IA não funciona**: Verifique a chave no `.env` e consulte logs do servidor
- ❌ **Football API erro 429**: Limite de requisições excedido, aguarde 1 minuto
- ❌ **PIX QR Code não gerado**: Verifique se todos os campos obrigatórios estão preenchidos

## 📁 Estrutura do Projeto

```
Hubti/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Layout principal
│   │   ├── globals.css           # Estilos globais
│   │   ├── ai/                   # Página IA Studio (AAA+++)
│   │   ├── pix/                  # Página PIX QR Code (AA++)
│   │   ├── football/             # Página Football API
│   │   ├── transport/            # Página Transporte
│   │   ├── youtube/              # Página YouTube
│   │   └── api/                  # Rotas de API
│   │       ├── ai/
│   │       ├── pix/
│   │       ├── football/
│   │       ├── transport/
│   │       └── youtube/
│   └── components/
│       ├── Header.tsx            # Cabeçalho
│       ├── Footer.tsx            # Rodapé
│       └── ApiCard.tsx           # Card de API
├── public/                       # Arquivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 💼 Serviços HUBTI

A HUBTI oferece mais do que APIs prontas. Fornecemos:

✅ **Integrações Customizadas** - Implementamos APIs específicas para seu negócio
✅ **Consultoria Técnica** - Ajudamos a escolher as melhores soluções
✅ **Suporte Dedicado** - Equipe disponível para tirar dúvidas
✅ **Manutenção Contínua** - Mantemos suas integrações sempre atualizadas
✅ **Soluções em IA** - Implementamos IA nos seus processos
✅ **Automações Inteligentes** - Otimizamos fluxos de trabalho

## 🎯 Por que escolher a HUBTI?

- ⚡ **Rápida Implementação** - Reduza semanas para minutos
- 🔒 **Segurança Garantida** - Seguimos os mais altos padrões
- 🚀 **Suporte Completo** - Estamos aqui para ajudar
- 💡 **Inovação Constante** - Sempre atualizados com as últimas tecnologias
- 🎓 **Expertise Comprovada** - Anos de experiência em integrações

## 📞 Contato

- 📧 Email: contato@hubti.com
- 🌐 Website: www.hubti.com
- 💻 GitHub: github.com/hubti

## 📄 Licença

Este projeto é um portfólio da HUBTI. Entre em contato para informações sobre licenciamento e uso comercial.

---

<div align="center">

**HUBTI** - Simplificando a adoção de tecnologia através de integrações de alta qualidade

🌟 **Transforme seu negócio com nossas APIs e automações** 🌟

</div>
