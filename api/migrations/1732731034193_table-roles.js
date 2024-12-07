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
  pgm.createTable("roles", {
    id: { type: "serial", primaryKey: true },
    caption: { type: "varchar (100)", notNull: true },
  });
  //справочник ролей по умолчанию
  pgm.insert("roles", ["caption"], [
    ["administration"],
    ["hr-specialist"],
  ]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("roles");
};
