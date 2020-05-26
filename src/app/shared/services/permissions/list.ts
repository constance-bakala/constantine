export interface IPermission {
  index: number;
  value: string;
}

export const PERMISSIONS: {
  [name: string]: IPermission;
} = {
  AFF_LISTE_DEMANDES: { index: 1, value: 'Afficher la liste des demandes4' },
  AFF_LISTE_IMPRIMES: { index: 2, value: 'Afficher la liste des imprimés' },
  SUIVRE_CMD_IMPRIMES: { index: 3, value: 'Suivre ses commandes d\'imprimés' },
  SUIVRE_CMD_IMPRIMES_AUTRES_UTILISATEURS: {
    index: 4,
    value: 'Suivre les commandes d\'imprimés d\'autres utilisateurs'
  },
  ACCEDER_SUIVI_COMMISSIONS: {
    index: 5,
    value: 'Accéder au suivi des commissions'
  },
  SUIVRE_DEMANDES_DEROGATION: {
    index: 6,
    value: 'Suivre ses demandes de dérogation'
  },
  SUIVRE_DEMANDES_DEROGATION_AUTRES_UTILISATEURS: {
    index: 7,
    value: 'Suivre les demandes de dérogations d\'autres utilisateurs'
  },
  REALISER_DEMANDE_DEROGATION_TARIFAIRE: {
    index: 8,
    value:
      'Réaliser une demande de dérogation tarifaire "Souplesse commerciale" en Santé Collective'
  },
  ACCEDER_TABLEAU_BORD_GESTION_DEMANDE_DEROGATION: {
    index: 9,
    value: 'Accéder au tableau de bord de gestion des demandes de dérogations'
  },
  VALIDER_DEMANDE_DEROGATION: {
    index: 10,
    value: 'Valider une demande de dérogation'
  },
  APPLIQUER_ABATTEMENT_DEROGATION_INSPECTEUR_RESEAU_COURTAGE_SPECIALISE: {
    index: 11,
    value:
      'Appliquer l\'abattement dérogation Inspecteur du réseau Courtage Spécialisé'
  },
  APPLIQUER_DEROGATION_TAUX_SOCIETE: {
    index: 12,
    value: 'Appliquer une dérogation sur le taux Société'
  },
  UTILISER_CMS: {
    index: 13,
    value:
      'Utiliser le CMS (application de chartes, upload logos, images, pictogrammes)'
  },
  CREER_ELEMENT_MENU: { index: 14, value: 'Créer un élément de menu' },
  MODIFIER_ELEMENT_MENU: { index: 15, value: 'Modifier un élément de menu' },
  SUPPRIMER_ELEMENT_MENU: { index: 16, value: 'Supprimer un élément de menu' },
  CREER_GROUPES_UTILISATEURS: {
    index: 17,
    value: 'Créer des groupes d\'utilisateurs'
  },
  VOIR_A_DISTANCE_ECRAN_UTILISATEUR: {
    index: 18,
    value: 'Voir à distance l\'écran d\'un utilisateur'
  },
  ACCEDER_RUBRIQUE_MON_COMPTE: {
    index: 19,
    value: 'Accéder à la rubrique Mon compte (profil & onboarding)'
  },
  ACCEDER_CARDS_OPTIONNELLES_ACCESSIBLES: {
    index: 20,
    value: 'Accéder à Cards optionnelles accessibles'
  },
  VISUALISER_MESSAGE_INSPECTEUR: {
    index: 21,
    value: 'Visualiser le message inspecteur '
  },
  ECRIRE_MESSAGE_INSPECTEUR: {
    index: 22,
    value: 'Ecrire le message Inspecteur'
  },
  VISUALISER_MESSAGE_INSPECTEUR_POUR_LE_COMPTE_DE: {
    index: 23,
    value: 'Visualiser le message Inspecteur pour le compte d\'un inspecteur '
  },
  ECRIRE_MESSAGE_INSPECTEUR_POUR_LE_COMPTE_DE: {
    index: 24,
    value: 'Ecrire le message Inspecteur pour le compte d\'un inspecteur '
  },
  MODIFIER_GROUPES_UTILISATEURS: {
    index: 25,
    value: 'Modifier des groupes d\'utilisateurs'
  },
  SUPPRIMER_GROUPES_UTILISATEURS: {
    index: 26,
    value: 'Supprimer des groupes d\'utilisateurs'
  },
  VISUALISER_TROIS_TYPES_DE_MESSAGE_PUSH: {
    index: 27,
    value: 'Visualiser 3 types de message push'
  },
  TRAITER_DEMANDES_DE_GESTION: {
    index: 28,
    value: 'Traiter les demandes de gestion'
  },
  VISUALISER_MES_CONTRATS: { index: 29, value: 'Visualiser Mes contrats' },
  VISUALISER_MES_CLIENTS: { index: 30, value: 'Visualiser Mes clients' },
  AFFICHER_LISTE_UTILISATEURS: {
    index: 31,
    value: 'Afficher la liste des utilisateurs'
  },
  HABILITER_UTILISATEURS: { index: 32, value: 'Habiliter des utilisateurs' },
  HABILITER_UN_DE_MES_COLLABORATEURS: {
    index: 33,
    value:
      'Habiliter un de ses collaborateurs à la souscription en ligne (Profils externes)'
  },
  CREER_PROFIL_UTILISATEUR_INTERNE: {
    index: 34,
    value: 'Créer un profil utilisateur interne'
  },
  MODIFIER_PROFIL_UTILISATEUR_INTERNE: {
    index: 35,
    value: 'Modifier un profil utilisateur interne'
  },
  SUPPRIMER_PROFIL_UTILISATEUR_INTERNE: {
    index: 36,
    value: 'Supprimer un profil utilisateur interne'
  },
  APPLIQUER_PROFIL_UTILISATEUR_INTERNE: {
    index: 37,
    value:
      'Appliquer un profil utilisateur Interne (Administrateur, inspecteur, etc) '
  },
  CREER_PROFIL_UTILISATEUR_DIRECTEUR_DE_CABINET: {
    index: 38,
    value: 'Créer un profil utilisateur Directeur de cabinet/ agence'
  },
  MODIFIER_PROFIL_UTILISATEUR_DIRECTEUR_DE_CABINET: {
    index: 39,
    value: 'Modifier un profil utilisateur Directeur de cabinet/ agence'
  },
  SUPPRIMER_PROFIL_UTILISATEUR_DIRECTEUR_DE_CABINET: {
    index: 40,
    value: 'Supprimer un profil utilisateur Directeur de cabinet/ agence'
  },
  APPLIQUER_PROFIL_UTILISATEUR_REPRESENTANT_LEGAL: {
    index: 41,
    value:
      'Appliquer un profil utilisateur Représentant légal / d\'agence à un utilisateur'
  },
  CREER_PROFIL_UTILISATEUR_COLLABORATEUR_NIVEAU_A_OU_B: {
    index: 42,
    value: 'Créer un profil utilisateur Collaborateur Niveau A ou B'
  },
  MODIFIER_PROFIL_UTILISATEUR_COLLABORATEUR_NIVEAU_A_OU_B: {
    index: 43,
    value: 'Modifier un profil utilisateur Collaborateur Niveau A ou B'
  },
  SUPPRIMER_PROFIL_UTILISATEUR_COLLABORATEUR_NIVEAU_A_OU_B: {
    index: 44,
    value: 'Supprimer un profil utilisateur Collaborateur Niveau A ou B'
  },
  APPLIQUER_PROFIL_COLLABORATEUR_NIVEAU_A_OU_B_A_UN_UTILISATEUR: {
    index: 45,
    value: 'Appliquer un profil Collaborateur Niveau A ou B à un utilisateur'
  },
  COCHER_DECOCHER_HABILITATIONS_OPTIONNELLES: {
    index: 46,
    value: 'Cocher / Décocher des habilitations optionelles'
  },
  CREER_PROJET_COMMERCIAL_POUR_MON_PROPRE_COMPTE: {
    index: 47,
    value: 'Créer un projet commercial - pour mon propre compte'
  },
  CREER_PROJET_COMMERCIAL_POUR_LE_COMPTE_DE_L_APPORTEUR: {
    index: 48,
    value: 'Créer un projet commercial - pour le compte d\'un apporteur'
  },
  CREER_PROJET_COMMERCIAL_POUR_UN_AUTRE_CABINET: {
    index: 49,
    value: 'Créer un projet commercial - pour un autre cabinet'
  },
  MODIFIER_PROJET_COMMERCIAL_MES_PROJETS: {
    index: 50,
    value: 'Modifier un projet commercial - mes projets'
  },
  MODIFIER_PROJET_COMMERCIAL_PROJETS_AUTRES_UTILISATEURS: {
    index: 51,
    value: 'Modifier un projet commercial - les projets d\'autres utilisateurs'
  },
  SUPPRIMER_PROJET_COMMERCIAL_MES_PROJETS: {
    index: 52,
    value: 'Supprimer un projet commercial - mes projets'
  },
  SUPPRIMER_PROJET_COMMERCIAL_PROJETS_AUTRES_UTILISATEURS: {
    index: 53,
    value: 'Supprimer un projet commercial -les projets d\'autres utilisateurs'
  },
  CONSULTER_PROJET_COMMERCIAL_MES_PROJETS: {
    index: 54,
    value: 'Consulter un projet commercial - mes projets'
  },
  CONSULTER_PROJET_COMMERCIAL_PROJETS_AUTRES_UTILISATEURS: {
    index: 55,
    value: 'Consulter un projet commercial - les projets d\'autres utilisateurs'
  },
  IMPRIMER_PROJET_COMMERCIAL: {
    index: 56,
    value: 'Imprimer un projet commercial'
  },
  ENVOYER_PAR_MAIL_PROJET_COMMERCIAL: {
    index: 57,
    value: 'Envoyer par mail un projet commercial'
  },
  VALIDER_PROJET_COMMERCIAL_PREVOYANCE: {
    index: 58,
    value: 'Valider un questionnaire médical - Prévoyance'
  },
  ACCEDER_OPTION_CONFIER_VENTE_SURCOMPLEMENTAIRE: {
    index: 59,
    value:
      'Accéder à l\'option "Confier la vente de la surcomplémentaire à MHC (O/N)"'
  },
  ACCEDER_OFFRE_EMPRUNTEUR: {
    index: 60,
    value: 'Accéder à une offre "Emprunteur"'
  },
  MODIFIER_MOT_DE_PASSE: { index: 61, value: 'Modifier son mot de passe' },
  ACCEDER_MENU_COMPLET: { index: 62, value: 'Accéder au menu complet' },
  VOIR_DES_ACTUS: { index: 63, value: 'Voir des actus' },
  ACCEDER_OUTILS_EXPERTS_INFORMATIFS: {
    index: 64,
    value: 'Accéder aux Outils Experts interactifs'
  },
  AFFICHER_CONTENU_INFORMATIF: {
    index: 65,
    value: 'Afficher le contenu informatif'
  },
  CREER_CONTENU_INFORMATIF: { index: 66, value: 'Créer du contenu informatif' },
  MODIFIER_CONTENU_INFORMATIF: {
    index: 67,
    value: 'Modifier du contenu informatif'
  },
  SUPPRIMER_CONTENU_INFORMATIF: {
    index: 68,
    value: 'Supprimer du contenu informatif'
  },
  ADMINISTRER_DES_CONTENUS_CMS: {
    index: 69,
    value: 'Administrer des contenus (CMS)'
  },
  CHOISIR_UN_RESEAU: { index: 70, value: 'Choisir un réseau' },
  ACCEDER_A_CARDS_PAR_DEFAUT: {
    index: 71,
    value: 'Accéder à  Cards par défaut'
  },
  ACCEDER_SIDEBAR: { index: 72, value: 'Accéder à la Sidebar' },
  ADMINISTRER_MES_ROJETS: { index: 73, value: 'Administrer Mes contacts' },
  ADMINISTRER_DES_ACTUS_CONTENUS: {
    index: 74,
    value: 'Administrer des actus (contenus)'
  },
  ADMINISTRER_MESSAGES_PUSH: {
    index: 75,
    value: 'Administrer des messages push'
  },
  RECHERCHER_IMPRIMES: { index: 76, value: 'Rechercher des imprimés' },
  COMMANDER_IMPRIMES: { index: 77, value: 'Commander des imprimés' },
  ACCEDER_WEBCALLBACK: { index: 78, value: 'Accéder au WebCallBack' },
  ACCEDER_CHAT_EN_LIGNE: { index: 79, value: 'Accéder au Chat en ligne' },
  SOUSCRIRE_CONTRAT_EN_LIGNE: {
    index: 80,
    value: 'Souscrire un contrat  en ligne'
  },
  CONSULTER_MES_RESERVATIONS_D_AFFAIRES: {
    index: 81,
    value: 'Consulter mes réservations d\'affaires (liste des saisies)'
  },
  CONSULTER_RESERVATIONS_D_AFFAIRES_AUTRES_UTILISATEURS: {
    index: 82,
    value: 'Consulter les réservations d\'affaires d\'autres utilisateurs'
  },
  SIMULER_RESERVATION_D_AFFAiRE_EN_LIGNE: {
    index: 83,
    value: 'Simuler une réservation d\'affaire en ligne '
  },
  RESERVER_AFFAIRE_EN_LIGNE: {
    index: 84,
    value: 'Réserver une affaire en ligne'
  },
  ACCEDER_QUI_FAIT_QUOI: { index: 85, value: 'Accéder au "Qui Fait Quoi"' },
  ACCEDER_AU_TABLEAU_DE_BORD_DES_PERTES_DE_DELEGATIONS: {
    index: 86,
    value: 'Accéder au tableau de bord des pertes de délégations'
  },
  SUIVRE_LES_ETAPES_DE_SOUSCRIPTION: {
    index: 87,
    value: 'Suivre les étapes de souscription'
  },
  VALIDER_WORKFLOWS_ETAPES_DE_SOUSCRIPTION: {
    index: 88,
    value: 'Valider les worfkflows des étapes de souscription'
  },
  SUIVRE_ETAPES_DE_GESTION: {
    index: 89,
    value: 'Suivre des étapes de gestion'
  },
  VALIDER_WORKFLOWS_ETAPES_DE_GESTION: {
    index: 90,
    value: 'Valider les worfkflows des étapes de gestion'
  },
  DUPLIQUER_PROJET_COMMERCIAL: {
    index: 91,
    value: 'Dupliquer un projet commercial'
  },
  ACTIVATE_USERS: {
    index: 92,
    value: 'Activer un utilisateur'
  },
  DEACTIVATE_USERS: {
    index: 93,
    value: 'Désactiver un utilisateur'
  }
};
