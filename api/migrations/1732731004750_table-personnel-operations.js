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
  pgm.createTable("personnel_operations", {
    id: { type: "serial", primaryKey: true },
    id_employee: { type: "integer", notNull: true },
    id_department: { type: "integer", notNull: true },
    id_position: { type: "integer", notNull: true },
    setting_the_salary: { type: "integer", notNull: false },
    salary_change: { type: "integer", notNull: false },
    dismissal_from_work: { type: "boolean", notNull: false },
    deleted_at: { type: "varchar(50)", notNull: false },
    update_at: { type: "varchar(50)", notNull: false },
    create_at: { type: "varchar(50)", notNull: false },
  });

  pgm.addConstraint("personnel_operations", "fk_operations_department", {
    foreignKeys: {
      columns: "id_department",
      references: "departments(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("personnel_operations", "fk_operations_position", {
    foreignKeys: {
      columns: "id_position",
      references: "positions(id)",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("personnel_operations", "fk_operaitons_employees", {
    foreignKeys: {
      columns: "id_employee",
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
  pgm.dropTable("personnel_operations");
};
