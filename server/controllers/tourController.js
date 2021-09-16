const fs = require('fs');

const dataFilePath = './data/data.json';
let tours = JSON.parse(fs.readFileSync(dataFilePath));

//API handler functions
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  let tour = null;
  let deleteCount = 0;

  tours = tours.filter((tour) => {
    if (tour.id !== id) {
      return true;
    } else {
      deleteCount++;
      return false;
    }
  });
  if (deleteCount === 0) {
    res.status(404).send({
      status: 'fail',
      message: 'Cant find any tour with the given id 😥.',
    });
    return;
  }
  fs.writeFile(dataFilePath, JSON.stringify(tours), (err) => {
    if (err) {
      res.status(501).send('Something went wrong 😥.');
    }
    res.status(204).json({
      status: 'success',
      data: null,
      deleteCount,
    });
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id);
  let tour = null;
  tours.forEach((tour1) => {
    if (tour1.id === id) {
      tour = tour1;
      return;
    }
  });
  if (tour === null) {
    res.status(404).send({
      status: 'fail',
      message: 'Cant find any tour with the given id 😥.',
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.postTour = (req, res) => {
  const id = tours.length + 1;
  let newObj = Object.assign({ id }, req.body);
  console.log(newObj);
  tours = [...tours, newObj];
  fs.writeFile(dataFilePath, JSON.stringify(tours), (err) => {
    if (err) {
      console.log('Something went wrong writing the file 🔥');
      res.send(501).json({
        status: 'fail',
        message: 'Something went wrong writing the file 🔥',
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      data: {
        tour: newObj,
      },
    });
  });
};
