import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({

  // Add custom json root. The API returns an object without a json root node.
  // We need to re-assign it to the singular version of the model name.
  // So { name: foo } becomes { post: {name: foo} }
  normalizeSingleResponse(store, primaryModelClass, rawPayload, id, requestType) {
    const typeKey = primaryModelClass.modelName;
    let payload;

    if ( !rawPayload[ typeKey ] ) {
      payload = {};
      payload[ typeKey ] = rawPayload;
    }

    return this._super( store, primaryModelClass, payload || rawPayload, id, requestType );
  },

  // Add custom json root. The API returns an array of objects without a json root node.
  // We need to re-assign it to the plural version of the model name.
  // So [ {post1}, {post2} ] becomes { posts: [ {post1}, {post2} ] }
  normalizeArrayResponse(store, primaryModelClass, rawPayload, id, requestType) {
    const pluralTypeKey = Ember.Inflector.inflector.pluralize( primaryModelClass.modelName );
    let payload;

    if ( !rawPayload[ pluralTypeKey ] ) {
      payload = {};
      payload[ pluralTypeKey ] = rawPayload;
    }

    return this._super( store, primaryModelClass, payload || rawPayload, id, requestType );
  }

});
