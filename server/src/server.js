const express = require('express')
const app = express()
const port = 8000
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var cors = require('cors') // Allow requests from the API
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./assu.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

app.use(cors()) //Allow API request




  

app.post('/api/subscription', (req, res, next) => {
   
    const subscription = req.body;
    const user = [
      subscription.lastName,
      subscription.firstName,
      subscription.birthDate,
      subscription.birthPlace,
      subscription.email,
      subscription.tel,
      subscription.postCode,
      subscription.city,
      subscription.profession,
      subscription.familyStatus,
    ]
    const vehicule = [
      subscription.startDate,
      subscription.model,
      subscription.brand,
      subscription.numberPlate,

    ]
    try {
    
        db.serialize(() => {
            
          // DB user data insertion
            const stmt = db.prepare('INSERT INTO subscription (first_name, last_name, birth_date, birth_place, email, tel, post_code, city, profession, family_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            
            stmt.run(user, (err)=>{
                if(err){
                  return res.json({status: 300, success: false, error: err})
                }else{
                  // retreiving the last user inserted ID
                  vehicule.push(stmt.lastID)

                  // DB user vehicule insertion
                  const stmt2 = db.prepare('INSERT INTO vehicule (start_date, model, brand, number_plate, subscription_id) VALUES (?, ?, ?, ?, ?)')
                  stmt2.run(vehicule, (err)=>{
                      if(err){
                        return res.json({status: 300, success: false, error: err})
                      }
                  })
                  
                }
                   
                })
                  
            stmt.finalize()
          
            db.each('SELECT last_name,first_name FROM subscription', (err, row) => {
              console.log(`${row.last_name}: ${row.first_name}`)
            })


          })
          
         // db.close()


        return res.json({
            status : 200,
            success: true,
        })
    } catch (error) {
        return res.json({
            status : 400,
            success: false,
        })
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})