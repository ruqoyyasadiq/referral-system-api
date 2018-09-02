const fetch = require('node-fetch') // Because, the fetch API is not available in node
/**
 * @description SlackNotifier - notifies specified slack users of an action made based on the description passed in.
 * @param  {string} url - a give webhook slack URL. This can be obtained from https://api.slack.com/apps/
 * @param  {string} description - the raw value of the payload to be sent slack
 * @return Promise containing the response of the message post to slack
 */
const SlackNotifier = (url, description) => {
  const payload = {
    'text':`Alert: ${description}`
  }
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(payload),
    header: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, fetchData)
}

module.exports = SlackNotifier
