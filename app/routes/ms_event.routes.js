module.exports = app => {
  const ms_events = require("../controllers/ms_event.controller.js");

  var router = require("express").Router();

  // Create a new Event
  router.post("/", ms_events.create);

  // Retrieve all ms_events
  router.get("/", ms_events.findAll);

  // Retrieve all published ms_events
  //router.get("/published", ms_events.findAllPublished);

  // Retrieve a single Event with id
  router.get("/:pk_event", ms_events.findOne);

  // Update a Event with id
  router.put("/:pk_event", ms_events.update);

  // Delete a Event with id
  router.delete("/:pk_event", ms_events.delete);

  // Create a new Event -- ????
  //router.delete("/events/", ms_events.deleteAll);

  app.use('/api/ms_events', router);
};