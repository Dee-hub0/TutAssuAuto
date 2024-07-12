const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./assu.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

db.serialize(() => {

    $sql1 = 'CREATE TABLE subscription (id INTEGER PRIMARY KEY, first_name, last_name, birth_date, birth_place, email, tel, post_code, city, profession, family_status)'
    $sql2 = 'CREATE TABLE vehicule (id INTEGER PRIMARY KEY, start_date, model, brand, number_plate, subscription_id INTEGER, FOREIGN KEY(subscription_id) REFERENCES subscription(id))'
    db.run($sql1)
    db.run($sql2)

})
