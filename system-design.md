# Conception et architecture de système

L'application dans son état pour le test technique n'est pas utilisable en production.

Faites une liste de l'ensemble des éléments que vous estimez devoir être corrigés et/ou améliorés pour avoir une application "prod-ready".
Pour chaque élément, proposez également un plan de remédiation.

- Des logs d'erreur plus détaillés et structurés pour faciliter le débogage et la maintenance.
=> Ajout de SeriLog, ou mieux Datadog.

- Une meilleure gestion des exceptions pour éviter les plantages de l'application et fournir des messages d'erreur plus clairs aux utilisateurs.
=> Implémenter un middleware pour les exceptions non gérer et ajouter un routing vers une page sympa pour les utilisateurs mais en détails pour les développeurs.

- Les validations sont simples ici et contournable (modifier le payload par exemple), il faudrait mettre en place des validations plus robustes côté serveur pour garantir l'intégrité des données.
=> Ajout des FluentValidation

- Ajout des tests unitaires et d'intégration pour assurer la qualité du code et faciliter les futures modifications.
=> Avec xUnit, Shouldly et Moq par exemple.

- Mettre un système de cache.
=> HybridCache par exemple.

- Mettre en place une CI/CD avec les tests automatisés pour garantir que les modifications n'introduisent pas de régressions.
=> Avec Azure DevOps dans votre cas.

- Mettre plus de doc en place
=> Avec Swagger ou Scalar pour simplifier la vie des développeurs qui vont devoir utiliser votre API.

- Utiliser le JWT ou le Keycloak (https://www.youtube.com/watch?v=PLHmcXCljNg) pour plus de sécurité.

Avec tous cela en place, l'application pourrait aller en en v1.0.


Décrivez également comment ajouter une fonctionnalité permettant aux clients de s'inscrire par eux-même à une session de formation après l'avoir acheté auprès d'un commercial WeChooz.
Décrivez les flux d'intéraction utilisateurs, ainsi que les différents mécanismes de sécurité envisagés pour éviter les risques d'inscription frauduleuse (sans imposer aux clients de se connecter).

- On pourrait faire comme ceci:
1/ Ajouter une page de login utilisateur.
2/ Pour qu'il soit actif, il doit cliquer sur un lien d'activation envoyé par mail sous 24h par exemple.
3/ Une fois connecté, soit le commercial l'ajoute en tant que "IsPaid = true" ou alors il souscrit en ligne avec Stripe par exemple.

À ceci, on rajout du captcha, et un moyen de retracer toutes actions simplements.
Pour eviter le brute force, mettre un limitateur de tentative de connexion et d'inscription.
Mettre Cloudflare pour eviter les attaques DDoS et les bots.