(function() {
  const logs = document.querySelector("#logs");
  var es = new EventSource("/logstream");

  function appendLogs(log) {
    logs.textContent += `\n${log}`;
    logs.scrollTop = logs.scrollHeight;
  }

  es.onmessage = function(event) {
    let currTime = new Date().toISOString();
    let data = JSON.parse(event.data);
    let msg = {};
    if (typeof data === "string") {
      // this is server init message
      msg.source = "mockSplunk Server";
      msg.logs = data;
    } else {
      // this is the real log data from server
      msg = data;
    }
    console.log(`${currTime}: log source [${msg.source}]`);
    appendLogs(`${currTime}: log source [${msg.source}]`);
    console.log(msg.logs);
    appendLogs(`${msg.logs}\n`);
  };
})();
