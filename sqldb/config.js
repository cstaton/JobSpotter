var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;
var dbname = process.env.DBNAME || 'jobs';
var dbuser = process.env.DBUSER || 'root';
var dbpassword = process.env.DBPASSWORD || '';


var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: host,
    user: dbuser,
    password: dbpassword,
    database: dbname,
    charset: 'utf8',
    port: port
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('Jobs').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Jobs', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.text('description');
      table.float('equity_min');
      table.float('equity_max');
      table.float('salary_min');
      table.float('salary_max');
      table.string('currency', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('Locs').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Locs', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('Roles').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Roles', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('Skills').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Skills', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('Startups').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Startups', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('loc_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('loc_job', function (table) {
      table.timestamps();
      table.uuid('Job_rowId').primary();
      table.uuid('Loc_rowId').primary();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('role_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('role_job', function (table) {
      table.timestamps();
      table.uuid('Job_rowId').primary();
      table.uuid('Role_rowId').primary();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('skill_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('skill_job', function (table) {
      table.timestamps();
      table.uuid('Job_rowId').primary();
      table.uuid('Skill_rowId').primary();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

db.knex.schema.hasTable('startup_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('startup_job', function (table) {
      table.timestamps();
      table.uuid('Job_rowId').primary();
      table.uuid('Startup_rowId').primary();
    }).then(function (table) {
      console.log('Create Table', table);
    });
  }
});

module.exports = db;