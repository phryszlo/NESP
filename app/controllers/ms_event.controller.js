const db = require('../models')
const Event = db.events
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  //validate the request
  if (!req.body.event_name) {
    res.status(400).send({
      message: "event_name cannot be empty"
    })
    return
  }

  //create a Event
  const event = {
    event_name: req.body.event_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date ? req.body.end_date: req.body.start_date
  }

  //save Event to db
  Event.create(event)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event"
      })
    })
}

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Event.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

exports.findOne = (req, res) => {
  const pk_event = req.params.pk_event;

  Event.findByPk(pk_event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with pk_event=" + pk_event
      });
    });
}

exports.update = (req, res) => {
  const pk_event = req.params.pk_event;

  Event.update(req.body, {
    where: { pk_event: pk_event }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with pk_event=${pk_event}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with pk_event=" + pk_event
      });
    });
}

exports.delete = (req, res) => {
  const pk_event = req.params.pk_event;

  Event.destroy({
    where: { pk_event: pk_event }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with pk_event=${pk_event}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with pk_event=" + pk_event
      });
    });
}

exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events."
      });
    });
}

// exports.findAllPublished = (req, res) => {
//   Event.findAll({ where: { published: true } })
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving events."
//     });
//   });
// }

