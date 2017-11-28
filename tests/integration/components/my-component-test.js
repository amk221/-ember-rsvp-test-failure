import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';
import wait from 'ember-test-helpers/wait';

moduleForComponent('my-component', {
  integration: true,

  beforeEach() {
    this.set('promise', new RSVP.Promise((resolve, reject) => {
      this.resolveWith = resolve;
      this.rejectWith = reject;
    }));

    this.render(hbs`{{my-component promise=promise}}`);
  }
});

test('pending', function(assert) {
  assert.equal(this.$().text(), 'please wait');
});

test('success', function(assert) {
  assert.expect(1);

  this.resolveWith('foo');

  return wait().then(() => {
    assert.equal(this.$().text(), 'result: foo');
  });
});


// This passes with 2.14.x fails with 2.15.x
test('error', function(assert) {
  assert.expect(1);

  this.rejectWith('bar');

  return wait().then(() => {
    assert.equal(this.$().text(), 'error: bar');
  });
});
