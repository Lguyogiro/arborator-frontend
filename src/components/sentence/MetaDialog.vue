<template>
  <!----------------- Start MetaDialog ------------------->

  <q-dialog v-model="metaDialogOpened">
    <q-card style="width: 110vh">
      <q-bar class="bg-primary text-white">
        <div class="text-weight-bold">{{$t('attributeTable.metadata')}}</div>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <AttributeTable
        :featdata="metaList"
        :columns="featTable.columns"
        :feat-options="metaOptions"
        open-features="true"
        modifiable="true"
        :title="$t('attributeTable.metadata')"
      ></AttributeTable>
      <!-- @feature-changed="informFeatureChanged()" -->
      <q-separator />
      <!-- todo: adapt informFeatureChanged also to metadata -->
      <q-card-actions align="around">
        <q-btn v-close-popup flat :label="$t('cancel')" style="width: 45%; margin-left: auto; margin-right: auto" />
        <q-btn
          v-close-popup
          color="primary"
          label="Ok"
          style="width: 45%; margin-left: auto; margin-right: auto"
          :disabled="!someFeatureChanged"
          @click="onMetaDialogOk()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!----------------- End MetaDialog ------------------->
</template>
<script lang="ts">
import { mapState } from 'pinia';
import AttributeTable from './AttributeTable.vue';
import { useProjectStore } from 'src/pinia/modules/project';
import { sentence_bus_t } from 'src/types/main_types';
import { PropType } from 'vue';
import { MetaJson } from 'conllup/lib/conll';
import { notifyError, notifyMessage } from 'src/utils/notify';

import { defineComponent } from 'vue';

export default defineComponent({
  components: { AttributeTable },
  props: {
    sentenceBus: {
      type: Object as PropType<sentence_bus_t>,
      required: true,
    },
  },
  data() {
    const metaList: { a: string; v: string | number }[] = [];
    const metaJson: MetaJson = {};
    return {
      metaDialogOpened: false,
      token: {},
      userId: '',
      metaList,
      metaJson,
      featTable: {
        columns: [
          {
            name: 'a',
            align: 'center',
            label: 'Attribute',
            field: 'a',
            sortable: true,
            style: 'width: 33%',
          },
          {
            name: 'v',
            label: 'Value',
            field: 'v',
            sortable: true,
          },
          {
            name: 'actions',
            label: 'Actions',
            field: '',
            align: 'center',
            style: 'width: 8%',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(useProjectStore, ['shownMetaChoices']),
    someFeatureChanged() {
      return true;
    },
    metaOptions() {
     let metaOptions: {name: string, values: string}[] =  [];
     for (const metaOption of this.shownMetaChoices){
      if (!Object.keys(this.metaJson).includes(metaOption)){
      metaOptions.push({name: metaOption, values: 'string' });
      }
     }
     return metaOptions;
    }
  },
  mounted() {
    this.sentenceBus.on('open:metaDialog', ({ userId }: { userId: string }) => {
      this.userId = userId;
      this.metaJson = { ...this.sentenceBus.sentenceSVGs[userId].metaJson };
      this.metaDialogOpened = true;
      this.metaList = [];
      for (const a in this.metaJson) {
        this.metaList.push({ a, v: this.metaJson[a] });
      }
      this.$emit('meta-changed', this.metaJson); // so that the sentenceCard can show the meta feature such as text and text_en
    });
  },
  beforeUnmount() {
    this.sentenceBus.off('open:uposDialog');
  },
  methods: {
    onMetaDialogOk() {
      const newMetaJson: MetaJson = {};
      if (this.metaList.some((meta) => meta.a === '' || meta.v === '')) {
        notifyError({ error: 'You can not save empty Meta !' });
        return;
      }
      this.metaList.forEach((meta) => {
        newMetaJson[meta.a] = meta.v;
      });
      this.sentenceBus.emit('tree-update:sentence', {
        sentenceJson: {
          metaJson: newMetaJson,
          treeJson: this.sentenceBus.sentenceSVGs[this.userId].treeJson,
        },
        userId: this.userId,
      });
      notifyMessage({
        message: "Meta changed locally, don't forget to save !",
        type: 'warning',
        icon: 'warning',
      });
    },
  },
});
</script>
<style></style>
