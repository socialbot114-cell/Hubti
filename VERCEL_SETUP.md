## ⚠️ AÇÃO NECESSÁRIA: Configurar GroupId no Vercel

### Você está recebendo erro 404 porque:
O `MINIMAX_GROUP_ID` ainda não foi adicionado nas variáveis de ambiente do Vercel.

---

## 🚀 Configuração Rápida no Vercel

### Passo a Passo Detalhado:

#### 1️⃣ Acesse seu Projeto
- Vá em: https://vercel.com/
- Faça login se necessário
- Clique no projeto **Hubti**

#### 2️⃣ Adicione as Variáveis de Ambiente
- No menu do projeto, clique em **Settings** (Configurações)
- No menu lateral esquerdo, clique em **Environment Variables** (Variáveis de Ambiente)

#### 3️⃣ Adicione cada variável:

**Variável 1: FOOTBALL_API_KEY**
```
Name: FOOTBALL_API_KEY
Value: 6d1fcb2930e8463982159268393960cd
Environment: Production, Preview, Development (selecione todas)
```

**Variável 2: MINIMAX_API_KEY**
```
Name: MINIMAX_API_KEY
Value: sk-api-JLi0lsuXeMdydK-sF2HfXLxLp_gixvK4ZJUU81VqRNjlD8ON-XIUjKK__esefyElntMk7x24bBc0Lt209Q79QSadKcpYnOlutHdXPTV-YAp1Liy1140lkJo
Environment: Production, Preview, Development (selecione todas)
```

**Variável 3: MINIMAX_GROUP_ID ⚠️ IMPORTANTE**
```
Name: MINIMAX_GROUP_ID
Value: 2008605295118393730
Environment: Production, Preview, Development (selecione todas)
```

#### 4️⃣ Salve cada variável
- Clique em **Save** (Salvar) depois de adicionar cada uma
- Você deve ter 3 variáveis no total

#### 5️⃣ Faça o Redeploy
- Vá na aba **Deployments** (no topo)
- Localize o deployment mais recente
- Clique nos **3 pontinhos (...)** à direita
- Clique em **Redeploy**
- Aguarde o deploy finalizar (leva cerca de 1-2 minutos)

---

## ✅ Como Verificar se Funcionou

Após o redeploy, teste novamente:

1. Acesse: https://hubti.vercel.app/ai
2. Selecione **Geração de Áudio**
3. Digite: "Bem-vindo ao Brasil"
4. Clique em **Gerar com IA**
5. Abra o Console (F12) para ver os logs

### Resultado Esperado:
- ✅ Sem erro 404
- ✅ Áudio gerado com sucesso
- ✅ Logs mostram `[Minimax API] Status: 200`

### Se continuar com erro:
Veja os logs no Vercel:
1. Vercel → Projeto → **Deployments**
2. Clique no último deployment
3. Clique em **Functions**
4. Clique em `/api/ai/generate`
5. Veja os logs para identificar o problema

---

## 🎯 Resumo das Credenciais

Copie e cole no Vercel:

| Nome da Variável | Valor |
|------------------|-------|
| `FOOTBALL_API_KEY` | `6d1fcb2930e8463982159268393960cd` |
| `MINIMAX_API_KEY` | `sk-api-JLi0lsuXeMdydK-sF2HfXLxLp_gixvK4ZJUU81VqRNjlD8ON-XIUjKK__esefyElntMk7x24bBc0Lt209Q79QSadKcpYnOlutHdXPTV-YAp1Liy1140lkJo` |
| `MINIMAX_GROUP_ID` | `2008605295118393730` |

---

**Importante:** O erro 404 vai desaparecer assim que você adicionar o `MINIMAX_GROUP_ID` e fazer o redeploy!
