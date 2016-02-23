import DS from 'ember-data';

const electron = requireNode('electron');
const mainProcess = electron.remote.require('./electron');
const filesystem = mainProcess.filesystem;

export default DS.Adapter.extend({

  findAll() {
    return filesystem.all();
  },

  createRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    let filename = data.id + ".txt"
    let content = data.content

    return filesystem.write(filename, content)
       .then(file => console.log(file));
  },

  updateRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    return filesystem.write(data.id, data.content);
  }

});
