# 🔧 Guia de Troubleshooting - HUBTI Portal de APIs

## 🤖 API de IA (Minimax)

### ⚠️ IMPORTANTE: GroupId é Obrigatório!

A API Minimax **requer um GroupId** além da chave de API. Sem ele, você receberá erro **404 Not Found**.

#### Como obter seu GroupId:

1. Acesse https://platform.minimax.io/
2. Faça login na sua conta
3. Vá em **"Console"** ou **"Basic Information"**
4. Copie o **GroupId** (geralmente um número longo)
5. Adicione no arquivo `.env`:
   ```bash
   MINIMAX_GROUP_ID=seu_group_id_aqui
   ```
6. **Reinicie o servidor** Next.js

### Problema: Erro ao gerar áudio/imagem/vídeo

#### Verificações básicas:

1. **Verificar GroupId (NOVO!)**
   - ⚠️ O GroupId está configurado no arquivo `.env`?
   - Sem GroupId = erro 404!
   - Obtenha em: https://platform.minimax.io/ > Console > Basic Information

2. **Verificar chave de API**
   - A chave está configurada no arquivo `.env`?
   - A chave está válida e ativa no painel Minimax?
   - Formato correto: `sk-api-...`

2. **Verificar logs do servidor**
   - Olhe os logs do Next.js para ver a resposta completa da API
   - Os logs mostram `[Minimax API]` com detalhes da requisição e resposta

3. **Verificar endpoints**
   - Text: `https://api.minimax.io/v1/chat/completions`
   - Image: `https://api.minimax.io/v1/text_to_image`
   - Video: `https://api.minimax.io/v1/video_generation`
   - Audio: `https://api.minimax.io/v1/t2a_v2`

### Erros comuns:

#### `404 Not Found` ⚠️ MAIS COMUM
- **Causa**: **GroupId não configurado** ou endpoint incorreto
- **Solução**:
  1. Verifique se `MINIMAX_GROUP_ID` está no `.env`
  2. Obtenha o GroupId em https://platform.minimax.io/
  3. Reinicie o servidor após adicionar
  4. Veja os logs: deve aparecer mensagem clara sobre GroupId faltando

#### `401 Unauthorized`
- **Causa**: Chave de API inválida ou expirada
- **Solução**: Verifique a chave no arquivo `.env` e no painel Minimax

#### `403 Forbidden`
- **Causa**: Limite de uso excedido ou recurso não disponível
- **Solução**: Verifique seu plano no painel Minimax

#### `400 Bad Request`
- **Causa**: Parâmetros inválidos na requisição ou GroupId inválido
- **Solução**: Verifique o formato do prompt, parâmetros e GroupId

#### `500 Internal Server Error`
- **Causa**: Erro no servidor da API Minimax
- **Solução**: Tente novamente após alguns segundos

### Testando a API diretamente:

**⚠️ IMPORTANTE:** Substitua `SEU_GROUP_ID` e `SUA_CHAVE_AQUI` pelos seus valores reais!

```bash
# Testar Text-to-Speech (TTS) - COM GroupId!
curl -X POST "https://api.minimax.io/v1/t2a_v2?GroupId=SEU_GROUP_ID" \
  -H "Authorization: Bearer SUA_CHAVE_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "speech-02-hd",
    "text": "Bem-vindo ao Brasil",
    "voice_setting": {
      "voice_id": "male-qn-qingse",
      "speed": 1.0,
      "vol": 1.0,
      "pitch": 0
    },
    "audio_setting": {
      "sample_rate": 32000,
      "bitrate": 128000,
      "format": "mp3"
    }
  }'

# Testar Chat Completion (Texto) - COM GroupId!
curl -X POST "https://api.minimax.io/v1/text/chatcompletion_v2?GroupId=SEU_GROUP_ID" \
  -H "Authorization: Bearer SUA_CHAVE_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "abab6.5s-chat",
    "messages": [
      {
        "role": "user",
        "content": "Olá!"
      }
    ],
    "tokens_to_generate": 512
  }'
```

### Debug no código:

Os logs detalhados são exibidos no console do servidor Next.js:

```
[Minimax API] Chamando audio: https://api.minimax.io/v1/t2a_v2
[Minimax API] Request body: { ... }
[Minimax API] Status: 200
[Minimax API] Response: { ... }
```

Se aparecer erro, verifique:
1. O campo `error` ou `message` na resposta
2. O status HTTP retornado
3. Se a resposta está em JSON

---

## ⚽ Football API

### Problema: Erro ao buscar partidas

#### Verificações:
1. Chave de API configurada em `.env`
2. Limite de requisições não excedido (10 por minuto no plano gratuito)
3. Internet funcionando

---

## 💚 PIX QR Code

### Problema: QR Code não gerado

#### Verificações:
1. Todos os campos obrigatórios preenchidos (chave PIX, nome, cidade)
2. Formato da chave PIX válido
3. Valor numérico (se informado)

### Testando localmente:

```bash
curl -X POST http://localhost:3000/api/pix/generate \
  -H "Content-Type: application/json" \
  -d '{
    "pixKey": "teste@email.com",
    "name": "João Silva",
    "city": "São Paulo",
    "amount": 10.50,
    "description": "Teste"
  }'
```

---

## 🚴 CityBikes API

### Problema: Erro ao buscar redes

A API CityBikes é pública e não requer autenticação. Se houver erro:
1. Verifique conexão com internet
2. API pode estar temporariamente indisponível

---

## 📺 YouTube Downloader

### Problema: Erro ao baixar vídeo

#### Verificações:
1. URL válida do YouTube
2. Vídeo não é privado ou com restrição de idade
3. Implementar ytdl-core para produção

---

## 🔄 Deploy no Vercel

### Variáveis de ambiente necessárias:

No painel do Vercel, adicione:
- `MINIMAX_API_KEY`
- `FOOTBALL_API_KEY`
- Outras conforme necessário

### Como adicionar:
1. Vá em Settings > Environment Variables
2. Adicione cada variável
3. Faça redeploy

---

## 📞 Suporte

Se o problema persistir:
- Verifique os logs completos no console do servidor
- Teste os endpoints diretamente com curl
- Entre em contato: contato@hubti.com

---

## 📚 Documentação das APIs

- **Minimax**: https://platform.minimax.io/docs
- **Football-Data**: https://www.football-data.org/documentation
- **CityBikes**: https://api.citybik.es/v2/
