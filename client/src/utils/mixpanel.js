let mixpanelClient = require('mixpanel-browser')

const mixpanel = function () {
  if (process.env.REACT_APP_MIXPANEL_ID) {
    mixpanelClient.init(process.env.REACT_APP_MIXPANEL_ID);
  } else {
    mixpanelClient = mixpanelClient.track = {
      track: (event, args) => {
        console.log(`mixpanel.track(): '${event}' event called with: ${JSON.stringify(args)}`)
      }
    };
  }
  return mixpanelClient;
}

export default mixpanel;
