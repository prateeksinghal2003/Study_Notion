// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalSeconds) 
{

    const hours = Math.floor(totalSeconds / 3600)

    //let totalSeconds = 3672
    //rem= 3672 % 3600 = 72 
    //72 / 60 = 1 minute 
    // 3672 % 3600 = 72 seconds % 60 = 12 seconds

    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }
  
  module.exports = {
    convertSecondsToDuration,
  }

  //can write like this
  // module.exports =  convertSecondsToDuration,
  