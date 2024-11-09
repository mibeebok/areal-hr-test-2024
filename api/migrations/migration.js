const { addConstraint } = require("node-pg-migrate");

module.exports={
    up:(pgm) =>{
        pgm.createTable('avtorizations', {
            id: 'id',
            login:{type:'varchar(50)', notNull:true},
            password:{type: 'varchar (50)', notNull:true},
        });
        pgm.addConstrain ('avtorizations', 'avtorization_primary_key', {
            inque:['id'],
        });

        pgm.createTable('spacialist', {
            id: 'id',
            surname:{type:'varchar(100)', notNull:true},
            name:{type: 'varchar (50)', notNull:true},
            patronymic:{type: 'varchar (100)', notNull:false},
            id_avtorization:{type: 'integer', notNull:true},
            ig_roles:{type: 'integer', notNull:true},
        });
        pgm.addConstrain ('spacialist', 'spacialist_primary_key', {
            inque:['id'],
        });

        pgm.createTable('roles', {
            id: 'id',
            hr_spacialist:{type:'varchar(50)', notNull:true},
            administration:{type: 'varchar (50)', notNull:true},
        });
        pgm.addConstrain ('avtorizations', 'avtorization_primary_key', {
            inque:['id'],
        });

        pgm.createTable('passport_data', {
            id: 'id',
            series:{type:'integer', notNull:true},
            number:{type: 'integer', notNull:true},
            date_of_issue:{type: 'date', notNull:true},
            unit_code:{type: 'integer', notNull:true},
            issued_by_whom:{type: 'varchar(100)', notNull:true},
        });
        pgm.addConstrain ('passport_data', 'passport_data_primary_key', {
            inque:['id'],
        });

        pgm.createTable('history_of_change', {
            id: 'id',
            date_and_time_of_the_operation:{type:'datetime', notNull:true},
            who_changed_it:{type: 'integer', notNull:true},
            the_object_of_operation :{type: 'integer', notNull:true},
            changed_fields :{type: 'json', notNull:true},
        });
        pgm.addConstrain ('history_of_change', 'history_of_change_primary_key', {
            inque:['id'],
        });

        pgm.createTable('registration_address', {
            id: 'id',
            region:{type:'varchar (100)', notNull:true},
            locality :{type: 'varchar (100)', notNull:true},
            street  :{type: 'varchar (100)', notNull:true},
            house  :{type: 'varchar (100)', notNull:true},
            building   :{type: 'integer', notNull:false},
            apartament   :{type: 'integer', notNull:true},
        });
        pgm.addConstrain ('registration_address', 'registration_address_primary_key', {
            inque:['id'],
        });

        pgm.createTable('files', {
            id: 'id',
            name :{type:'varchar (100)', notNull:true},
            file  :{type: 'varchar (100)', notNull:true},
        });
        pgm.addConstrain ('files', 'files_primary_key', {
            inque:['id'],
        });

        pgm.createTable('employees', {
            id: 'id',
            first_name:{type:'varchar (100)', notNull:true},
            name :{type: 'varchar (100)', notNull:true},
            patronymic :{type: 'varchar (100)', notNull:true},
            date_of_birth :{type: 'varchar (100)', notNull:true},
            id_passport_data :{type: 'integer', notNull:true},
            id_registration_address :{type: 'integer', notNull:true},
            id_scan  :{type: 'integer', notNull:true},
        });
        pgm.addConstrain ('employees', 'employees_primary_key', {
            inque:['id', 'id_passport_data', 'id_registration_address' ],
        });

        pgm.createTable('organizations', {
            id: 'id',
            name :{type: 'varchar (100)', notNull:true},
            comment   :{type: 'varchar (1000)', notNull:true},
        });
        pgm.addConstrain ('organizations', 'organizations_primary_key', {
            inque:['id'],
        });

        pgm.createTable('personnel_operations', {
            id: 'id',
            id_employee :{type:'integer', notNull:true},
            id_department  :{type: 'integer', notNull:true},
            id_position  :{type: 'integer', notNull:true},
            setting_the_salary  :{type: 'varchar (100)', notNull:true},
            salary_change  :{type: 'integer', notNull:false},
            dismissal_from_work  :{type: 'boolean', notNull:false},
        });
        pgm.addConstrain ('personnel_operations', 'personnel_operations_primary_key', {
            inque:['id'],
        });

        pgm.createTable('departments', {
            id: 'id',
            id_organization :{type:'integer', notNull:true},
            parent :{type: 'integer', notNull:true},
            name :{type: 'varchar (100)', notNull:true},
            comment :{type: 'varchar (1000)', notNull:true},
        });
        pgm.addConstrain ('departments', 'departments_primary_key', {
            inque:['id'],
        });

        gm.createTable('positions', {
            id: 'id',
            name :{type: 'varchar (100)', notNull:true},
        });
        pgm.addConstrain ('departments', 'departments_primary_key', {
            inque:['id'],
        });


        pgm.addConstraint('spacialist', 'fk1', { 
            foreignKeys: { 
              columns: 'id_avtorization', 
              references: 'avtorizations(id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('spacialist', 'fk2', { 
            foreignKeys: { 
              columns: 'id_roles', 
              references: 'roles(id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('history_of_change', 'fk3', { 
            foreignKeys: { 
              columns: 'who_changed_it', 
              references: 'specialist(id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('history_of_change', 'fk3', { 
            foreignKeys: { 
              columns: 'the_object_of_operation', 
              references: 'personnel_operations (id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('employees', 'fk4', { 
            foreignKeys: { 
              columns: 'id_passport_data', 
              references: 'passport_data(id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('employees', 'fk4', { 
            foreignKeys: { 
              columns: 'id_passport_data', 
              references: 'registration_address(id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('employees', 'fk4', { 
            foreignKeys: { 
              columns: 'id_scan', 
              references: 'files(id)', 
              onDelete: 'CASCADE', 
            }, 
        }); 

        pgm.addConstraint('personnel_operations', 'fk4', { 
            foreignKeys: { 
              columns: 'id_employee', 
              references: 'employees(id)', 
              onDelete: 'CASCADE', 
            }, 
        });

        pgm.addConstraint('personnel_operations', 'fk4', { 
            foreignKeys: { 
              columns: 'id_department', 
              references: 'departments(id)', 
              onDelete: 'CASCADE', 
            }, 
        });

        pgm.addConstraint('personnel_operations', 'fk4', { 
            foreignKeys: { 
              columns: 'id_position', 
              references: 'positions(id)', 
              onDelete: 'CASCADE', 
            }, 
        });

        pgm.addConstraint('departments', 'fk4', { 
            foreignKeys: { 
              columns: 'id_organization', 
              references: 'organizations(id)', 
              onDelete: 'CASCADE', 
            }, 
        });

        pgm.addConstraint('departments', 'fk4', { 
            foreignKeys: { 
              columns: 'id', 
              references: 'organizations(parent)', 
              onDelete: 'CASCADE', 
            }, 
        });
    },

    down: (pgm) => { 
        pgm.dropTable('avtorizations'); 
        pgm.dropTable('specialist'); 
        pgm.dropTable('roles'); 
        pgm.dropTable('passport_data'); 
        pgm.dropTable('history_of_change'); 
        pgm.dropTable('registration_address'); 
        pgm.dropTable('files'); 
        pgm.dropTable('employees'); 
        pgm.dropTable('organizations'); 
        pgm.dropTable('personnel_operations'); 
        pgm.dropTable('departments'); 
        pgm.dropTable('positions'); 
      }, 
};