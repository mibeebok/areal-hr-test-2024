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
  pgm.createTable("history_of_change", {
    id: { type: "serial", primaryKey: true },
    date_and_time_of_the_operation: { type: "string", notNull: true },
    who_changed_it: { type: "integer", notNull: true },
    the_object_of_operation: { type: "varchar(100)", notNull: true },
    changed_fields: { type: "jsonb", notNull: true },
    old_version: { type: "jsonb", notNull: false },
    deleted_at: { type: "varchar(50)", notNull: false },
    update_at: { type: "varchar(50)", notNull: false },
    create_at: { type: "varchar(50)", notNull: false },
  });

  pgm.addConstraint("history_of_change", "fk_history_specialist", {
    foreignKeys: {
      columns: "who_changed_it",
      references: "specialist(id)",
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
  pgm.dropTable("history_of_change");
};
