import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  root:  false, // mimic wex services; make ember serializers handle this
  embed: true,  // embed associations
});
