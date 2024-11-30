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
  pgm.createTable("files", {
    id: { type: "serial", primaryKey: true },
    id_employees: { type: "integer", notNull: true },
    name: { type: "varchar(100)", notNull: true },
    file_path: { type: "varchar(100)", notNull: true },
    deleted_at: { type: "varchar(50)", notNull: false },
    update_at: { type: "varchar(50)", notNull: false },
    create_at: { type: "varchar(50)", notNull: false },
  });

  pgm.addConstraint("files", "fk_files_employees", {
    foreignKeys: {
      columns: "id_employees",
      references: "employees(id)",
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
  pgm.dropTable("files");
};
