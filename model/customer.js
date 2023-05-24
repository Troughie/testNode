const dbconnect = require("./db/dbconnect");
const customerModel = {
      getCustomers: (cb) => {
            return dbconnect.query(
                  "SELECT id,name,email,image from customer",
                  cb
            );
      },

      findCustomer: (id, cb) => {
            return dbconnect.query(
                  "SELECT * from customer where id=?",
                  [id],
                  cb
            );
      },

      createCustomer: (customer, cb) => {
            return dbconnect.query(
                  "INSERT INTO customer(name,email,image) VALUE(?,?,?)",
                  [customer.name, customer.email, customer.image],
                  cb
            );
      },

      deleteCustomer: (id, cb) => {
            return dbconnect.query("DELETE from customer where id=?", [id], cb);
      },

      updateCustomer: (id, customer, cb) => {
            return dbconnect.query(
                  "UPDATE customer set name=?,email=?,image=? where id=?",
                  [customer.name, customer.email, customer.image],
                  [id],
                  cb
            );
      },
};
module.exports = customerModel;
