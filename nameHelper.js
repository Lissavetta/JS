const entities = require('./entities'); 

function getEntityNameById(id) {
  const entity = entities.find(entity => entity.id === id);
  return entity ? entity.name : null; 
}

module.exports = getEntityNameById;