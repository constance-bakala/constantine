# Templates emails Brevo

Les fichiers `*.brevo.template.html` sont les sources versionnées des templates transactionnels Brevo.
Les fichiers `*.sendgrid.template.html` sont conservés comme référence historique (ancienne intégration SendGrid).

| Fichier source | Template Brevo | ID | Déclencheur |
|---|---|---|---|
| `commande_envoyee.brevo.template.html` | commande_envoyee | #1 | Clic "Envoyer la commande" dans le panier |
| `mail_bienvenu.brevo.template.html` | mail_bienvenu | #2 | Création de compte (Firebase Auth) |

Pour la procédure complète de mise à jour, voir [DEPLOY.md](../../DEPLOY.md) section 6.
