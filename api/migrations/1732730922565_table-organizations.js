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
  pgm.createTable("organizations", {
    id: { type: "serial", primaryKey: true },
    name: { type: "varchar(100)", notNull: true },
    comment: { type: "varchar(1000)", notNull: true },
    deleted_at: { type: "varchar(50)", notNull: false },
    update_at: { type: "varchar(50)", notNull: false },
    create_at: { type: "varchar(50)", notNull: false },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("organizations");
};
