export default {
  failed: "L'action a échoué",
  success: 'Action réussie',
  oops: "Une erreur s'est produite : ",
  error403: "Halte ! Vous n'avez pas la permission pour cette action.",
  error401: 'Halte ! Veuillez vous connecter pour effectuer de telles actions.',
  error415: "Halte ! Seul les fichiers ayant un format d'encodage UTF-8 sont supportés.",
  error404page: "Hum! Il n'y a rien ici...",
  welcomeback: 'Re !',
  loginbtn: 'Connecter',
  loginselector: 'Se connecter via',
  switchLanguage: "Changer la langue de l'interface utilisateur",
  documentation: 'Voir la documentation',
  darkMode: 'Activer le mode sombre',
  projectAdmin: "Vous êtes l'administrateur de ce projet",
  userInformation: "Information de l'utilisateur",
  settings: 'Paramètres',
  admin: 'Admin',
  fullscreen: 'Plein écran',
  navprojects: 'Projets',
  navsettings: 'Paramètres',

  // confirm action dialog
  confirmAction: {
    title: 'En êtes-vous certain?',
    message: 'Vous êtes sur le point de faire une action irrémédiable. Voulez-vous vraiment continuer?',
  },

  // first page (the index)
  homepage: {
    accessTreebankBtn: 'Accéder aux corpus arborés',
    slogan: "L'annotation de Treebank à échelle humaine",
    features: [
      'Annotez et partagez vos corpus arborés',
      'Requêtez et recherchez en utilisant des grammaires à la pointe',
      'Libre et Open Source',
      'Gérez vos équipes et les accès à vos projets',
    ],
    scroll: "Plus d'infos en bas",
    arboheadline: 'Annotation collaborative avec Arborator',
    grewheadline: 'Grammaire de Graphes par Grew',
    descriptionCard: {
      title: "Un outil d'annotation collaboratif pour corpus arborés",
      subtitle: "Une interface graphique facile d'utilisation rendant l'annotation plus attrayante.",
      content: [
        "Tirez l'arc d'un mot vers un autre pour les lier par une relation de dépendance. Cliquez sur un mot pour changer ses caractéristiques. Choisissez les mots à transformer en token. Les jeux d'étiquettes de dépendance et de caractéristiques sont personnalisables. Une préconfiguration est déjà en place pour",
        'et',
      ],
      tooltipSud: 'SUD: Le surface-syntactic, version distribuées des Universal Dependencies',
      tooltipUd: 'Universal Dependencies:  amazing collaborative treebank annotation project providing 150 treebanks in 90 languages',
    },
    grewCard: {
      title: "Requêtez à l'aide d'une puissance grammaire de graphes",
      subtitle: "Modifiez les résultats de la recherche directement dans l'interface",
      content: [
        "L'assainissement, les vérifications et la résolution de problèmes sont les ingrédients d'un bon corpus arboré. Avec Arborator-Grew il n'est plus nécessaire de jongler entre plusieurs outils pour constituer ou corriger un corpus arboré, tout est présent en un outil collaboratif qui accepte plusieurs formats de fichiers CoNLL ! Le moteur de recherche utilise la syntaxe",
        'simple à apprendre et à manipuler et qui a fait ses preuves grâce aux multiples tutoriels.',
      ],
      tooltipGrew: 'La grammaire de graphes Grew.',
    },
    collaborativeCard: {
      title: 'Together with others you can build beautiful treebanks',
      subtitle: 'Social login makes Arborator-Grew a hazzle free tool',
      content: [
        'You control who accesses your annotation projetct, and no annotator can destroy other trees than their owns.',
        'Push the CoNLL data onto your GitHub project and share your beautiful trees from there.',
        'Essayez le dans le',
      ],
      playgroundBtn: 'terrain de jeu',
    },
    sourceCard: {
      title: 'Code source',
      content: [
        'Direction github',
        'pour parcourir le code.',
        'Aidez la science en nous donnant vos retours à partir de',
        "la page d'issues d'Arborator.",
        "Un guide d'installation et d'utilisation d'Arborator-Grew est à venir sous peu.",
      ],
      tooltipGit: 'Notre page GitHub',
    },
    storyCard: {
      title: 'Our story',
      subtitle: 'Arborator-Grew combines the features of two preexisting tools: Arborator and Grew.',
      content: [
        'Arborator is a widely used collaborative graphical online dependency treebank annotation tool. Grew is a tool for graph querying and rewriting specialized in structures needed in NLP, i.e. syntactic and semantic dependency trees and graphs. Grew also has an online version,',
        ", where all Universal Dependencies treebanks in their classical, deep and surface-syntactic flavors can be queried. Arborator-Grew is a complete redevelopment and modernization of Arborator, replacing its own internal database storage by a new Grew API, which adds a powerful query tool to Arborator's existing treebank creation and correction features. This includes complex access control for parallel expert and crowd-sourced annotation, tree comparison visualization, and various exercise modes for teaching and training of annotators. Arborator-Grew opens up new paths of collectively creating, updating, maintaining, and curating syntactic treebanks and semantic graph banks.",
      ],
    },
    citeCard: {
      title: 'Citez-nous !',
    },
    toolsCard: {
      title: 'Autres outils Arborator',
      content: [
        'Pour visualiser rapidement votre fichier CoNLL cliquez ici:',
        'Libre accès !',
        'Visualiseur de fichiers CoNLL',
        'Édition graphique rapide de fichiers CoNLL:',
        'Èditeur de fichiers CoNLL',
        "La version historique d'Arborator est toujours utilisable ici",
      ],
    },
    footertextmadewith: "Créé avec beaucoup d'",
    footertextin: 'à', // reaaallllll basic one, not good enough but still buggy using span and html parse  navhome: 'Accueil',
    textGetUserEmailDialog: [
      'Nous voulons nous assurer que vous êtes toujours au courant des changements importants sur ArboratorGrew, ainsi que vous tenir informé de toute opération purgatoire qui pourrait affecter votre projet. Veuillez nous fournir votre adresse Email ci-dessous afin que nous puissions vous avertir avant toute mise à jour importante ou avant de supprimer votre projet inutilisé. Nous respectons votre vie privée et ne partagerons jamais vos informations avec qui que ce soit.',
      "J'accepte de recevoir des courriels et des promotions",
      'Soumettre'
    ]
  },

  // list of projects page
  projectHub: {
    tooltipCreaProject: ['Se connecter pour créer un nouveau projet', 'Créer un nouveau projet'],
    tooltipChangeView: "Changer l'affichage",
    tooltipRightClickDelete: 'Clic droit pour supprimer',
    title: 'Projets',
    sample: 'échantillon',
    samples: 'échantillons',
    rightClickSettings: 'Paramètres',
    rightClickDelete: 'Supprimer',
    emptySearch: 'chercher un projet',
    projectCategory: 'Catégorie',
    allProjects: 'Tous les projets',
    myProjects: 'Mes projets',
    myOldProjects: 'Mon purgatoire des projets',
    myOldProjectInfo:
      "Ces anciens projets n'ont pas été utilisés depuis longtemps. Nous sommes susceptibles de les supprimer à tout moment. Utilisez-les ou téléchargez les données et effacez le projet (clic droit).",
    otherProjects: "D'autres projets",
    otherOldProjects: 'Le purgatoire des projets',
    otherOldProjectInfo:
      "Ces anciens projets n'ont pas été utilisés depuis longtemps. Nous sommes susceptibles de les supprimer à tout moment. Utilisez-les ou prevenez les créateurs.",
    lastAccess: 'dernier accès',
    lastWriteAccess: 'dernière modification',
    longtime: 'ça fait une éternité',
  },

  // page when you enter a project ( samples info, etc)
  projectView: {
    project: 'Projet',
    tooltipSettings: 'Modifier les paramètres du projet',
    tooltipViewAdmin: "Voir les informations de l'administrateur",
    nodata: [
      "Oups! Il n'y a rien à afficher...",
      "Aucun n'échantillon n'est présent. Ce projet est vide, veuillez téléverser des fichiers conll.",
      "Demandez à l'administrateur du projet d'ajouter des fichiers",
    ],
    tooltipAddSample: 'Ajouter un échantillon (fichier CoNLL)',
    tooltipExportSample: ['Sélectionnez les échantillons à exporter', 'Exporter les échantillons sélectionnés'],
    tooltipDeleteSample: ['Sélectionnez les échantillons à supprimer', 'Supprimer les échantillons sélectionnés'],
    tootltipCreateLexicon: ['Sélectionnez les échantillons pour créer le lexique', "Créer le lexique à partir d'échantillons sélectionnés"],
    tooltipParsingPanel: ['Ouvrir le parseur', 'Fermer le parseur'],
    tooltipParser: [
      'Sélectionner les échantillons pour entraîner le parseur',
      'Entraîner le parseur avec les échantillons sélectionnés',
      'Cliquer et choisir les paramètres pour le parseur',
      'Cliquer pour arrêter le parseur',
    ],
    tooltipGitPush: [
      'Pousser seulement mes arbres des échantillons sélectionnés',
      'Pousser mes plus récents arbres des échantillons sélectionnés',
      'Pousser les arbres les plus récents',
      'Pousser tous les abres des échantillons sélectionnés',
      'Sélectionner les échantillons à engager (commit) et à pousser sur GitHub',
      'Engager et pousser sur GitHub les échantillons sélectionnés',
    ],
    gitPullUser: 'Replace my trees from the selected samples with the ones from GitHub',
    gitPullAll: 'Replace all trees from the selected samples with the ones from GitHub',
    tooltipGitPullSelect: [
      'Select the samples you want to update from your GitHub folder',
      'Pull data from your GitHub folder onto the selected samples',
    ],
    tooltipSearch: 'Rechercher un échantillon',

    tooltipSelectVisible: 'Sélectionner les colonnes visibles',
    tooltipFullscreen: 'tableau plein écran',
    tooltipFabGrew: "Recherche avec Grew",
    tooltipFabGrewUser: 'Voir uniquement mes arbres',
    tooltipFabGrewUserRecent: 'Voir mes arbres, avec les arbres les plus récents',
    tooltipFabGrewRecent: 'Voir les arbres les plus récents',
    tooltipFabGrewAll: 'Voir tous les arbres',
    tooltipRelationTable: 'Obtenir la table des relations',
    tooltipWindows: ['Minimize', 'Maximize', 'Close'],
    uploadSelectDial: 'Select one or multiple conll files',
    tableFields: ['Nom', 'Nb Phrases', 'Nb Tokens', 'Annotateurs', 'Validateurs', 'Prof', 'Arbres de', "Niveau d'exercice"],
    addUser: 'Ajouter un utilisateur',
    lexicon: [
      'Sélectionnez une ou plusieurs features pour le Lexique',
      'Features prinicipales',
      'Features auxiliares',
      'Obtenir le lexique de mes arbres',
      'Obtenir le lexique de mes arbres récents',
      'Obtenir le lexique de tous les arbres',
      'Obtenir le lexique des arbres récents',
      "Sélectionnez le type de lexique",
    ],
    projectInfoDial: {
      title: 'Information sur le projet',
      ifAdmin: "Contactez ces administrateurs de projet si vous avez besoin d'un accès ou de plus de détails:",
      else: "Contactez l'administrateur du projet si vous avez besoin d'un accès ou de plus de détails:",
    },
    tooltipExportLexicon: ['exporter en tsv', 'exporter en json'],
    tooltipRuleGrewLexicon: 'Obtenir la règle de Grew',
    tooltipUnstageModifiedItem: 'Unstage les changements de lexique sélectionnés',
    tooltipValidatorLexicon: 'Importer le validateur pour comparer',
    tooltipSelectValidator: 'Selectionner un fichier au format tsv',
  },

  // dialog window which displays create project card
  createProjectCard: {
    exerciseMode: 'Mode exercice',
  },

  exportSamples: {
    title: 'Sélectionnez les arbres que vous souhaitez exporter',
    exportMyTrees: 'Exporter mes arbres', 
    exportRecentTrees: 'Exporter les arbres les plus récents',
    exportTreesOfUsers: "Exporter des arbres d'autres utilisateurs", 
    selectOtherUsers: 'Sélectionnez les utilisateurs dont vous souhaitez exporter leurs arbres',
    export: 'Exporter'
  },

  grewSearch: {
    treesType: "Sélectionner le type d'arbres",
    search: 'Rechercher',
    rewrite: 'Réécrire',
    tryRules: 'Essayer les règles',
    grewSearchTooltip: 'Examples de requêtes de recherche de Grew',
    grewRewriteTooltip: 'Examples de requêtes de recherche et remplacement de Grew',
    grewBtnTooltip: "Vous devez d'abord sélectionner le type d'arbre", 
  },
  // window which displays project settings
  projectSettings: {
    title: 'Paramètres',
    windowClose: 'Fermer',
    descriptionSave: 'Sauvegarder la description',
    togglePrivate: 'Visibilité',
    togglePrivateCaption:
      "Les projets privés limitent l'accès et l'annotation, les projets visibles limitent uniquement l'annotation et les projets ouverts permettent à quiconque de voir et de contribuer à leur annotation.",
    toggleAllVisible: 'Tous les arbres sont visibles',
    toggleAllVisibleCaption: "Si oui, les annotateurs pourront voir les arbres des autres.",
    toggleExerciseMode: 'Mode Exercice',
    toggleExerciseModeCaption: 'Si oui, le projet a les propriétés de mode exercice',
    toggleDiffMode: 'Mode Diff',
    toggleDiffModeCaption: 'Si oui, le projet a les propriétés de mode Diff',
    chooseUserDiff: 'Utilisateur Diff',
    chooseUserDiffCaption: "L'utilisateur qui sera utilisé comme une référence pour la comparaison",
    toggleOpenProject: 'Projet ouvert',
    toggleOpenProjectCaption: 'Si oui, tout le monde peut modifier les échantillons',
    adminsPanel: 'Admins',
    guestsPanel: 'Annotateurs',
    shownFeaturesPanel: 'Shown Features',
    shownFeaturesTokens: 'Choisissez les caractéristiques à afficher sous chaque token',
    shownFeaturesSentences: 'Choisissez les caractéristiques à afficher sous chaque phrase',
    annotationSettingsInput: "Paramètres d'annotation",
    annotationSettingsSave: "Sauvegarder les paramètres d'annotation",
    checkAnnotation: 'Ceci ressemble à du JSON raisonnable',
  },
  // Klang
  Klang: {
    projects: 'Les projets Klang',
  },
};
