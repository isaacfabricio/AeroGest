# Configuração dos Secrets no GitHub para o Pipeline CI/CD

Para que o pipeline CI/CD funcione corretamente, é necessário configurar os seguintes secrets no repositório GitHub:

1. **IBMQ_TOKEN**  
   Token de acesso à IBM Quantum.  
   - Vá em: Settings > Secrets and variables > Actions  
   - Clique em "New repository secret"  
   - Nome: `IBMQ_TOKEN`  
   - Valor: seu token IBM Quantum pessoal

2. **CODECOV_TOKEN**  
   Token para upload da cobertura de testes no Codecov (se usar Codecov).  
   - Nome: `CODECOV_TOKEN`  
   - Valor: token gerado na sua conta Codecov

3. **HEROKU_API_KEY**  
   Token para deploy automático no Heroku (se usar Heroku).  
   - Nome: `HEROKU_API_KEY`  
   - Valor: sua API key do Heroku (encontrada em Account Settings)

4. **HEROKU_APP_NAME**  
   Nome do app Heroku para deploy.  
   - Nome: `HEROKU_APP_NAME`  
   - Valor: nome do seu app no Heroku

5. **HEROKU_EMAIL**  
   Email da conta Heroku.  
   - Nome: `HEROKU_EMAIL`  
   - Valor: email usado na conta Heroku

## Passos para adicionar um secret

- Acesse o repositório no GitHub
- Clique em "Settings"
- Clique em "Secrets and variables" > "Actions"
- Clique em "New repository secret"
- Preencha o nome e valor conforme acima
- Salve o secret

Após configurar os secrets, o pipeline CI/CD poderá acessar essas variáveis de forma segura durante a execução.

Se precisar, posso ajudar a configurar esses secrets ou ajustar o pipeline para outros serviços.
