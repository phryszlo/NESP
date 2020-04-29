module.exports ={
  HOST: "45.55.50.36",
  USER: "postgres",
  PASSWORD: "Towereast18/",
  DB: "sbm",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000
  },
  define: {
    schema: 'meeting_services',
    freezeTableName: true,
    underscored: true
  }
}