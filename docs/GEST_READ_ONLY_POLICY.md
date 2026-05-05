# Politica obrigatoria: GEST somente leitura

## Regra de ouro

O servidor `192.168.0.100` deve ser tratado como **somente leitura e consulta**.

E proibido qualquer comando, rotina, script, migracao, automacao ou tela que execute operacoes de escrita nesse servidor.

## Comandos proibidos

Nunca executar contra `192.168.0.100`:

- `INSERT`
- `UPDATE`
- `DELETE`
- `MERGE`
- `CREATE`
- `ALTER`
- `DROP`
- `TRUNCATE`
- `EXEC` / `EXECUTE`
- migracoes de schema
- criacao de tabelas temporarias persistentes
- jobs, procedures ou triggers

## Comandos permitidos

Somente consultas de leitura, como:

- `SELECT`
- CTEs de leitura com `WITH ... SELECT`
- funcoes de leitura usadas dentro de consultas

## Diretriz de desenvolvimento

Toda integracao com o banco GEST deve partir do principio de menor privilegio:

1. usuario de banco somente leitura;
2. ausencia de permissoes de escrita;
3. validacao local para bloquear comandos destrutivos;
4. nenhuma migracao automatica apontando para `192.168.0.100`;
5. nenhum script de carga, ajuste ou correcao de dados nesse servidor.

## Motivo

O GEST e a fonte operacional principal. Este projeto deve apenas consultar dados para analise, relatorio e apoio a decisao. Qualquer alteracao no GEST deve continuar fora deste projeto e seguir o processo operacional oficial.
