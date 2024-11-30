/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("employees", {
    id: { type: "serial", primaryKey: true },
    first_name: { type: "varchar(100)", notNull: true },
    name: { type: "varchar(100)", notNull: true },
    patronymic: { type: "varchar(100)", notNull: true },
    date_of_birth: { type: "varchar(100)", notNull: true },
    id_passport_data: { type: "integer", notNull: true },
    id_registration_adress: { type: "integer", notNull: true },
    deleted_at: { type: "varchar(50)", notNull: false },
    update_at: { type: "varchar(50)", notNull: false },
    create_at: { type: "varchar(50)", notNull: false },
  });

  pgm.addConstraint("employees", "fk_employees_passport", {
    foreignKeys: {
      columns: "id_passport_data",
      references: "passport_data(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("employees", "fk_employees_adress", {
    foreignKeys: {
      columns: "id_registration_adress",
      references: "registration_adress(id)",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("employees");
};
