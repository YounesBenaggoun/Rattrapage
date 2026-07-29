# 🎨 Rattrapage WEB3 - Plateforme de gestion d'expositions

Backend d'une plateforme permettant la gestion d'expositions, la réservation de visites et la recommandation personnalisée d'expositions pour les visiteurs.

Le projet est développé avec une approche **Clean Architecture** afin de garantir une séparation claire entre la logique métier, les cas d'utilisation et les technologies utilisées.

---

```
Capture d'écran au dossier Captures
```

# 🚀 Fonctionnalités

## 🔐 Authentification et gestion des rôles

Le système permet aux utilisateurs de :

* Créer un compte
* Se connecter avec authentification JWT
* Sécuriser les mots de passe avec bcrypt
* Gérer les accès selon les rôles

Rôles disponibles :

* `ORGANIZER`
* `EXPOSER`
* `VISITOR`

---

# 🖼️ Gestion des expositions

La plateforme permet aux organisateurs de gérer les expositions :

* Création d'expositions
* Modification des informations
* Suppression d'expositions
* Association d'exposants
* Gestion des thèmes
* Suivi du nombre de places disponibles

Une exposition contient :

* Un titre
* Une description
* Une adresse
* Un thème
* Une durée de visite
* Une capacité maximale de visiteurs
* Une date de début
* Une date de fin
* Des exposants associés

---

# 🎟️ Système de réservation

Les visiteurs peuvent réserver des expositions.

Fonctionnalités :

* Création d'une réservation
* Vérification des réservations existantes
* Protection contre les doublons
* Gestion du statut de réservation

Les statuts possibles :

```text

CONFIRMED = true
NOT RESERVED = false
```

---

# 🤖 Système de recommandation intelligent

Le projet intègre un service de recommandation isolé permettant de proposer les expositions les plus pertinentes pour chaque visiteur.

Le moteur de recommandation utilise un système de scoring basé sur plusieurs critères :

* Préférences du visiteur
* Compatibilité avec le temps disponible
* Distance
* Affluence
* Nombre de places disponibles
* Priorité commerciale

Exemple de calcul :

```text
Score =
    Préférence utilisateur
    + Compatibilité durée
    - Pénalité distance
    - Pénalité affluence
    + Places disponibles
    + Priorité exposition
```

Les coefficients du système sont configurables dynamiquement depuis MongoDB.

Exemple de configuration :

```json
recommendationConfig = {
    preferenceCoef: 40,
    distancePinality: 0.05,
    durationCoef: 20,
    crowdPinality: 0.4,
    availableSlotsCoef: 2,
    businessPriority: {
        // id de l'exposition 
        "6a69d00425a3f5b363ba646b": 25,
        "6a69e0a0c31ff145a61c97e8": 8,
        "6a69e0d3c31ff145a61c97e9": 11
    },
    maxDistance: 40,
    bonusLowCrowdTrigger: 30,
    bonusNear: 10,
    bonnusNearTrigger: 15,
    bonusLowCrowd: 15
}
```

---

# 🏗️ Architecture du projet

Le projet suit les principes de la **Clean Architecture**.

Structure :

```text
src
│
├── 1_Domain
│   ├── entities
│   ├── interface
│   ├── error
│   └── services
│
├── 2_Application
│   └── usecases
│
├── 3_Infrastructure
│   ├── database
│   ├── repositories
│   └── models
│
└── 4_Presentation
    ├── controllers
    ├── routes
    └── middlewares
```


# 🛠️ Technologies utilisées

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Sécurité

* JSON Web Token (JWT)
* bcrypt

## Tests

* Vitest

## Outils de développement

* ESLint
* Nodemon
* CommitLint

---

# 📦 Installation

Cloner le projet :

```bash
git clone https://github.com/younesBenaggoun/rattrapage.git

cd rattrapage
```

Installer les dépendances :

```bash
npm install
```

---

# ⚙️ Configuration environnement

Créer un fichier `.env` :

```env
PORT=5000
MONGO_URI = mongodb+srv://Younes:12341234@cluster0.3684pxb.mongodb.net/Rattrapage
JWT_SECRET = JWT-SECRET
SALT_ROUNDS = 10
JWT_EXPIRES_IN = 180d

```

---

# ▶️ Démarrage du projet

Mode développement :

```bash
npm run dev
```

Mode production :

```bash
npm start
```

---

# 🧪 Tests

Lancer les tests :

```bash
npm test
```


---

# 📚 Principales routes API

## Authentification

### Inscription utilisateur

```http
POST /user/register
```

### Connexion

```http
POST /user/login
```

---

## Expositions

### Récupérer les expositions

```http
GET /exposition
```

### Créer une exposition

```http
POST /exposition/add
```

---

### Associé Exposer à une exposition

```http
POST /exposition/addExposer
```

---

## Réservations

### Créer une réservation

```http
POST /reservation/add
```

---

## Recommandations

### Obtenir les recommandations

```http
GET /recommendation
```

### get les recommandation Config
```http
GET /recommendation/config
```

### update les recommandation Config
```http
POST /recommendation/config
```

---



# 🎯 Objectifs du projet

Ce projet met en pratique :

* L'architecture Clean Architecture
* La séparation métier / infrastructure
* Le pattern Repository
* Les principes SOLID
* Les tests unitaires et d'intégration
* La conception d'un moteur de recommandation configurable
* La création d'une API REST évolutive

---

# 👨‍💻 Auteur

**Younes Benaggoun**

GitHub :

https://github.com/younesBenaggoun

---