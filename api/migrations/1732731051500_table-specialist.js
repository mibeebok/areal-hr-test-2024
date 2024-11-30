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
  pgm.createTable("specialist", {
    id: { type: "serial", primaryKey: true },
    surname: { type: "varchar(100)", notNull: true },
    name: { type: "varchar(50)", notNull: true },
    patronymic: { type: "varchar(100)", notNull: false },
    id_avtorization: { type: "integer", notNull: true },
    id_roles: { type: "integer", notNull: true },
  });
  pgm.addConstraint("specialist", "fk_specialist_avtorization", {
    foreignKeys: {
      columns: "id_avtorization",
      references: "avtorizations(id)",
      onDelete: "CASCADE",
    },
  });
  pgm.addConstraint("specialist", "fk_specialist_role", {
    foreignKeys: {
      columns: "id_roles",
      references: "roles(id)",
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
  pgm.dropTable("specialist");
};
