const { addConstraint } = require("node-pg-migrate");

module.exports = {
  //Create
  up: (pgm) => {
    //Passport Data
    pgm.createTable("passport_data", {
      id: { type: "serial", primaryKey: true },
      series: { type: "integer", notNull: true },
      number: { type: "integer", notNull: true },
      date_of_issue: { type: "date", notNull: true },
      unit_code: { type: "integer", notNull: true },
      issued_by_whom: { type: "varchar(100)", notNull: true },
    });

    //Registration Adress
    pgm.createTable("registration_adress", {
      id: { type: "serial", primaryKey: true },
      region: { type: "varchar(100)", notNull: true },
      locality: { type: "varchar(100)", notNull: true },
      street: { type: "varchar(100)", notNull: true },
      house: { type: "varchar(100)", notNull: true },
      building: { type: "integer", notNull: false },
      apartament: { type: "integer", notNull: true },
    });

    //Employees
    pgm.createTable("employees", {
      id: { type: "serial", primaryKey: true },
      first_name: { type: "varchar(100)", notNull: true },
      name: { type: "varchar(100)", notNull: true },
      patronymic: { type: "varchar(100)", notNull: true },
      date_of_birth: { type: "varchar(100)", notNull: true },
      id_passport_data: { type: "integer", notNull: true },
      id_registration_address: { type: "integer", notNull: true },
    });

    pgm.addConstraint("employees", "fk5", {
      foreignKeys: {
        columns: "id_passport_data",
        references: "passport_data(id)",
        onDelete: "CASCADE",
      },
    });

    pgm.addConstraint("employees", "fk6", {
      foreignKeys: {
        columns: "id_passport_data",
        references: "registration_adress(id)",
        onDelete: "CASCADE",
      },
    });

    //Files
    pgm.createTable("files", {
      id: { type: "serial", primaryKey: true },
      id_employees: { type: "integer", notNull: true },
      name: { type: "varchar(100)", notNull: true },
      file_path: { type: "varchar(100)", notNull: true },
    });

    pgm.addConstraint("files", "fk116", {
      foreignKeys: {
        columns: "id_employees",
        references: "employees(id)",
        onDelete: "CASCADE",
      },
    });

    //Organizations
    pgm.createTable("organizations", {
      id: { type: "serial", primaryKey: true },
      name: { type: "varchar(100)", notNull: true },
      comment: { type: "varchar(1000)", notNull: true },
    });

    //Department
    pgm.createTable("departments", {
      id: { type: "serial", primaryKey: true },
      id_organization: { type: "integer", notNull: true },
      parent: { type: "integer", notNull: true },
      name: { type: "varchar(100)", notNull: true },
      comment: { type: "varchar(1000)", notNull: true },
    });
    pgm.addConstraint("departments", "departments_unique_name", {
      unique: ["parent"],
    });

    pgm.addConstraint("departments", "fk11", {
      foreignKeys: {
        columns: "id",
        references: "departments(parent)",
        onDelete: "CASCADE",
      },
    });

    pgm.addConstraint("departments", "fk12", {
      foreignKeys: {
        columns: "id_organization",
        references: "organizations(id)",
        onDelete: "CASCADE",
      },
    });

    //Position
    pgm.createTable("positions", {
      id: { type: "serial", primaryKey: true },
      name: { type: "varchar(100)", notNull: true },
    });

    //Personnel Operations
    pgm.createTable("personnel_operations", {
      id: { type: "serial", primaryKey: true },
      id_employee: { type: "integer", notNull: true },
      id_department: { type: "integer", notNull: true },
      id_position: { type: "integer", notNull: true },
      setting_the_salary: { type: "integer", notNull: true },
      salary_change: { type: "integer", notNull: false },
      dismissal_from_work: { type: "boolean", notNull: false },
    });

    pgm.addConstraint("personnel_operations", "fk8", {
      foreignKeys: {
        columns: "id_department",
        references: "departments(id)",
        onDelete: "CASCADE",
      },
    });

    pgm.addConstraint("personnel_operations", "fk9", {
      foreignKeys: {
        columns: "id_position",
        references: "positions(id)",
        onDelete: "CASCADE",
      },
    });

    pgm.addConstraint("personnel_operations", "fk0", {
      foreignKeys: {
        columns: "id_employee",
        references: "employees(id)",
        onDelete: "CASCADE",
      },
    });

    //Avtorization
    pgm.createTable("avtorizations", {
      id: { type: "serial", primaryKey: true },
      login: { type: "varchar(50)", notNull: true },
      password: { type: "varchar(50)", notNull: true },
    });

    //Roles
    pgm.createTable("roles", {
      id: { type: "serial", primaryKey: true },
      id_employees: { type: "integer", notNull: true },
      code: { type: "varchar (50)", notNull: true },
    });
    pgm.addConstraint("roles", "fk13", {
      foreignKeys: {
        columns: "id_employees",
        references: "employees(id)",
        onDelete: "CASCADE",
      },
    });

    //Specialist
    pgm.createTable("spacialist", {
      id: { type: "serial", primaryKey: true },
      surname: { type: "varchar(100)", notNull: true },
      name: { type: "varchar(50)", notNull: true },
      patronymic: { type: "varchar(100)", notNull: false },
      id_avtorization: { type: "integer", notNull: true },
      id_roles: { type: "integer", notNull: true },
    });

    pgm.addConstraint("spacialist", "fk1", {
      foreignKeys: {
        columns: "id_avtorization",
        references: "avtorizations(id)",
        onDelete: "CASCADE",
      },
    });

    pgm.addConstraint("spacialist", "fk2", {
      foreignKeys: {
        columns: "id_roles",
        references: "roles(id)",
        onDelete: "CASCADE",
      },
    });

    //History Of Change
    pgm.createTable("history_of_change", {
      id: { type: "serial", primaryKey: true },
      date_and_time_of_the_operation: {
        type: "string",
        default: pgm.func("NOW()"),
      },
      who_changed_it: { type: "integer", notNull: true },
      the_object_of_operation: { type: "integer", notNull: true },
      changed_fields: { type: "jsonb", notNull: true },
    });

    pgm.addConstraint("history_of_change", "fk3", {
      foreignKeys: {
        columns: "who_changed_it",
        references: "spacialist(id)",
        onDelete: "CASCADE",
      },
    });

    pgm.addConstraint("history_of_change", "fk4", {
      foreignKeys: {
        columns: "the_object_of_operation",
        references: "personnel_operations (id)",
        onDelete: "CASCADE",
      },
    });
  },

  //Delete
  down: (pgm) => {
    pgm.dropTable("specialist");
    pgm.dropTable("history_of_change");
    pgm.dropTable("employees");
    pgm.dropTable("personnel_operations");
    pgm.dropTable("departments");
    pgm.dropTable("positions");
    pgm.dropTable("avtorizations");
    pgm.dropTable("roles");
    pgm.dropTable("passport_data");
    pgm.dropTable("registration_address");
    pgm.dropTable("files");
    pgm.dropTable("organizations");
  },
};
