# 🚀 Como Fazer Deploy no Vercel

## Opção 1 - Deploy via Interface Vercel (MAIS FÁCIL)

### Passo 1: Criar Conta Vercel
1. Vai a [vercel.com](https://vercel.com)
2. Clica em **"Sign Up"**
3. Escolhe **"Continue with GitHub"** (recomendado)

### Passo 2: Importar Projeto
1. No dashboard Vercel, clica em **"Add New..."** → **"Project"**
2. Conecta o teu repositório GitHub
3. Seleciona o repositório do Social Lodge
4. Clica em **"Import"**

### Passo 3: Configurar Build
Vercel detecta automaticamente que é um projeto Vite. Confirma as settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Passo 4: Deploy
1. Clica em **"Deploy"**
2. Aguarda 1-2 minutos ⏳
3. 🎉 O teu site está ONLINE!

### Passo 5: Configurar Domínio (Opcional)
1. Vai a **"Settings"** → **"Domains"**
2. Adiciona o teu domínio personalizado (ex: `sociallodge.pt`)
3. Segue as instruções para configurar DNS

---

## Opção 2 - Deploy via CLI (AVANÇADO)

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

### 4. Deploy para Produção
```bash
vercel --prod
```

---

## 🌐 URL Exemplo
Após deploy, recebes um URL tipo:
- `https://social-lodge.vercel.app`
- `https://social-lodge-madeira.vercel.app`

Podes customizar o nome do projeto nas settings!

---

## ✅ Checklist Pré-Deploy

- [x] Ficheiro `vercel.json` criado
- [x] `.gitignore` configurado
- [x] README.md atualizado
- [x] Código testado localmente
- [x] Build funciona (`npm run build`)

---

## 🔄 Atualizações Futuras

Sempre que fizeres push para o GitHub:
- Vercel faz **deploy automático** 🚀
- Preview deployments para cada branch
- Rollback fácil para versões anteriores

---

## 📞 Suporte

Se tiveres problemas:
1. Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
2. Documentação: [vercel.com/docs](https://vercel.com/docs)

---

**🎉 Boa sorte com o deploy do Social Lodge!**
