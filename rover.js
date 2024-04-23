const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
   this.position = position;
   this.mode = 'NORMAL';
   this.generatorWatts = 110;
  }
  receiveMessage(message){
   
   let response ={
     message: message.name,
     results: message.commands.map(command => {
       if(command.commandType === 'MODE_CHANGE' && command.value) {
         this.mode = command.value;
         return {completed: true}
       }
 
       if(command.commandType === 'STATUS_CHECK') {
         return {completed:true, roverStatus: {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts}};
       }
       if(command.commandType === 'MOVE' && command.value)
         if(this.mode === 'NORMAL') {
         this.position = command.value;
         return {completed: true}
      } else if(this.mode === "LOW_POWER"){
         return {completed: false}
      }
      })
      
   } 
   return response 
 } 
}
   

module.exports = Rover;


