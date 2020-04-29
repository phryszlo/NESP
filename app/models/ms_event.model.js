module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('event', {
    pk_event: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: Sequelize.STRING
    },
    start_date: {
      type: Sequelize.DATE
    },
    end_date: {
      type: Sequelize.DATE
    },
    // created_at: {
    //   type: 'TIMESTAMP',
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   allowNull: true
    // },
    // updated_at: {
    //   type: 'TIMESTAMP',
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   allowNull: true
    // }
  },{
    timestamps: false
  })
  return Event
}

