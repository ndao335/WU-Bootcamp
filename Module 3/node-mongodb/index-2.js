const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'westcliff';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('westcliff', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Cliffs Demo", description: "Test"},
            'westcliff', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'westcliff', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Cliffs Demo" },
                    { description: "Updated Test Description" }, 'westcliff',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'westcliff', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Cliffs Demo" },
                                'westcliff', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});