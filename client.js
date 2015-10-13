
 // Connect to aardmud by default.
var tcpClient;
var reader;

function starRuntime(){
  var host = '127.0.0.1';
  var port = 2000;
  connect(host, port);
}

  /**
   * Connects to a host and port
   *
   * @param {String} host The remote host to connect to
   * @param {Number} port The port to connect to at the remote host
   */
  function connect(host, port) {
    tcpClient = new TcpClient(host, port);
    tcpClient.connect(function() {
      console.log('Connected to ' + host + ':' + port );
      tcpClient.addResponseListener(function(data) {
        console.log(data);
      });
    });
  }
  /**
   * Send message
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  function sendMsg(msg){
    tcpClient.sendMessage(msg, function() {
      tcpClient.addResponseListener(function(data) {
        reader = data;
        console.log(reader);
      });
    });
  }

  //
  //jquery boy
  //
  
  $(document).on("click", "#login", function(){
    var username = $('#username').val();
    var pwd = $('#password').val();
    console.log(username+pwd);
    starRuntime();
    sendMsg('AUTHCONN');
    sendMsg('USER:'+username);
    sendMsg('PASSWORD:'+pwd);
    $('#status').text(reader);
  })
  