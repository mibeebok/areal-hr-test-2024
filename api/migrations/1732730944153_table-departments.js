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
  pgm.createTable("departments", {
    id: { type: "serial", primaryKey: true },
    id_organization: { type: "integer", notNull: true },
    parent: { type: "integer", notNull: true },
    name: { type: "varchar(100)", notNull: true },
    comment: { type: "varchar(1000)", notNull: true },
    deleted_at: { type: "varchar(50)", notNull: false },
    update_at: { type: "varchar(50)", notNull: false },
    create_at: { type: "varchar(50)", notNull: false },
  });
  pgm.addConstraint("departments", "departments_unique_name", {
    unique: ["parent"],
  });

  pgm.addConstraint("departments", "fk_department_parent", {
    foreignKeys: {
      columns: "id",
      references: "departments(parent)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("departments", "fk_department_organization", {
    foreignKeys: {
      columns: "id_organization",
      references: "organizations(id)",
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
  pgm.dropTable("departments");
};
