import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    this.get('promise')
      .then(result => this.set('result', result))
      .catch(error => this.set('error', error));
  }
});
