## How to build static site on AWS S3
- https://dev.to/lanzone31/hosting-a-nextjs-app-router-app-on-amazon-s3-5al6

### Polyfilling CJS Features During Build
- https://dev.to/rxliuli/developing-and-building-nodejs-applications-with-vite-311n

### Hexagonal architecture
- https://forsenior.dev/blog/nodejs/patterns/clean-architecture
- https://www.linkedin.com/pulse/hexagonal-architecture-nodejs-comprehensive-guide-igor-matsuoka-rfjtf
- https://alwaysdeveloper.com/mastering-clean-code-with-hexagonal-ports-adapters-architecture-in-node-js-4cf66800d04d
- https://chatgpt.com/share/68ed27bd-f154-8003-85ff-0517be5d5cc4

## Troubleshooting

Vytvořil jsem uživatele `amplify-jahr-dev`, abych mohl pracovat s amplify CLI. Pro tyto účely, ale tento uživatel potřeboval roli `AmplifyBackendDeployFullAccess`.

Můj admin uživatel používá profil `AdministratorAccess`. Pokud máš svůj jako default, nemusíš předávat `--profile` parametr.

Přidá role `AmplifyBackendDeployFullAccess` uživateli `amplify-jahr-dev`
```bash
aws iam attach-user-policy \
  --user-name amplify-jahr-dev \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmplifyBackendDeployFullAccess \
  --profile AdministratorAccess
```

Zobrazení přiřazených rolí uživateli `amplify-jahr-dev`
```bash
aws iam list-attached-user-policies \
  --user-name amplify-jahr-dev \
  --profile AdministratorAccess
```
