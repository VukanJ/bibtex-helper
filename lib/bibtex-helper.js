'use babel';

import BibtexHelperView from './bibtex-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  bibtexHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.bibtexHelperView = new BibtexHelperView(state.bibtexHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.bibtexHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bibtex-helper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.bibtexHelperView.destroy();
  },

  serialize() {
    return {
      bibtexHelperViewState: this.bibtexHelperView.serialize()
    };
  },

  toggle() {
    console.log('BibtexHelper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
