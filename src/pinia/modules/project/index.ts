import api from '../../../api/backend-api';

import defaultState from './defaultState';
import { useUserStore } from '../user';

import { defineStore } from 'pinia';
import { notifyMessage, notifyError } from 'src/utils/notify';
import { annotationFeatures_t, project_extended_t, project_with_diff_t } from 'src/api/backend-types';
import { stat } from 'fs';

export const useProjectStore = defineStore('project', {
  state: () => {
    return defaultState();
  },
  getters: {
    getProjectConfig: (state) => state,
    isOwner: (state) =>{
      return state.admins[0] === useUserStore().username;
    },
    isAdmin: (state) => {
      return state.admins.includes(useUserStore().username) || useUserStore().super_admin;
    }, 
    isGuest: (state) => state.guests.includes(useUserStore().username) && !useUserStore().super_admin,
    isTeacher(state): boolean {
      return this.isAdmin && state.exerciseMode;
    },
    isStudent(state): boolean {
      return !this.isAdmin && state.exerciseMode;
    },
    canSaveTreeInProject(state): boolean {
      if (!useUserStore().isLoggedIn) {
        // people not logged in can't save in any case
        return false
      }
      if (this.isTeacher) {
        // teacher can't save a tree. They can only save special tree : base_tree and teacher
        return false
      }
      if (state.visibility === 2) {
        // anyone (logged in) can save in public project (visibility === 2)
        return true
      }
      // in other projects, only members, admin or superadmin can save
      return (this.isAdmin || this.isGuest)
    },
    canSeeOtherUsersTrees(state): boolean {
      if (this.isAdmin) {
        // isAdmin (admins and superadmins) can see everything in this project
        return true
      }
      if (state.exerciseMode) {
        // if project in exercice mode, only isAdmin can see trees of others on project scale
        // (students still can see trees of teacher in difficulty 1 and 2, but this is addressed elsewhere)
        return this.isAdmin
      }
      if (state.visibility >= 1) {
        // everyone can see trees from other in "visible" and "public" projects
        return true
      }
      if (state.visibility == 0) {
        // only guests (and admins, but it was already returned True earlier=
        return this.isAdmin || this.isGuest
      }
      return false
    },
    isProjectMember(): boolean {
      return this.isAdmin || this.isGuest
    },
    getAnnofjson: (state) => JSON.stringify(state.annotationFeatures, null, 4),
    getUDAnnofJson: (state) => JSON.stringify(state.annotationFeaturesUD, null, 4),
    shownMetaChoices: (state) => state.annotationFeatures.META,
    shownFeaturesChoices: (state) =>
      ['FORM', 'UPOS', 'LEMMA', 'XPOS'].concat(
        state.annotationFeatures.FEATS.map(({ name }) => `FEATS.${name}`).concat(
          state.annotationFeatures.MISC ? state.annotationFeatures.MISC.map(({ name }) => `MISC.${name}`) : []
        )
      ),
    cleanedImage: (state) => {
      const ifImageEmpty = '/images/niko-photos-tGTVxeOr_Rs-unsplash.jpg';
      if (state.image == null) return ifImageEmpty;
      if (state.image.length < 1) return ifImageEmpty;
      return state.image;
    },
  },
  actions: {
    /*
     * For now, `configShown` regroup information about `shownmeta` and `shownfeatures`
     * while `configConllu` regroup the information about `annotationfeatures`
     * both of these config are saved on different servers (resp arborator-flask and grew_server)
     * so we need to keep separate the logic in Vuex, API calls and so on
     */
    fetchProjectSettings({ projectname }: { projectname: string }) {
      api
        .getProject(projectname)
        .then((response) => {
          this.name = response.data.projectName;
          this.showAllTrees = response.data.showAllTrees;
          this.exerciseMode = response.data.exerciseMode;
          this.diffMode = response.data.diffMode;
          this.diffUserId = response.data.diffUserId;
          this.visibility = response.data.visibility;
          this.image = response.data.image;
          this.description = response.data.description;
          this.freezed = response.data.freezed;
        })
        .then(() => {
          api.getProjectUsersAccess(projectname).then((response) => {
            this.admins = response.data.admins;
            this.guests = response.data.guests;
          });
          api.getProjectFeatures(projectname).then((response) => {
            this.shownmeta = response.data.shownmeta;
            this.shownfeatures = response.data.shownfeatures;
          });
          api
            .getProjectConlluSchema(projectname)
            .then((response) => {
              let fetchedAnnotationFeatures = response.data.annotationFeatures;
              // check if there is a json in proper format, otherwise use default ConfigConllu
              if (typeof fetchedAnnotationFeatures !== 'object' || fetchedAnnotationFeatures === null) {
                // commit("reset_project_config");
                fetchedAnnotationFeatures = this.annotationFeatures;
              }
              this.annotationFeatures = fetchedAnnotationFeatures;
            })
            .catch((error) => {
              notifyError({ error });
            });
        });
    },
    // KK TODO
    // there is still a mismatch between all name 'updateProjectSettings' and 'updateProjectSettings'
    // ... so we have to get a proper data structure of the whole setting for then having better
    // ... separation of conscerns for API calls
    putProjectDescription() {
      api
        .updateProject(this.name, { description: this.description })
        .then(() => {
          notifyMessage({ message: 'New project description saved on the server', icon: 'save' });
        })
        .catch((error) => {
          notifyError({ error });
          // message: `${error}`,
          // color: 'negative',
          // position: 'bottom',
        });
    },

    updateProjectSettings(toUpdateObject: Partial<project_extended_t | project_with_diff_t>) {
      return new Promise((resolve, reject) => {
        api
          .updateProject(this.name, toUpdateObject)
          .then((response) => {
            this.$patch(toUpdateObject);
            notifyMessage({ message: 'New project settings saved on the server', icon: 'save' });
            resolve(response);
          })
          .catch((error) => {
            notifyError({
              error: error,
            });
            // message: `${error}`,
            // color: 'negative',
            // position: 'bottom',
            reject(error);
          });
      });
    },
    updateProjectShownFeatures({ projectname, toUpdateObject }: { projectname: string; toUpdateObject: any }) {
      return new Promise((resolve, reject) => {
        api
          .updateProjectFeatures(projectname, toUpdateObject)
          .then((response) => {
            this.$patch(toUpdateObject);
            notifyMessage({ message: 'New project features saved on the server', icon: 'save' });
            resolve(response);
          })
          .catch((error) => {
            notifyError({ error });
            reject(error);
          });
      });
    },
    postImage(newImage: string) {
      return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('files', newImage);
        api
          .uploadProjectImage(this.name, form)
          .then((response) => {
            this.$patch({ ...response.data });
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateProjectConlluSchema(projectname: string, annotationFeatures: annotationFeatures_t) {
      return new Promise((resolve, reject) => {
        api
          .updateProjectConlluSchema(projectname, {
            config: annotationFeatures,
          })
          .then((response) => {
            this.annotationFeatures = annotationFeatures;
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data.errors);
          });
      });
    },

    /// / for now, AnnotationFeatures is the same thing as configConllu. We need to find an appropriate short name
    resetAnnotationFeatures(): void {
      this.annotationFeatures = defaultState().annotationFeatures;
    },
    resetAnnotationFeaturesUD(): void {
      this.annotationFeatures = defaultState().annotationFeaturesUD;
    },
    // KK IS IT IN KLANG STORE NOW ?
    // // method for fetching klang project's settings, currently only admins
    // fetchKlangProjectSettings({ projectname }: { projectname: string }) {
    //   api
    //     .getKlangProjectAdmins(projectname)
    //     .then((response) => {
    //       const admins = response.data;
    //       commit('set_klang_project_settings', {
    //         admins,
    //       });
    //     })
    //     .catch((error) => {
    //       notifyError({ error });
    //     });
    // },
  },
});
