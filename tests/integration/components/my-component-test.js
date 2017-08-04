import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';
import wait from 'ember-test-helpers/wait';

moduleForComponent('my-component', {
  integration: true
});


test('success', function(assert) {
  assert.expect(1);

  this.set('promise', RSVP.resolve('foo'));

  this.render(hbs`{{my-component promise=promise}}`);

  return wait().then(() => {
    assert.equal(this.$().text(), 'result: foo');
  });
});


test('error', function(assert) {
  assert.expect(1);

  this.set('promise', RSVP.reject('bar'));

  this.render(hbs`{{my-component promise=promise}}`);

  return wait().then(() => {
    assert.equal(this.$().text(), 'error: bar');
  });
});
