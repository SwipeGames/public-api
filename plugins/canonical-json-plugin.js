/**
 * Docusaurus plugin to ensure all API examples use canonical JSON format
 * (alphabetically sorted keys, compact formatting for cURL)
 */

module.exports = function canonicalJsonPlugin(context, options) {
  return {
    name: 'canonical-json-plugin',

    getClientModules() {
      return [require.resolve('./canonical-json-client.js')];
    },
  };
};
