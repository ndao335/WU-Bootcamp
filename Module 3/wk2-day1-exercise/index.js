// ADD code here



MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('cliffs', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);  // deleting collections

        const collection = db.collection('cliffs');

        collection.insertOne({name: "CLiff Trails", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);   // insert collections

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});