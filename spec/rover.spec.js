const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let rover2 = new Rover(98382)
  let rover = new Rover(98382); 
  
  let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
  let commands2 = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 1000)];
  let commands3 = [new Command('MOVE', 2000), new Command('STATUS_CHECK')];
  let commands4 = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1000)];
  
  let message = new Message('Test message with two commands', commands);
  let message2 = new Message('Test message with two commands', commands2);
  let message3 = new Message('Test message with two commands', commands3);
  let message4 = new Message('Test message with two commands', commands4);
  
  let response = rover.receiveMessage(message);
  let response2 = rover.receiveMessage(message2);
  let response3 = rover.receiveMessage(message3);
  let response4 = rover.receiveMessage(message4);

  // test 7
test ('constructor sets position and default values for mode and generatorWatts', function() {
  expect(rover2).toEqual({"generatorWatts": 110, "mode": "NORMAL", "position": 98382});
});
// test 8 
test ('response returned by receiveMessage contains the name of the message', function () {
  expect(response.message).toEqual('Test message with two commands')
});
// test 9
test ('response returned by receiveMessage includes two results if two commands are sent in the message', function () {
  expect(response.results).toEqual([{"completed": true}, {"completed":true, "roverStatus": {"generatorWatts": 110, "mode": "NORMAL", "position": 98382}}])
});
  //  test 10
test ('responds correctly to the status check command', function () {
  expect(response.results[1]).toEqual({"completed":true, "roverStatus": {"generatorWatts": 110, "mode": "NORMAL", "position": 98382}})
 
});
// test 11
test ('responds correctly to the mode change command', function() {
  expect(rover.mode).toEqual('LOW_POWER')
});
// test 12
test ('responds with a false completed value when attempting to move in LOW_POWER mode', function () {
  expect(response4.results[1]).toEqual({"completed": false})
});
// test 13
test ('responds with the position for the move command', function () {
  expect(response3.results[1].roverStatus.position).toEqual(2000)
});
});

