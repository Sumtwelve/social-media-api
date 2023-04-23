const User = require('./User');
const Thought = require('./Thought');
// FIXME: Do I need to export Reaction? It's just a schema, not a model
const Reaction = require('./Reaction');

module.exports = { User, Thought, Reaction };