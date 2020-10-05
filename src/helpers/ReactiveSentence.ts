import {
  jsonToConll,
  conllToJson,
  TokenJson,
} from "./Conll";
import { EventDispatcher } from "./EventDispatcher";
import { TreeJson, MetaJson } from "./Conll";

///////////////                            ////////////////
///////////////    ReactiveSentence    ////////////////
///////////////                            ////////////////

export class ReactiveSentence extends EventDispatcher {
  treeJson: TreeJson = {};
  metaJson: MetaJson = {};
  sentenceConll: string = "";

  constructor() {
    super()
  }

  fromConll(sentenceConll: string) {
    this.sentenceConll = sentenceConll;

    const sentenceJson = conllToJson(this.sentenceConll);
    Object.assign(this.treeJson, sentenceJson.treeJson);
    Object.assign(this.metaJson, sentenceJson.metaJson);
    this._emitEvent();
  }

  updateToken(tokenJson: TokenJson): void {
    this.treeJson[tokenJson.ID] = tokenJson;
    this._emitEvent();
    // this._emitEvent({ tokenJson: this.treeJson[tokenJson.ID] });
  }

  updateTree(treeJson: TreeJson): void {
    for (const [tokenIndex, tokenJson] of Object.entries(treeJson)) {
      this.treeJson[tokenIndex] = tokenJson;
      Object.assign(this.treeJson[tokenIndex], tokenJson);
    }

    this._emitEvent();
  }

  _emitEvent(): void {
    const event = new CustomEvent(
      "token-updated"
      // {
      // detail: {
      //   treeJson,
      //   tokenJson,
      // },
      // }
    );

    this.dispatchEvent(event);
  }

  resetRecentChanges(): void {
    const sentenceJson = conllToJson(this.sentenceConll);
    Object.assign(this.treeJson, sentenceJson.treeJson);
    Object.assign(this.metaJson, sentenceJson.metaJson);
    this._emitEvent();
  }

  exportConllWithModifiedMeta(newMetaJson: MetaJson): string {
    for (const [metaName, metaValue] of Object.entries(this.metaJson)) {
      if (!Object.keys(newMetaJson).includes(metaName)) {
        newMetaJson[metaName] = metaValue;
      }
    }

    const sentenceJsonToExport = {
      treeJson: this.treeJson,
      metaJson: newMetaJson,
    };

    return jsonToConll(sentenceJsonToExport);
  }
}

// Object.assign(ReactiveSentence.prototype, EventDispatcher.prototype);
