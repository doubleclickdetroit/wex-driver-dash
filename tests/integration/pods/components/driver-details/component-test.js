import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../../../helpers/start-mirage';

moduleForComponent('driver-details', 'Integration | Component | driver details', {
  integration: true,
  setup() {
    startMirage( this.container );
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  const driver = server.create( 'driver' );
  this.set( 'driverData', driver );

  this.render(hbs`{{driver-details driverData}}`);
  assert.equal( this.$().text().trim(), '' );

  // Template block usage:
  this.render(hbs`
    {{#driver-details driverData as |detail|}}
      <span class="test-firstName">{{detail.firstName}}</span>
      <span class="test-lastName">{{detail.lastName}}</span>
      <span class="test-driverId">{{detail.driverId}}</span>
      <span class="test-phone">{{detail.phone}}</span>
    {{/driver-details}}
  `);

  assert.equal( this.$('.test-firstName').text().trim(), driver.firstName );
  assert.equal( this.$('.test-lastName').text().trim(), driver.lastName );
  assert.equal( this.$('.test-driverId').text().trim(), driver.driverId );
  assert.equal( this.$('.test-phone').text().trim(), driver.phone );
});
