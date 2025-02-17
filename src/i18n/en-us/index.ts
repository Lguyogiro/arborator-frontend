// updated by https://github.com/emmettstr
export default {
  failed: 'Action failed',
  success: 'Action successful',
  oops: 'Something went wrong: ',
  error403: 'Hey you! You do not have the permissions for this action. Please contact the administrator.',
  error401: 'Hey you! Please log in to do any further actions of that type.',
  error404page: "Doh! There's nothing here...",
  error415: 'Hey you! Only CONLL files with UTF-8 encoding format are supported.',
  welcomeback: 'Welcome back to Arborator!',
  loginbtn: 'Log in',
  loginselector: 'Connect via',
  switchLanguage: 'Switch the language of the user interface',
  documentation: 'See the documantation',
  feedback:'Any questions, feature requests or bug report ? See our github issues page',
  darkMode: 'Toggle dark mode',
  projectAdmin: 'You are admin of this project',
  userInformation: 'You are connected with ',
  settings: 'Settings',
  admin: 'Admin',
  fullscreen: 'Fullscreen',
  navhome: 'Home',
  navprojects: 'Projects',
  navsettings: 'Settings',
  navklang: 'Klang',

  // confirm action dialog
  confirmAction: {
    title: 'Are you sure?',
    message: 'You are about to perform an irrevocable action. Do you really want to proceed?',
    warning: ['Please type something', 'The project name does not correspond'],
    hint: 'Type the project name',
    label: 'Your project name*',
  },

  // first page (the index)
  homepage: {
    accessTreebankBtn: 'Access Treebanks',
    slogan: 'Treebank Annotation for Human Beings',
    features: [
      'Annotate and Share your Treebanks',
      'Query and Search using State-of-the-art Grammars',
      'Free and Open Source',
      'Team up and Manage Access to your Projects',
    ],
    scroll: 'Scroll down to see more',
    arboheadline: "Arborator's Collaborative Annotation",
    grewheadline: "Grew's Graph Grammar",
    descriptionCard: {
      title: 'A collaborative annotation tool for treebank development',
      subtitle: "An easy to use graphic annotation interface makes it annotation the best part of a linguist's day.",
      content: [
        'Just drag a word on the other to make a dependency relation. Just click on a word to change its features. Just choose the words to make them tokens. The dependency set, the tagset, and the feature set are fully configurable. We provide ready-made configurations for',
        'and',
      ],
      tooltipSud: 'SUD: The surface-syntactic, distribution-based version of Universal Dependencies',
      tooltipUd: 'Universal Dependencies: The amazing collaborative treebank annotation project providing 150 treebanks in 90 languages',
    },
    grewCard: {
      title: 'Search with a powerful graph grammar',
      subtitle: 'Modify the search results directly in the Web interface',
      content: [
        'A good treebank is a lot about curation, about finding the problems and correcting them coherently. With Arborator-Grew, there is no more back and forth between different websites or twisting your mind with complex greps in CoNLL files. Well, you got to learn the',
        "syntax, but that's a breeze with all the great examples and tutorials provided.",
      ],
      tooltipGrew: 'The grew graph grammar',
    },
    collaborativeCard: {
      title: 'Together with others you can build beautiful treebanks',
      subtitle: 'Social login makes Arborator-Grew a hazzle free tool',
      content: [
        'You control who accesses your annotation projetct, and no annotator can destroy other trees than their owns.',
        'Push the CoNLL data onto your GitHub project and share your beautiful trees from there.',
        'Try it all out on our',
      ],
      playgroundBtn: 'Playground',
    },
    sourceCard: {
      title: 'Source code',
      content: [
        'Head over to',
        'to have a look and grab the code.',
        'Get involved and give us feedback on the',
        'issue page of this Arborator front-end',
        'A guide to install Arborator-Grew on your own server will be provided here shortly...',
      ],
      tooltipGit: 'our GitHub page',
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
      title: 'Cite us',
    },
    toolsCard: {
      title: 'Other Arborator tools',
      content: [
        'If you just want to look at a CoNLL file quickly, check out this:',
        'No login!',
        'Fast CoNLL files viewer',
        'For quick graphical modification of a CoNLL file:',
        'CoNLL files graphical editor',
        'The legacy Arborator is still running here',
      ],
    },
    footertextmadewith: 'Made with',
    footertextin: 'in', // reaaallllll basic one, not good enough but still buggy using span and html parse
    textGetUserEmailDialog: [
      'For the proper management of the service, we may need to contact you, especially for the removal of unused projects. Your email will only be used for communications regarding ArboratorGrew and will not be shared with third parties.',
      'You may refuse to the communication of your email, but if you do, we reserve the right to delete your projects without notice.',
      'You can modify or delete your contact email at any time from your account.',
    ],
    checkboxEmailDialog: [
      'I understand that my email will be stored on the ArboratorGrew server located in Europe.',
      'I refuse to share my email.',
      'I subscribe to the newsletter that will be sent to keep me informed of new features or incidents on the platform (no more than a few emails per month).',
    ],
    submitMessage: "Your choices are updated",
    inputErrorText: ['Please type something', 'Please type valid email'],
    tootltipBtnSumbitUserEmail: 'Please check the box if you would like to receive Emails',
    submitEmailBtn: 'Soumettre',
  },

  // list of projects page
  projectHub: {
    tooltipCreaProject: ['Login your account to create new project', 'Create a new project'],
    tooltipChangeView: 'Change view',
    tooltipRightClickDelete: 'Right click to delete',
    title: 'Projects',
    sample: 'sample',
    samples: 'samples',
    rightClickSettings: 'Settings',
    rightClickDelete: 'Delete',
    emptySearch: 'Search for project',
    projectCategory: 'Category',
    allProjects: 'All the projects',
    myProjects: 'My Projects',
    myOldProjects: 'My Project Purgatory',
    myOldProjectInfo:
      'These old projects have not been used for a long time. We might delete them anytime. Use them or download the data and erase the project (right click).',
    otherProjects: 'Other Projects',
    otherOldProjects: 'The Project Purgatory',
    otherOldProjectInfo: 'These old projects have not been used for a long time. We may delete them at any time. Use them or notify the creators.',
    lastAccess: 'last access',
    lastWriteAccess: 'last modification',
    longtime: 'a long time ago',
  },

  // page when you enter a project ( samples info, etc)
  projectView: {
    project: 'Project',
    tooltipSettings: 'Modify project settings',
    tooltipViewAdmin: 'View administrator information',
    nodata: [
      'Oops! No data to display...',
      'No sample yet. This project is empty, please upload some conll files.',
      'Ask an administrator to add files',
    ],
    tooltipAddSample: 'Add new samples',
    tooltipExportSample: ['Select the samples you want to export', 'Export selected samples'],
    tooltipDeleteSample: ['Select the samples you want to delete', 'Delete selected samples'],
    tooltipCreateLexicon: ['Select the samples to create a lexicon', 'Create lexicon from selected samples'],
    tooltipParsingPanel: ['Open parsing panel', 'Close parsing panel'],
    tooltipParser: [
      'Select samples to train a parser',
      'train with the selected samples',
      'Click to set the parameters for parser',
      'Click to interrupt parsing',
    ],
    tooltipMore: 'More options',
    tooltipSynchronizedProject: 'This project is synchronized with',
    tooltipSearch: 'Search a sample',
    tooltipSelectVisible: 'Select visible columns',
    tooltipFullscreen: 'Fullscreen table',
    tooltipFabGrew: 'Search with Grew',
    tooltipFabGrewUser: 'View only my trees',
    tooltipFabGrewUserRecent: 'View my trees, filled up with the most recent trees',
    tooltipFabGrewRecent: 'View most recent trees',
    tooltipFabGrewAll: 'View all trees',
    tooltipRelationTable: 'Get Relation Tables',
    tooltipWindows: ['Minimize', 'Maximize', 'Close'],
    search: 'Search',
    uploadSelectDial: 'Select one or multiple conll files',
    tableFields: ['Name', 'Nb Sentences', 'Nb Tokens', 'Annotators', 'Validators', 'Prof', 'Trees From', 'Exercise Level'],
    addUser: 'Add user',
    lexicon: [
      'Select one or multiple features for the Lexicon',
      'Similar features',
      'Ambiguous features',
      'Get the lexicon of my trees',
      'Get the lexicon of my recent trees',
      'Get the lexicon of all the trees',
      'Get the lexicon of the recent trees',
      'Select the user type',
    ],
    projectInfoDial: {
      title: 'Project Information',
      ifAdmin: 'Contact these project administrators if you need access or further information:',
      else: 'Contact the project administrator if you need access or further information:',
    },
    tooltipExportLexicon: ['export to tsv', 'export to json'],
    tooltipRuleGrewLexicon: 'Generate Grew rule',
    tooltipUnstageModifiedItem: 'Unstage selected lexicon changes',
    tooltipValidatorLexicon: 'Import validator to compare',
    tooltipSelectValidator: 'Select a file in tsv format',
    tootltipUserType: [
      'View only my trees',
      'View my trees, filled up with the most recent trees',
      'View most recent trees'
    ],
    freezeProject: ['Freeze this project', 'Unfreeze this project', 'This project is freezed'],
    removeUserTrees: ["Remove user's trees", "Select samples"],

  },
  // dialog window which displays create project card
  createProjectCard: {
    title: 'Create New Project',
    projectName: 'Project name',
    visibilityMode: ['Private', 'Visible', 'Open'],
    exerciseMode: 'exercise mode',
    showAllTrees: 'Show All Trees',
    create: 'Create',
    createMessage: 'is created',
  },

  exportSamples: {
    title: 'Select the trees you want to export',
    exportMyTrees: 'Export my trees',
    exportRecentTrees: 'Export the most recent trees',
    exportTreesOfUsers: 'Export trees from other users',
    selectOtherUsers: 'Select the users whose trees you want to export',
    export: 'Export'
  },

  grewSearch: {
    treesType: 'Select trees type',
    search: 'Search',
    rewrite: 'Rewrite',
    tryRules: 'Try rules',
    grewSearchTooltip: 'Examples of Grew search statements',
    grewRewriteTooltip: 'Examples of Grew search and replacement statements',
    grewBtnTooltip: 'You have to select trees type first',
    showDiffTitle: 'Select the set of features  and users for which you look for differences',
    showDiffUsersSelect: 'Select the set of users',
    showDiffUsersTooltip: 'You have to select at least two users',
    showDiffFaturesSelect: 'Select the set of features',
    showDiffFeaturesTooltip: 'if empty and at least two diff users are selected, all features will be taken into account for diff',
    showDiffBtn: 'Show differences',
    applyRule: 'Apply rule',
    applyRuleTooltip: 'Select at least one tree to which you wish to apply the rule',
    selectAllTooltip: 'Select All',
    selectSetOfUserToHaveTree: 'Select the set of users to have tree',
    selectSetOfUserToNotHaveTree: 'Select the set of users to NOT have tree',
    selectSetOfUserToHaveDiffs: 'Select the set of users to have diffs',
    selectSetOfUserToNotHaveDiffs: 'Select the set of users to NOT have diffs',
  },
  // window which displays project settings
  projectSettings: {
    title: 'Settings',
    windowClose: 'Close',
    descriptionSave: 'Save description',
    togglePrivate: 'Visibility',
    togglePrivateCaption:
      'Private projects restrain access and annotation, Visible projects restrain only annotation and Open projects allow anyone to view and contribute their annotation',
    toggleAllVisible: 'All trees visible',
    toggleAllVisibleCaption: "If true, annotators will be able to see others' trees",
    toggleExerciseMode: 'Exercise mode',
    toggleExerciseModeCaption: 'if true, the project has exercise mode properties',
    toggleDiffMode: 'Diff mode',
    toggleDiffModeCaption: 'if true, the project has diff mode properties',
    chooseUserDiff: 'Diff user',
    chooseUserDiffCaption: 'user that will be used as reference for the comparaison',
    toggleOpenProject: 'Open project',
    toggleOpenProjectCaption: 'If true, anyone can edit samples',
    adminsPanel: 'Admins',
    guestsPanel: 'Annotators',
    shownFeaturesPanel: 'Shown Features',
    shownFeaturesTokens: 'Choose the features to be shown under each token',
    shownFeaturesSentences: 'Choose the features to be shown under each sentence',
    annotationSettingsInput: 'Annotation settings',
    annotationSettingsSave: 'Save annotation settings',
    checkAnnotation: 'This looks like reasonable Json',
  },
  settingsPage:{
    saveModifications: 'Save Modification',
    firstName: 'First Name',
    familyName: 'Last Name',
    saveModificationMessage: 'Your personal information is updated',
  },
  github:{
    synchronizeBtn: 'Synchronize with github',
    skipSync: 'Skip synchronization',
    chooseRepoOwner: 'Repository Owner',
    search: 'Search a repository',
    select: 'Select',
    noGithubRepos: 'You need to create your first Github Repository',
    selectBranch: 'Select a branch to clone',
    arboratorgrewBranch:['Use ','branch for your commits and pulls made using ArboratorGrew.'],
    defaultBranch: ' Use the selected branch (Be careful if you work with a repository that has many collaborators).',
    synchronize: 'Synchronize',
    syncWarningMessage: 'The repository is large, the synchronization will take some time',
    synchronizeMessage: 'is synchronized with',
    commitNotif: ['You have', 'change', 'changes', "You don't have changes to commit"],
    pullNotif: ['Check pull', 'Refresh to see if there are changes to pull', 'Pull available', 'Pull changes'],
    pullRequest: 'Open new Pull request from your changes',
    removeSync: ['Remove synchronization', 'Your project is synchronized with'],
    deletionWarning: 'This action will also remove the file from your synchronized github repository.',
    commitDialog: {
      title: 'Commit the changes',
      commitInput: 'Commit message',
      commitTreeSelect: 'Select the trees to commit',
      commitTreeOptions: ['My trees', 'My trees filled up with the most recent ones'],
      commitMessage: 'New commit to',

    }
  },
  sentenceCard: {
    selectTooltip: 'Select the sentence to split the tokens',
    annotationErrors: 'See your annotation errors',
    saveTeacher: 'Save as teacher',
    saveBaseTree: 'Save as base_tree',
    saveTree: ["Save tree", "as"],
    editMetadata: "Edit this trees's metadata",
    multiEditDial: 'Multi edit dialog',
    diffMode: ['Enter', 'Leave', 'Diff mode'],
    treeLink: 'Get direct link to this tree',
    treeConll: 'Get CoNLL-U of this tree',
    treeSVG: 'Get SVG of this tree',
    addToken: 'Add new token',
    editToken: 'Edit tokens',
    saveModif: 'The tree has some pendings modifications not saved',
    modified: ['Modified', 'ago'],
    modifTime: ['senconds', 'minutes', 'hours', 'days'],
    automaticParsing: 'Automatic parsing',
    conllText: 'Text Conll',
    statisticDial: 'Stastistics of the current opened tree',

  },
  attributeTable: {
    addFeature: 'Add new feature',
    eraseFeature: 'Erase the attribute',
    features: 'Features of',
    category: ['Select a category for', 'Category'],
    metadata: 'Metadata of this sentence',
    relation: ['Select a relation going from', 'to', 'Dependency relation'],
    tokenReplaceDial: [
      'Replacing',
      'by',
      'Changing tokens breaks the comparability of different annotations of the same sentence',
      'Replacement',
    ],
  },
  cancel:'Cancel',
  delete: 'Delete',
  confirm: 'Confirm',
  // Klang
  Klang: {
    projects: 'Klang Projects',
  },
};
