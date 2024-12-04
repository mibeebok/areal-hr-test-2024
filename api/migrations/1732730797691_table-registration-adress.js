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
  pgm.createTable("registration_adress", {
    id: { type: "serial", primaryKey: true },
    region: { type: "varchar(100)", notNull: true },
    locality: { type: "varchar(100)", notNull: true },
    street: { type: "varchar(100)", notNull: true },
    house: { type: "varchar(100)", notNull: true },
    building: { type: "integer", notNull: false },
    apartament: { type: "integer", notNull: true },
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
  pgm.dropTable("registration_adress");
};
