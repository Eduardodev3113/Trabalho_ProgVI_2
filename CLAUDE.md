# INSTRUÇÕES DO PROJETO — LEIA ANTES DE QUALQUER COISA

Responda sempre em português brasileiro.

## Sobre o Projeto
App mobile chamado **ChefNote** feito em React Native (Expo).
Permite cadastrar receitas e encontrar mercados/restaurantes próximos via GPS.

## Regras que NUNCA podem ser esquecidas

- UI exclusivamente com `react-native-paper` (nunca usar componentes puros do React Native para visual)
- Navegação com `@react-navigation/bottom-tabs` + `@react-navigation/stack`
- Banco de dados: Firebase Firestore, coleção `receitas`
- Sempre responder em português brasileiro
- Nunca inventar estrutura de pastas diferente da definida abaixo

## Estrutura de Pastas (OBRIGATÓRIA)

```
PROJETO-BASE-PROGRAMACAO-MOBILE/
├── assets/
│   └── icon.png
├── src/
│   ├── components/
│   ├── config/
│   │   └── firebase.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── screens/
│       └── receitas/
│           ├── HomeScreen.js
│           ├── ReceitaListScreen.js
│           ├── ReceitaFormScreen.js
│           ├── ReceitaDetailScreen.js
│           ├── MapaScreen.js
│           ├── ExplorarScreen.js
│           └── SobreScreen.js
├── App.js
├── index.js
├── package.json
└── CLAUDE.md
```

## Cores e Estilo

- Primary/Accent: `#E8692A` (laranja)
- Background: `#FAFAF8` (creme)
- Cards: `#F2F2F0` (cinza suave)
- Texto: `#1A1A1A`
- Mercados: `#16A34A` (verde)
- Restaurantes: `#E8692A` (laranja)
- Border radius: 12px
- Estilo: moderno e minimalista

## Telas e o que cada uma faz

| Tela | Arquivo | Função |
|------|---------|--------|
| Home | HomeScreen.js | Cards de ação + receitas recentes |
| Receitas | ReceitaListScreen.js | Lista com Searchbar + filtros + FAB |
| Formulário | ReceitaFormScreen.js | CRUD completo no Firebase |
| Detalhe | ReceitaDetailScreen.js | Detalhes + botão ir ao mapa |
| Mapa | MapaScreen.js | GPS + react-native-maps + mercados/restaurantes |
| Explorar | ExplorarScreen.js | API TheMealDB com fetch() |
| Sobre | SobreScreen.js | Info do app e do aluno |

## Navegação

- Bottom tabs: Home, Receitas, Mapa, Explorar
- Stack dentro de Receitas: List → Detail → Form
- Passagem de parâmetros: receita completa via route.params

## Firebase

- Coleção: `receitas`
- Campos: nome, categoria, tempoPreparo, ingredientes, modoPreparo, criadoEm
- Operações: salvar, listar (onSnapshot), buscar, atualizar, deletar

## API Bônus

- URL: `https://www.themealdb.com/api/json/v1/1/filter.php?c=CATEGORIA`
- Exibir: `strMeal` (nome) e `strMealThumb` (foto)

## Imagens por categoria

```js
const imagens = {
  'Prato Principal': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=450&fit=crop',
  'Sobremesa': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=450&fit=crop',
  'Lanche': 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=800&h=450&fit=crop',
}
```

## Como gerar o projeto

Sempre gere um arquivo por vez, na ordem:
1. App.js
2. AppNavigator.js
3. firebase.js
4. HomeScreen.js
5. ReceitaListScreen.js
6. ReceitaFormScreen.js
7. ReceitaDetailScreen.js
8. MapaScreen.js
9. ExplorarScreen.js
10. SobreScreen.js
